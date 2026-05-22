/* ============ Dynamic Data Population ============ */
const data = window.portfolioData;

function initData() {
    if (!data) {
        console.error("Portfolio data is not loaded!");
        return;
    }

    // Populate personal info
    document.getElementById('aboutText').innerHTML = data.personal.about;
    document.getElementById('educationText').innerHTML = `<strong>${data.personal.education.university}</strong><br>${data.personal.education.faculty} (${data.personal.education.duration})`;
    document.getElementById('locationAgeText').innerHTML = `<strong>${data.personal.location}</strong><br>${data.personal.age} Years Old`;

    // Contact details
    const emailEl = document.getElementById('contactEmail');
    if (emailEl) {
        emailEl.href = `mailto:${data.personal.email}`;
        document.getElementById('infoEmail').textContent = data.personal.email;
    }
    const phoneEl = document.getElementById('contactPhone');
    if (phoneEl) {
        phoneEl.href = `tel:${data.personal.phone}`;
        document.getElementById('infoPhone').textContent = data.personal.phone;
    }
    const gitEl = document.getElementById('contactGithub');
    if (gitEl) {
        gitEl.href = data.personal.github;
        document.getElementById('infoGithub').textContent = data.personal.github.replace('https://', '');
    }
    const linkEl = document.getElementById('contactLinkedin');
    if (linkEl) {
        linkEl.href = data.personal.linkedin;
        document.getElementById('infoLinkedin').textContent = data.personal.linkedin.replace('https://', '');
    }

    // Set Dynamic Counter Targets
    const projectsCount = data.projects ? data.projects.length : 0;
    const skillsCount = Object.values(data.skills).reduce((acc, curr) => acc + curr.length, 0);

    const projStat = document.getElementById('statProjects');
    const techStat = document.getElementById('statTech');

    if (projStat) projStat.setAttribute('data-target', projectsCount);
    if (techStat) techStat.setAttribute('data-target', skillsCount);

    // Initial render of skills
    renderSkills('frontend');

    // Render Projects
    renderProjects();

    // Render Tools categories
    renderToolsCategories();

    // Render Currently section
    renderCurrently();

    // Init 3D Tilt for cards
    init3DTilt();
}

/* ============ Render Skills ============ */
const skillTabs = document.querySelectorAll('.skill-tab');
const skillsGrid = document.getElementById('skillsGrid');

function renderSkills(category) {
    const skills = data.skills[category];
    if (!skillsGrid || !skills) return;

    skillsGrid.innerHTML = '';
    skills.forEach((skill, i) => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.style.animationDelay = `${i * 0.05}s`;
        card.innerHTML = `
            <img src="${skill.icon}" alt="${skill.name}" ${skill.invert ? 'class="invert-icon"' : ''}>
            <span>${skill.name}</span>
            <span class="skill-level">${skill.level}</span>
        `;

        // Dynamic tilt on hover
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)';
        });

        skillsGrid.appendChild(card);
    });
}

// Skill Tab Click Handler
skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        skillTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderSkills(tab.dataset.category);
    });
});

/* ============ Render Projects ============ */
const projectTabs = document.querySelectorAll('.project-tab');

function renderProjects(filter = 'all') {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid || !data.projects) return;

    projectsGrid.innerHTML = '';
    
    // Robust filtering logic with fallback for cached data.js or missing filter properties
    const filteredProjects = filter === 'all'
        ? data.projects
        : data.projects.filter(proj => {
            if (proj.filter === filter) return true;
            if (proj.category) {
                const catLower = proj.category.toLowerCase();
                if (filter === 'frontend' && (catLower.includes('front') || catLower.includes('api'))) return true;
                if (filter === 'fullstack' && catLower.includes('full')) return true;
                if (filter === 'database' && (catLower.includes('data') || catLower.includes('db') || catLower.includes('back'))) return true;
                if (filter === 'uiux' && (catLower.includes('ui') || catLower.includes('ux') || catLower.includes('design'))) return true;
                if (filter === 'other' && !catLower.includes('front') && !catLower.includes('full') && !catLower.includes('data') && !catLower.includes('db') && !catLower.includes('back') && !catLower.includes('ui') && !catLower.includes('ux') && !catLower.includes('design')) return true;
            }
            return false;
        });

    filteredProjects.forEach((proj, i) => {
        const card = document.createElement('div');
        card.className = 'project-card glass-card reveal';
        card.style.animationDelay = `${i * 0.1}s`;

        const techTags = proj.tech.map(t => `<span class="project-tech-tag">${t}</span>`).join('');

        // Check if icon is an image file path (like png/jpg) or url
        const isImg = proj.icon && (proj.icon.includes('.') || proj.icon.startsWith('http'));
        const iconHTML = isImg ? `<img src="${proj.icon}" alt="${proj.title}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 6px;">` : (proj.icon || '📁');

        card.innerHTML = `
            <div class="project-card-header">
                <div class="project-icon">${iconHTML}</div>
                <span class="project-tag">${proj.category}</span>
            </div>
            <h3>${proj.title}</h3>
            <p>${proj.description}</p>
            <div class="project-tech-list">
                ${techTags}
            </div>
            <div class="project-card-links">
                ${proj.github && proj.github !== '#' ? `
                <a href="${proj.github}" target="_blank" class="project-card-link">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" class="invert-icon" width="16" style="vertical-align:middle;">
                    <span>GitHub</span>
                </a>` : ''}
                ${proj.live && proj.live !== '#' ? `
                <a href="${proj.live}" target="_blank" class="project-card-link">
                    ${proj.live.includes('figma.com') ? `
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" width="16" style="vertical-align:middle; margin-right:4px;">
                    <span>Figma Design</span>
                    ` : `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle; margin-right:4px;">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                    <span>Live Demo</span>
                    `}
                </a>` : ''}
            </div>
        `;
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if (e.target.closest('.project-card-links') || e.target.closest('.project-card-link')) {
                return;
            }
            openProjectModal(proj);
        });

        projectsGrid.appendChild(card);

        // Staggered smooth fade-in transition
        setTimeout(() => {
            card.classList.add('revealed');
        }, 50 + i * 50);
    });

    if (typeof init3DTilt === 'function') {
        init3DTilt();
    }
}

// Project Tab Click Handler
projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        projectTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderProjects(tab.dataset.category);
    });
});

/* ============ Project Modal Logic ============ */
const projectModal = document.getElementById('projectModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

function openProjectModal(proj) {
    if (!projectModal) return;

    // Populate Icon
    const isImg = proj.icon && (proj.icon.includes('.') || proj.icon.startsWith('http'));
    const iconHTML = isImg ? `<img src="${proj.icon}" alt="${proj.title}">` : (proj.icon || '📁');
    document.getElementById('modalIcon').innerHTML = iconHTML;

    // Category & Title
    document.getElementById('modalCategory').textContent = proj.category;
    document.getElementById('modalTitle').textContent = proj.title;

    // Problem, Solution, Impact
    const details = proj.details || {
        problem: "Details about the problem this project addresses will be updated soon.",
        solution: "Details about the solution implemented in this project will be updated soon.",
        impact: "Details about the impact and results of this project will be updated soon."
    };
    document.getElementById('modalProblem').textContent = details.problem;
    document.getElementById('modalSolution').textContent = details.solution;
    document.getElementById('modalImpact').textContent = details.impact;

    // Tech Stack
    const techGrid = document.getElementById('modalTech');
    if (techGrid) {
        techGrid.innerHTML = proj.tech.map(t => `<span class="project-tech-tag">${t}</span>`).join('');
    }

    // Modal Links
    const linksContainer = document.getElementById('modalLinks');
    if (linksContainer) {
        let linksHTML = '';
        if (proj.github && proj.github !== '#') {
            linksHTML += `
                <a href="${proj.github}" target="_blank" class="project-card-link">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" class="invert-icon" width="16">
                    <span>GitHub Repository</span>
                </a>
            `;
        }
        if (proj.live && proj.live !== '#') {
            const isFigma = proj.live.includes('figma.com');
            linksHTML += `
                <a href="${proj.live}" target="_blank" class="project-card-link">
                    ${isFigma ? `
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" width="16">
                    <span>Figma Design</span>
                    ` : `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                    <span>Live Demo</span>
                    `}
                </a>
            `;
        }
        linksContainer.innerHTML = linksHTML;
    }

    // Show Modal
    projectModal.classList.add('active');
    document.body.classList.add('modal-open');
}

function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// Close events
if (modalClose) modalClose.addEventListener('click', closeProjectModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeProjectModal);

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

/* ============ Render Tools ============ */
function renderToolsCategories() {
    const toolsGrid = document.getElementById('toolsCategoryGrid');
    if (!toolsGrid || !data.tools) return;

    toolsGrid.innerHTML = '';
    data.tools.forEach((cat) => {
        const catCard = document.createElement('div');
        catCard.className = 'tool-category glass-card reveal';

        const toolItemsHTML = cat.items.map(tool => {
            const iconHTML = tool.icon ? `<img src="${tool.icon}" alt="${tool.name}" ${tool.invert ? 'class="invert-icon"' : ''}>` : `<div class="tool-emoji">${tool.emoji}</div>`;
            return `
                <div class="tool-item">
                    ${iconHTML}
                    <span>${tool.name}</span>
                </div>
            `;
        }).join('');

        catCard.innerHTML = `
            <div class="tool-cat-header">
                <span class="tool-cat-icon">${cat.icon}</span>
                <h3>${cat.category}</h3>
            </div>
            <div class="tool-items">
                ${toolItemsHTML}
            </div>
        `;
        toolsGrid.appendChild(catCard);
    });
}

/* ============ Render Currently Section ============ */
function renderCurrently() {
    const descEl = document.getElementById('currentlyDesc');
    const itemsGrid = document.getElementById('currentlyItems');
    if (!data.currently) return;

    if (descEl) descEl.innerHTML = data.currently.description;

    if (itemsGrid && data.currently.focusItems) {
        itemsGrid.innerHTML = '';
        data.currently.focusItems.forEach((item, i) => {
            const card = document.createElement('div');
            card.className = 'currently-item-card glass-card reveal';
            card.style.animationDelay = `${i * 0.1}s`;

            const statusClass = item.status.toLowerCase().replace(/[^a-z]/g, '');

            card.innerHTML = `
                <div class="currently-item-icon">${item.icon}</div>
                <div class="currently-item-content">
                    <div class="currently-item-header">
                        <h4>${item.title}</h4>
                        <span class="currently-item-status ${statusClass}">${item.status}</span>
                    </div>
                    <p class="currently-item-detail">${item.detail}</p>
                </div>
            `;
            itemsGrid.appendChild(card);
        });
    }
}

/* ============ 3D Card Tilt ============ */
function init3DTilt() {
    const cards = document.querySelectorAll('.glass-card, .about-card, .profile-image-container');
    cards.forEach(card => {
        if (card.dataset.tiltInitialized) return;
        card.dataset.tiltInitialized = 'true';
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5; // range [-0.5, 0.5]
            const y = (e.clientY - rect.top) / rect.height - 0.5; // range [-0.5, 0.5]

            // Apply slight 3D perspective rotation
            card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
            card.style.transition = 'transform 0.1s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
            card.style.transition = 'transform 0.5s ease';
        });
    });
}

/* ============ Loading Screen ============ */
const loaderBarFill = document.getElementById('loaderBarFill');
const loadingScreen = document.getElementById('loadingScreen');

let progress = 0;
const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5;
    if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
            if (loadingScreen) loadingScreen.classList.add('hidden');
            initData();
            initObserver();
        }, 400);
    }
    if (loaderBarFill) loaderBarFill.style.width = progress + '%';
}, 150);

/* ============ Cursor Glow ============ */
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }
});

/* ============ Global Mouse Coordinates for 3D Interaction ============ */
let globalMouseX = 0;
let globalMouseY = 0;
document.addEventListener('mousemove', (e) => {
    globalMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    globalMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

/* ============ Three.js 3D Background ============ */
(function init3D() {
    const canvas = document.getElementById('bgCanvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 1800; // Increased count for richer 3D feel
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 20;
        // Purple to teal gradient colors
        const t = Math.random();
        colors[i] = 0.42 * (1 - t) + 0.0 * t;     // R
        colors[i + 1] = 0.36 * (1 - t) + 0.81 * t; // G
        colors[i + 2] = 0.91 * (1 - t) + 0.79 * t; // B
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Connecting Lines
    const linesMaterial = new THREE.LineBasicMaterial({ color: 0x6c5ce7, transparent: true, opacity: 0.07 });
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    const posArr = particlesGeometry.attributes.position.array;

    for (let i = 0; i < count; i += 1.2) { // sample slightly to keep line calculation performant
        const idx = Math.floor(i);
        for (let j = idx + 1; j < count; j += 4) {
            const dx = posArr[idx * 3] - posArr[j * 3];
            const dy = posArr[idx * 3 + 1] - posArr[j * 3 + 1];
            const dz = posArr[idx * 3 + 2] - posArr[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < 1.3) {
                linePositions.push(posArr[idx * 3], posArr[idx * 3 + 1], posArr[idx * 3 + 2]);
                linePositions.push(posArr[j * 3], posArr[j * 3 + 1], posArr[j * 3 + 2]);
            }
        }
    }

    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // Floating Animated Wireframe Geometries
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    const mat1 = new THREE.MeshBasicMaterial({ color: 0x6c5ce7, wireframe: true, transparent: true, opacity: 0.15 });
    const mat2 = new THREE.MeshBasicMaterial({ color: 0x00cec9, wireframe: true, transparent: true, opacity: 0.12 });
    const mat3 = new THREE.MeshBasicMaterial({ color: 0xfd79a8, wireframe: true, transparent: true, opacity: 0.12 });

    const torusMesh = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.25, 8, 24), mat1);
    const octMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.7, 0), mat2);
    const coneMesh = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.2, 4), mat3);

    torusMesh.position.set(4, 2, -3);
    octMesh.position.set(-4, -2, -2);
    coneMesh.position.set(-2, 3, -4);

    shapesGroup.add(torusMesh);
    shapesGroup.add(octMesh);
    shapesGroup.add(coneMesh);

    camera.position.z = 6;

    function animate() {
        requestAnimationFrame(animate);
        // Particles drift and rotate
        particles.rotation.y += 0.0006;
        particles.rotation.x += 0.0002;
        lines.rotation.y += 0.0006;
        lines.rotation.x += 0.0002;

        // Rotate individual floating shapes
        torusMesh.rotation.x += 0.004;
        torusMesh.rotation.y += 0.005;
        octMesh.rotation.x -= 0.003;
        octMesh.rotation.y += 0.004;
        coneMesh.rotation.y -= 0.003;
        coneMesh.rotation.z += 0.004;

        // Floating floating motion
        const time = Date.now() * 0.001;
        torusMesh.position.y = 2 + Math.sin(time) * 0.15;
        octMesh.position.y = -2 + Math.cos(time * 0.9) * 0.12;
        coneMesh.position.y = 3 + Math.sin(time * 0.7) * 0.18;

        // Interactive 3D camera movement based on mouse + scroll position
        const targetY = -globalMouseY * 0.7 - (window.scrollY * 0.003);
        camera.position.x += (globalMouseX * 0.7 - camera.position.x) * 0.02;
        camera.position.y += (targetY - camera.position.y) * 0.02;

        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();

/* ============ Hero Orb (Interactive 3D Sphere) ============ */
(function initOrb() {
    const canvas = document.getElementById('heroOrb');
    if (!canvas) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Icosahedron wireframe
    const geo = new THREE.IcosahedronGeometry(2.2, 1);
    const mat = new THREE.MeshBasicMaterial({ color: 0x6c5ce7, wireframe: true, transparent: true, opacity: 0.28 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Inner sphere
    const geo2 = new THREE.IcosahedronGeometry(1.6, 2);
    const mat2 = new THREE.MeshBasicMaterial({ color: 0x00cec9, wireframe: true, transparent: true, opacity: 0.18 });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    scene.add(mesh2);

    // Glow core sphere
    const geo3 = new THREE.SphereGeometry(1.2, 16, 16);
    const mat3 = new THREE.MeshBasicMaterial({ color: 0x6c5ce7, transparent: true, opacity: 0.06 });
    const mesh3 = new THREE.Mesh(geo3, mat3);
    scene.add(mesh3);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        // Base rotation
        mesh.rotation.y += 0.004;
        mesh.rotation.x += 0.001;
        mesh2.rotation.y -= 0.003;
        mesh2.rotation.z += 0.002;

        // Make the 3D Orb tilt towards the mouse cursor
        mesh.rotation.x += (globalMouseY * 0.2 - mesh.rotation.x) * 0.05;
        mesh.rotation.y += (globalMouseX * 0.2 - mesh.rotation.y) * 0.05;
        mesh2.rotation.x -= (globalMouseY * 0.1 - mesh2.rotation.x) * 0.05;
        mesh2.rotation.y -= (globalMouseX * 0.1 - mesh2.rotation.y) * 0.05;

        renderer.render(scene, camera);
    }
    animate();

    const observer = new ResizeObserver(() => {
        const w = canvas.parentElement.clientWidth;
        const h = canvas.parentElement.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
    observer.observe(canvas.parentElement);
})();

/* ============ Typing Animation ============ */
const roles = [
    "Full-Stack Developer 💻",
    "Frontend Engineer ⚛️",
    "UI/UX Designer 🎨",
    "React & Next.js Developer ▲",
    "Database Architect 🗄️",
    "Creative Problem Solver 🧠"
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const roleText = document.getElementById('roleText');

function typeRole() {
    const current = roles[roleIndex];
    if (isDeleting) {
        if (roleText) roleText.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeRole, 500); return; }
        setTimeout(typeRole, 30);
    } else {
        if (roleText) roleText.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) { isDeleting = true; setTimeout(typeRole, 2000); return; }
        setTimeout(typeRole, 80);
    }
}
setTimeout(typeRole, 1500);

/* ============ Counter Animation ============ */
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.getAttribute('data-target') || '0');
        const duration = 2000;
        const start = performance.now();
        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

/* ============ Navbar Scroll ============ */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Scroll progress bar
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progressPercent = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        scrollProgress.style.width = progressPercent + '%';
    }

    // Navbar background
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Active link
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === current);
    });

    // Counter trigger
    const statsEl = document.querySelector('.hero-stats');
    if (statsEl && statsEl.getBoundingClientRect().top < window.innerHeight) {
        if (!statsEl.dataset.animated) { statsEl.dataset.animated = '1'; animateCounters(); }
    }
});

/* ============ Mobile Menu ============ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
    });
});

/* ============ Scroll Reveal Observer ============ */
function initObserver() {
    const revealElements = document.querySelectorAll('.reveal, .section-header, .about-card, .tool-category, .contact-info, .contact-form-wrapper, .highlight-item');
    revealElements.forEach(el => el.classList.add('reveal-prep'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
}

// Helper CSS injector for prep reveal
const style = document.createElement('style');
style.innerHTML = `
    .reveal-prep { opacity: 0; transform: translateY(30px); transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .revealed { opacity: 1 !important; transform: translateY(0) !important; }
`;
document.head.appendChild(style);

/* ============ Contact Form ============ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('.btn-submit span');
        if (btn) {
            btn.textContent = 'Message Sent! ✓';
            btn.parentElement.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';
            setTimeout(() => {
                btn.textContent = 'Send Message';
                btn.parentElement.style.background = '';
                e.target.reset();
            }, 3000);
        }
    });
}

/* ============ Smooth Section Scroll ============ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

/* ============ Parallax on floating cards ============ */
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.floating-card');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    cards.forEach((card, i) => {
        const factor = (i + 1) * 0.4;
        card.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
});

/* ============ Copy to Clipboard Logic ============ */
function setupClipboardCopy(btnId, tooltipId, textToCopy) {
    const btn = document.getElementById(btnId);
    const tooltip = document.getElementById(tooltipId);
    if (!btn || !tooltip) return;

    btn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor href trigger (mailto/tel)
        e.stopPropagation(); // Prevent parent link click trigger

        navigator.clipboard.writeText(textToCopy).then(() => {
            // Show tooltip
            tooltip.classList.add('show');
            
            // Temporary icon success state
            const origColor = btn.style.color;
            btn.style.color = 'var(--accent-2)';
            
            setTimeout(() => {
                tooltip.classList.remove('show');
                btn.style.color = origColor;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
}

// Bind clipboard copy buttons
const emailVal = window.portfolioData ? window.portfolioData.personal.email : 'sayedmahmouda00@gmail.com';
const phoneVal = window.portfolioData ? window.portfolioData.personal.phone : '01206620678';
setupClipboardCopy('copyEmailBtn', 'emailTooltip', emailVal);
setupClipboardCopy('copyPhoneBtn', 'phoneTooltip', phoneVal);
