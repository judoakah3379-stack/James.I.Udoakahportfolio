document.addEventListener('DOMContentLoaded', () => {

  // ─── Shared observer for reveal animations
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

  // ─── Reveal-up: hero elements animate on load via CSS (--delay var)
  document.querySelectorAll('.reveal-up').forEach(el => {
    // Elements already in viewport (hero) animate immediately; others scroll-trigger
    revealObs.observe(el);
  });

  // ─── Fade-in: scroll-triggered reveal for sections
  const fadeEls = document.querySelectorAll('.fade-in');
  fadeEls.forEach(el => revealObs.observe(el));

  // ─── Stagger: children of .stagger get sequential delays
  document.querySelectorAll('.stagger > *').forEach((child, i) => {
    child.style.transitionDelay = (i * 0.12) + 's';
    child.classList.add('fade-in');
    revealObs.observe(child);
  });

  // ─── Skill bars: animate width on scroll
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animate');
        skillObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  skillFills.forEach(f => skillObs.observe(f));

  // ─── Project video fallback: hide video if src empty, show placeholder
  document.querySelectorAll('.project-video').forEach(video => {
    const src = video.querySelector('source')?.getAttribute('src');
    const placeholder = video.closest('.project-media')?.querySelector('.project-media-placeholder');
    if (!src || src.trim() === '' || src === '#') {
      video.style.display = 'none';
      if (placeholder) placeholder.style.display = 'flex';
    }
  });

  // ─── Scrolling number counter for stats (Dash Studios feel)
  const statVals = document.querySelectorAll('.stat-val:not([id])');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  statVals.forEach(el => counterObs.observe(el));

  function animateCounter(el) {
    const text = el.textContent.trim();
    const num = parseInt(text.replace(/\D/g, ''), 10);
    if (isNaN(num) || num > 100) return; // skip non-numeric or large values like "Y1"
    let start = 0;
    const duration = 900;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * num);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = text; // restore original (may have suffix)
    };
    requestAnimationFrame(step);
  }

  // ─── Cursor glow (desktop only)
  if (window.matchMedia('(pointer:fine)').matches) {
    const glow = document.createElement('div');
    glow.id = 'cursorGlow';
    document.body.appendChild(glow);
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    // Smooth lag follow
    (function loop() {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      glow.style.left = cx + 'px';
      glow.style.top = cy + 'px';
      requestAnimationFrame(loop);
    })();
  }

  // ─── Horizontal marquee ticker for stats band (subtle scroll)
  const band = document.querySelector('.stats-band');
  if (band) {
    band.addEventListener('wheel', e => {
      e.preventDefault();
      band.scrollLeft += e.deltaY * 0.5;
    }, { passive: false });
  }

});
