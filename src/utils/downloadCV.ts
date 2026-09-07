import React from 'react';

/**
 * High-Performance CV Download Utility:
 * Dynamically imports the Base64 payload on-demand so the ~250KB PDF string
 * is NOT loaded in the initial critical bundle, saving massive bandwidth and parse time.
 */
export const downloadCV = async (e?: React.MouseEvent) => {
  if (e) {
    e.preventDefault();
  }

  try {
    const { CV_BASE64 } = await import('./cvBase64');
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = `data:application/pdf;base64,${CV_BASE64}`;
    link.download = 'Sayed-Nada-CV.pdf';

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      try {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      } catch {
        // no-op
      }
    }, 500);
  } catch (err) {
    console.warn('Fallback opening PDF directly:', err);
    window.open('/sayed-nada-cv.pdf', '_blank');
  }
};

