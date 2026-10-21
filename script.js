(() => {
  const phone = '919971602909';
  const baseMessage = 'Hello Sahil Electricals, I would like to book a service. Please contact me to confirm availability and pricing.';
  const enquiryMessage = 'Hello, I would like to enquire about your services. Please share availability and pricing.';
  const services = {
    ac: [
      ['AC PCB Repair','Diagnosis and repair support for AC control board issues.'],
      ['Split AC Installation','Installation support for split air conditioning units.'],
      ['Window AC Installation','Installation support for window air conditioning units.'],
      ['AC Gas Filling','AC gas check and filling service, as required.'],
      ['AC Cooling Problem Diagnosis and Repair','Troubleshooting and repair for AC cooling concerns.'],
      ['AC Repair and Maintenance','General AC repair and maintenance support.'],
      ['AC Uninstallation, Where Applicable','Uninstallation support where the site and unit allow.']
    ],
    electrical: [
      ['Electrical Wiring and Repair','Household wiring inspection, repair and related work.'],
      ['Switch and Socket Installation or Repair','Installation or repair of household switches and sockets.'],
      ['Lights and Lighting Installation','Lighting fixture installation and repair support.'],
      ['Fan Installation and Repair','Ceiling and household fan installation or repair.'],
      ['Geyser Installation','Geyser installation support for your home.'],
      ['General Household Electrical Repairs','Help with common household electrical repair needs.']
    ],
    appliance: [
      ['Refrigerator and Fridge Repair','Repair support for refrigerators and fridges.'],
      ['Washing Machine Repair','Troubleshooting and repair support for washing machines.'],
      ['Mixer Repair','Repair support for household mixers.'],
      ['Grinder Repair','Repair support for household grinders.'],
      ['Other Home Appliance Repair and Electrical Services','Ask us about another home appliance or electrical service.']
    ]
  };
  const icon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v9H4zM7 11h10M8 19l-2 2m10-2 2 2M9 16v1m6-1v1"/></svg>';
  const renderServices = () => {
    document.querySelectorAll('[data-service-group]').forEach(group => {
      const entries = services[group.dataset.serviceGroup] || [];
      group.innerHTML = entries.map(([name, description]) => `<article class="service-card"><div class="service-card-top"><span class="service-icon">${icon}</span><h3>${name}</h3></div><p>${description}</p><a class="button button-green" href="${whatsappUrl(`Hello Sahil Electricals, I would like to book ${name}. My location is: ____. My preferred visit time is: ____. Please confirm availability and pricing.`)}" target="_blank" rel="noopener"><svg class="button-icon" aria-hidden="true" focusable="false"><use href="#icon-whatsapp"></use></svg>Book This Service</a></article>`).join('');
    });
  };
  function whatsappUrl(message) { return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`; }
  renderServices();
  document.querySelectorAll('[data-booking]').forEach(link => { link.href = whatsappUrl(baseMessage); link.target = '_blank'; link.rel = 'noopener'; });
  document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = whatsappUrl(enquiryMessage); link.target = '_blank'; link.rel = 'noopener'; });
  document.getElementById('year').textContent = new Date().getFullYear();

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation');
  }));

  const slides = [...document.querySelectorAll('.slide')];
  const dots = [...document.querySelectorAll('.dot')];
  const carousel = document.querySelector('.carousel');
  let current = 0, timer;
  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { const active = i === current; slide.classList.toggle('is-active', active); slide.setAttribute('aria-hidden', String(!active)); });
    dots.forEach((dot, i) => { dot.classList.toggle('is-active', i === current); if (i === current) dot.setAttribute('aria-current','true'); else dot.removeAttribute('aria-current'); });
  }
  function startTimer() { clearInterval(timer); if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => showSlide(current + 1), 5500); }
  document.querySelector('[data-prev]').addEventListener('click', () => { showSlide(current - 1); startTimer(); });
  document.querySelector('[data-next]').addEventListener('click', () => { showSlide(current + 1); startTimer(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i); startTimer(); }));
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', startTimer);
  carousel.addEventListener('focusin', () => clearInterval(timer));
  carousel.addEventListener('focusout', startTimer);
  carousel.addEventListener('keydown', event => { if (event.key === 'ArrowLeft') showSlide(current - 1); if (event.key === 'ArrowRight') showSlide(current + 1); });
  let touchStart = null;
  carousel.addEventListener('touchstart', event => { touchStart = event.changedTouches[0].clientX; }, {passive:true});
  carousel.addEventListener('touchend', event => { if (touchStart === null) return; const delta = event.changedTouches[0].clientX - touchStart; if (Math.abs(delta) > 45) showSlide(current + (delta < 0 ? 1 : -1)); touchStart = null; }, {passive:true});
  document.addEventListener('visibilitychange', () => { if (document.hidden) clearInterval(timer); else startTimer(); });
  startTimer();
})();
