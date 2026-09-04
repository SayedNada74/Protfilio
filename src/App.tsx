
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Hero } from './components/hero/Hero';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { ServicesSection } from './components/services/ServicesSection';
import { AboutSection } from './components/about/AboutSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { ContactSection } from './components/contact/ContactSection';
import { SkillsMarquee } from './components/common/SkillsMarquee';
import { LenisScroller } from './components/motion/LenisScroller';
import { Cursor } from './components/motion/Cursor';
import { PagePreloader } from './components/common/PagePreloader';

const CaseStudy = lazy(() =>
  import('./pages/CaseStudy').then((m) => ({ default: m.CaseStudy }))
);

function App() {
  return (
    <LenisScroller>
      <PagePreloader />
      <Router>
        <Cursor />
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <SkillsMarquee />
                  <AboutSection />
                  <ProjectsSection />
                  <ServicesSection />
                  <SkillsSection />
                  <ContactSection />
                </>
              }
            />
            <Route
              path="/projects/:slug"
              element={
                <Suspense
                  fallback={
                    <div
                      style={{
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--bg-primary)',
                      }}
                    />
                  }
                >
                  <CaseStudy />
                </Suspense>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </LenisScroller>
  );
}

export default App;

