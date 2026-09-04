import React from 'react';
import { CV_BASE64 } from './cvBase64';

/**
 * 100% Reliable CV Download Utility:
 * Uses synchronous Base64 Data URI to prevent Chrome user-activation expiry
 * and sandbox stream drops that produce 0-byte files.
 */
export const downloadCV = (e?: React.MouseEvent) => {
  if (e) {
    e.preventDefault();
  }

  try {
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
