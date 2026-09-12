// Blue Station Burguer — interactions

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-links a');

  const setMenu = (open) => {
    nav?.classList.toggle('open', open);
    menuToggle?.classList.toggle('active', open);
    menuToggle?.setAttribute('aria-expanded', String(open));
    menuToggle?.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  menuToggle?.addEventListener('click', () => setMenu(!nav?.classList.contains('open')));
  navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setMenu(false);
  }, { passive: true });

  // Highlight current day.
  const daysMap = { 0: 'domingo', 1: 'segunda', 2: 'terca', 3: 'quarta', 4: 'quinta', 5: 'sexta', 6: 'sabado' };
  const today = daysMap[new Date().getDay()];
  document.querySelectorAll('.hours-row').forEach(row => row.classList.toggle('today', row.dataset.day === today));

  // Keep navigation state synchronized with visible sections.
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));

  // Reveal sections as they enter the viewport.
  document.querySelectorAll('.section-header, .about-grid, .menu-card, .benefit-card, .gallery-item, .location-grid').forEach((element, index) => {
    element.classList.add('reveal');
    element.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
  });
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px' });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

  // Load the premium glow/motion layer after the main styles.
  if (!document.querySelector('link[href="css/motion.css"]')) {
    const motion = document.createElement('link');
    motion.rel = 'stylesheet';
    motion.href = 'css/motion.css';
    document.head.appendChild(motion);
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
});
