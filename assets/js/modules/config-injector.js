/**
 * Config Injector Module
 * -------------------------------------------------------------
 * Automatically applies settings from site.config.js to the DOM,
 * allowing effortless personalization of your portfolio website.
 * -------------------------------------------------------------
 */

export function applyPortfolioConfig(container = document) {
  if (!window.PORTFOLIO_CONFIG || !window.PORTFOLIO_CONFIG.profile) return;
  const { profile, socials } = window.PORTFOLIO_CONFIG;

  // 1. Update Title & Meta
  if (profile.name && profile.tagline) {
    document.title = `${profile.name} - ${profile.tagline}`;
  }

  // 2. Update Hero Tagline
  const taglineEl = container.querySelector('[data-preloader="text-1"]');
  if (taglineEl && profile.tagline) {
    taglineEl.innerHTML = profile.tagline.replace('&', '&amp;').replace('\n', '<br/>');
  }

  // 3. Update Location & Agency
  const metaEls = container.querySelectorAll('[data-preloader="text-2"]');
  if (metaEls.length >= 1 && profile.basedIn) {
    metaEls[0].textContent = profile.basedIn;
  }
  if (profile.agency && profile.agency.name) {
    const agencyLinks = container.querySelectorAll('.hero-meta-inner a');
    agencyLinks.forEach(link => {
      if (profile.agency.url) link.href = profile.agency.url;
      const label = link.querySelector('[data-link="label"]');
      const shadow = link.querySelector('[data-link="shadow"]');
      if (label) label.textContent = profile.agency.name;
      if (shadow) shadow.textContent = profile.agency.name;
    });
  }

  // 4. Update Hero Name (e.g. First & Last name)
  if (profile.heroTitle && Array.isArray(profile.heroTitle)) {
    const heroHeadingWrap = container.querySelector('.hero-heading-wrap .heading-group-wrap');
    if (heroHeadingWrap) {
      const h1s = heroHeadingWrap.querySelectorAll('h1');
      profile.heroTitle.forEach((line, idx) => {
        if (h1s[idx]) h1s[idx].textContent = line;
      });
    }
  }

  // 5. Update Bio
  if (profile.bio) {
    const bioEl = container.querySelector('#w-node-b3ffe939-77a9-9ffd-556a-a54954be4b55-ef9a5cf3, .intro .p1.mb-104');
    if (bioEl) {
      bioEl.innerHTML = profile.bio.replace('\n', '<br/>');
    }
  }

  // 6. Update Sticky Name in Footer
  if (profile.brandName) {
    const stickyLeft = container.querySelector('[data-sticky-name].is-left .h1, .name-part-wrap.is-left .h1');
    const stickyRight = container.querySelector('[data-sticky-name].is-right .h1, .name-part-wrap.is-right .h1');
    if (stickyLeft && stickyRight) {
      const half = Math.ceil(profile.brandName.length / 2);
      stickyLeft.textContent = profile.brandName.slice(0, half);
      stickyRight.textContent = profile.brandName.slice(half);
    }
    const mobileFooterName = container.querySelector('.m-footer-name .h1');
    if (mobileFooterName) {
      mobileFooterName.textContent = profile.brandName;
    }
  }

  // 7. Update Contact Email Links
  if (profile.email) {
    const emailLinks = container.querySelectorAll('a[href*="mailto:"], a[href*="tiwariaaditya@gmail.com"]');
    emailLinks.forEach(link => {
      const subject = encodeURIComponent(profile.emailSubject || '[Project Inquiry] Hello!');
      link.href = `mailto:${profile.email}?subject=${subject}`;
      const label = link.querySelector('[data-link="label"]');
      const shadow = link.querySelector('[data-link="shadow"]');
      if (label) label.textContent = profile.email;
      if (shadow) shadow.textContent = profile.email;
    });
  }

  // 8. Update Social Links
  if (socials && Array.isArray(socials)) {
    const socialItems = container.querySelectorAll('.social-item a');
    socials.forEach((social, i) => {
      if (socialItems[i] && social.url) {
        socialItems[i].href = social.url;
        socialItems[i].setAttribute('title', social.platform || '');
      }
    });
  }

  // 9. Update Copyright Year
  if (profile.copyrightYear) {
    container.querySelectorAll('.sticky-name-meta .p1, .m-footer-meta .p1').forEach(el => {
      if (el.textContent.includes('All Right Reserved') || el.textContent.includes('©')) {
        el.textContent = `${profile.copyrightYear} © All Right Reserved`;
      }
    });
  }
}
