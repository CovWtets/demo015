// Navigation: sitzt unter der Demo-Leiste und rutscht beim Scrollen direkt mit (kein Sprung, keine Lücke)
const nav = document.getElementById('nav');
const demo = document.querySelector('.demo');
const navPruefen = () => {
  const h = demo ? demo.offsetHeight : 0;
  nav.style.top = Math.max(0, h - scrollY) + 'px';
  nav.classList.toggle('scrolled', scrollY > h + 40);
};
addEventListener('scroll', navPruefen, { passive: true });
addEventListener('resize', navPruefen);
navPruefen();

// Mobilmenü
const burger = document.getElementById('burger'), menu = document.getElementById('menu');
const menuSetzen = offen => {
  menu.classList.toggle('open', offen);
  nav.classList.toggle('menu-open', offen);
  burger.setAttribute('aria-expanded', offen);
  burger.setAttribute('aria-label', offen ? 'Close menu' : 'Open menu');
  const [a, b] = burger.children;
  a.style.transform = offen ? 'translateY(3.75px) rotate(45deg)' : '';
  b.style.transform = offen ? 'translateY(-3.75px) rotate(-45deg)' : '';
  document.body.style.overflow = offen ? 'hidden' : '';
};
burger.addEventListener('click', () => menuSetzen(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menuSetzen(false)));

// Einblenden beim Scrollen
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
