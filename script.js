const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
if (menu) {
  menu.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    if (nav.style.display === 'flex') {
      nav.style.position = 'absolute';
      nav.style.top = '74px';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.padding = '20px 24px';
      nav.style.background = '#0b0d10';
      nav.style.flexDirection = 'column';
      nav.style.gap = '16px';
    }
  });
}

// Subtle cursor glow
const glow = document.querySelector('.cursor-glow');
if (glow && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('pointermove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, {passive:true});
}

// Reveal sections as they enter the viewport
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

// Gentle 3D tilt on project cards
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-.5;
      const y = (e.clientY-r.top)/r.height-.5;
      card.style.transform = `perspective(900px) rotateX(${y*-2.5}deg) rotateY(${x*2.5}deg) translateY(-5px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}
