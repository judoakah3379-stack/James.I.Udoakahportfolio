document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Mobile toggle
  toggle?.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    toggle.classList.toggle('open');
  });

  // Close mobile menu on nav-item click
  document.querySelectorAll('.nav-item').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('show'));
  });

  // Active link — match current filename
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});
