// Small-screen nav: hamburger toggle, tap-outside-to-close, Escape-to-close,
// and focus handling so the menu is fully usable from a keyboard.
(() => {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('site-nav-links');
  const scrim = document.getElementById('nav-scrim');
  if (!toggle || !links) return;

  // links normally lives inside <nav>, as a flex child next to the logo —
  // that's what keeps it lined up with the logo on desktop. anchorParent /
  // anchorNext remember exactly where it goes back to when closed.
  const anchorParent = links.parentNode;
  const anchorNext = toggle;

  const isOpen = () => links.classList.contains('is-open');

  function openNav() {
    // move the drawer out to <body> for as long as it's open. iOS Safari
    // treats some ancestor properties (backdrop-filter, sticky positioning)
    // as pinning a position:fixed descendant to that ancestor's box instead
    // of the viewport, which is what made this drawer render squashed inside
    // the nav bar. Detaching it from <nav> while open sidesteps that
    // regardless of which property was the actual trigger.
    document.body.appendChild(links);
    links.classList.add('is-open');
    if (scrim) scrim.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    const firstLink = links.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeNav({ restoreFocus = false } = {}) {
    if (!isOpen()) return;
    links.classList.remove('is-open');
    if (scrim) scrim.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) toggle.focus();
    anchorParent.insertBefore(links, anchorNext);
  }

  toggle.addEventListener('click', () => {
    isOpen() ? closeNav({ restoreFocus: true }) : openNav();
  });

  if (scrim) scrim.addEventListener('click', () => closeNav());

  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => closeNav());
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) closeNav({ restoreFocus: true });
  });

  // Keep focus inside the open panel (basic focus trap).
  links.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !isOpen()) return;
    const focusable = links.querySelectorAll('a');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Drop the mobile panel state if the viewport grows past the breakpoint.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1300) closeNav();
  });
})();
