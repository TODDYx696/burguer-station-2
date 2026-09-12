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

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
});
