// script.js - interactivity: dark mode, AOS init, contact form simple handler, back-to-top, smooth scroll

document.addEventListener('DOMContentLoaded', function () {
  // elements
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const backToTop = document.getElementById('backToTop');
  const yearEl = document.getElementById('year');
  const contactForm = document.getElementById('contactForm');
  const contactResult = document.getElementById('contactResult');

  // set year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // prefer dark if user OS pref and no saved preference
  const savedTheme = localStorage.getItem('site-theme'); // 'dark' or 'light'
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

  applyTheme(isDark ? 'dark' : 'light');

  // theme toggle click
  themeToggle.addEventListener('click', () => {
    const cur = document.body.classList.contains('dark') ? 'dark' : 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('site-theme', next);
  });

  function applyTheme(mode) {
    if (mode === 'dark') {
      document.body.classList.add('dark');
      themeIcon.className = 'bi bi-sun-fill';
      // navbar text color
      document.querySelectorAll('.navbar').forEach(n => n.classList.remove('navbar-light','bg-light'));
    } else {
      document.body.classList.remove('dark');
      themeIcon.className = 'bi bi-moon-fill';
      document.querySelectorAll('.navbar').forEach(n => n.classList.add('navbar-light','bg-light'));
    }
  }

  // initialize AOS
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  // simple contact form handler (client-side only)
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!name || !email || !message) {
        contactResult.innerHTML = '<div class="alert alert-warning">Semua field wajib diisi.</div>';
        return;
      }
      // simulate send (replace with actual fetch to API/back-end)
      contactResult.innerHTML = '<div class="alert alert-success">Terima kasih! Pesan Anda telah dikirim (simulasi).</div>';
      contactForm.reset();
    });
  }

  // show/hide back to top on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backToTop.style.display = 'block';
    else backToTop.style.display = 'none';
  });
  backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({top: y, behavior: 'smooth'});
        // Collapse navbar on mobile after click
        const bsCollapse = document.querySelector('.navbar-collapse');
        if (bsCollapse && bsCollapse.classList.contains('show')) {
          new bootstrap.Collapse(bsCollapse).toggle();
        }
      }
    });
  });

  // Basic accessibility: focus outlines for keyboard users
  document.addEventListener('keyup', function(e){
    if (e.key === 'Tab') document.body.classList.add('show-focus-outlines');
  });
});
