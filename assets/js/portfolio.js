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

// Dedicated Theme Menu Button (Item 5) Interaction
document.addEventListener('click', (e) => {
  // If clicked on theme-switch container but outside the inner circle
  const switchBox = e.target.closest('.menu-theme-grid .theme-switch');
  if (switchBox && !e.target.hasAttribute('data-theme-mode')) {
    e.stopPropagation();
    const inner = switchBox.querySelector('[data-theme-mode]');
    if (inner) inner.click();
    return;
  }

  // If clicked on Theme header row, cycle through the 5 themes
  const cycleHeader = e.target.closest('[data-theme-cycle]');
  if (cycleHeader && !e.target.closest('.menu-theme-panel')) {
    e.preventDefault();
    e.stopPropagation();
    const modes = ['base', '3', '2', '1', '4'];
    let current = 'base';
    try {
      current = sessionStorage.getItem('theme-mode') || 'base';
    } catch (err) {}
    const nextIdx = (modes.indexOf(current) + 1) % modes.length;
    const nextMode = modes[nextIdx];
    const targetBtn = document.querySelector(`.menu-theme-grid [data-theme-mode="${nextMode}"]`);
    if (targetBtn) {
      targetBtn.click();
    }
  }
});

