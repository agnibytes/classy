/**
 * Main Portfolio Entry Point
 * -------------------------------------------------------------
 * Integrates site.config.js personalization, GSAP animation plugins,
 * Three.js WebGL effects, Lenis smooth scrolling, and Barba page transitions.
 * -------------------------------------------------------------
 */

import { applyPortfolioConfig } from '/assets/js/modules/config-injector.js';

// Apply user configuration immediately on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    applyPortfolioConfig(document);
  });
} else {
  applyPortfolioConfig(document);
}

// Load the core animation & interaction engine
import '/assets/js/slater-main.js';

// Re-apply configuration after every Barba page transition
window.addEventListener('DOMContentLoaded', () => {
  if (window.barba && window.barba.hooks) {
    window.barba.hooks.afterEnter((data) => {
      if (data && data.next && data.next.container) {
        applyPortfolioConfig(data.next.container);
      }
    });
  }
});
