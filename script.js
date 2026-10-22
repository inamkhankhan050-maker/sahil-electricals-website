(() => {
  const phone = '919971602909';
  const baseMessage = 'Hello Sahil Electricals, I would like to book a service. Please contact me to confirm availability and pricing.';
  const enquiryMessage = 'Hello, I would like to enquire about your services. Please share availability and pricing.';
  const services = {
    ac: [
      ['AC PCB Repair','Diagnosis and repair support for AC control board issues.','assets/images/ac-services/ac-pcb-repair.jpg','Air conditioner circuit board for AC PCB repair'],
      ['Split AC Installation','Installation support for split air conditioning units.','assets/images/ac-services/split-ac-installation.jpg','Technician installing a wall-mounted split air conditioner'],
      ['Window AC Installation','Installation support for window air conditioning units.','assets/images/ac-services/window-ac-installation.jpg','Window air conditioner being installed in a home'],
      ['AC Gas Filling','AC gas check and filling service, as required.','assets/images/ac-services/ac-gas-filling.jpg','Technician checking pressure and filling refrigerant in an AC'],
      ['AC Cooling Problem Diagnosis and Repair','Troubleshooting and repair for AC cooling concerns.','assets/images/ac-services/ac-cooling-diagnosis.jpg','Air conditioner cooling problem diagnosis and repair'],
      ['AC Repair and Maintenance','General AC repair and maintenance support.','assets/images/ac-services/ac-repair-maintenance.jpg','Technician cleaning an air conditioner filter during maintenance'],
      ['AC Uninstallation, Where Applicable','Uninstallation support where the site and unit allow.','assets/images/ac-services/ac-uninstallation.jpg','Technician working on an air conditioner during uninstallation'],
      ['Window AC Uninstallation, Where Applicable','Window AC uninstallation support where the site and unit allow.','assets/images/ac-services/window-ac-uninstallation.jpg','Window air conditioner being handled during removal']
    ],
    electrical: [
      ['Electrical Wiring and Repair','Household wiring inspection, repair and related work.','assets/images/electrical-services/electrical-wiring-repair.jpg','Hands stripping and repairing household electrical wires'],
      ['Switch and Socket Installation or Repair','Installation or repair of household switches and sockets.','assets/images/electrical-services/switch-socket-installation-repair.jpg','Steps for installing and repairing a wall switch and socket'],
      ['Lights and Lighting Installation','Lighting fixture installation and repair support.','assets/images/electrical-services/lighting-installation.jpg','Technician installing a ceiling light fixture'],
      ['Fan Installation and Repair','Ceiling and household fan installation or repair.','assets/images/electrical-services/fan-installation-repair.jpg','Technician repairing a ceiling fan'],
      ['Geyser Installation','Geyser installation support for your home.','assets/images/electrical-services/geyser-installation.jpg','Technician installing a home water geyser'],
      ['General Household Electrical Repairs','Help with common household electrical repair needs.','assets/images/electrical-services/household-electrical-repairs.jpg','Close-up of a household electrical switch connection being repaired']
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
  const departmentPhotos = {
    ac: {
      src: 'assets/images/ac-department.webp',
      alt: 'AC technician inspecting an indoor air conditioner with tools nearby'
    },
    electrical: {
      src: 'assets/images/electrical-department.webp',
      alt: 'Electrician checking a residential electrical panel and wiring'
    },
    appliance: {
      src: 'assets/images/appliance-department.webp',
      alt: 'Home appliances including a refrigerator, washing machine, geyser and mixer'
    }
  };
  const renderServices = () => {
    document.querySelectorAll('[data-service-group]').forEach(group => {
      const entries = services[group.dataset.serviceGroup] || [];
      const photo = departmentPhotos[group.dataset.serviceGroup];
      group.innerHTML = entries.map(([name, description, serviceImage, serviceAlt]) => {
        const cardPhoto = { src: serviceImage || photo.src, alt: serviceAlt || photo.alt };
        return `<article class="service-card"><img class="service-photo" src="${cardPhoto.src}" alt="${cardPhoto.alt}" width="480" height="320" loading="lazy" decoding="async"><div class="service-card-content"><div class="service-card-top"><span class="service-icon">${icon}</span><h3>${name}</h3></div><p>${description}</p><a class="button button-green" href="${whatsappUrl(`Hello Sahil Electricals, I would like to book ${name}. My location is: ____. My preferred visit time is: ____. Please confirm availability and pricing.`)}" target="_blank" rel="noopener"><svg class="button-icon" aria-hidden="true" focusable="false"><use href="#icon-whatsapp"></use></svg>Book This Service</a></div></article>`;
      }).join('');
    });
  };
  function whatsappUrl(message) { return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`; }
  renderServices();

  const searchForm = document.querySelector('.service-search-form');
  const searchInput = document.getElementById('service-search-input');
  const searchResults = document.getElementById('service-search-results');
  const searchStatus = document.getElementById('service-search-status');
  if (searchForm && searchInput && searchResults && searchStatus) {
    const serviceEntries = Object.entries(services).flatMap(([group, entries]) => entries.map(([name, description]) => ({ group, name, description })));
    const sectionForGroup = { ac: '#ac-services', electrical: '#electrical-services', appliance: '#appliance-repair' };
    const drawSearchResults = () => {
      const query = searchInput.value.trim().toLocaleLowerCase();
      searchResults.replaceChildren();
      searchResults.classList.remove('has-results');
      if (!query) {
        searchStatus.textContent = 'Search AC gas filling, wiring, fan installation, refrigerator repair and more.';
        return;
      }
      const matches = serviceEntries.filter(item => `${item.name} ${item.description} ${item.group}`.toLocaleLowerCase().includes(query));
      searchResults.classList.add('has-results');
      if (!matches.length) {
        const empty = document.createElement('p');
        empty.className = 'service-result-empty';
        empty.textContent = 'No matching service found. Try another search or contact us on WhatsApp.';
        searchResults.append(empty);
        searchStatus.textContent = 'No matching service found.';
        return;
      }
      searchStatus.textContent = `${matches.length} matching service${matches.length === 1 ? '' : 's'}. Choose a service to view details or book on WhatsApp.`;
      matches.slice(0, 8).forEach(item => {
        const row = document.createElement('div');
        row.className = 'service-result';
        const name = document.createElement('strong');
        name.textContent = item.name;
        const view = document.createElement('a');
        view.href = sectionForGroup[item.group];
        view.textContent = 'View service';
        const book = document.createElement('a');
        const message = `Hello Sahil Electricals, I would like to book ${item.name}. My location is: ____. My preferred visit time is: ____. Please confirm availability and pricing.`;
        book.href = whatsappUrl(message);
        book.target = '_blank';
        book.rel = 'noopener';
        book.textContent = 'Book on WhatsApp';
        row.append(name, view, book);
        searchResults.append(row);
      });
    };
    searchForm.addEventListener('submit', event => { event.preventDefault(); drawSearchResults(); });
    searchInput.addEventListener('input', drawSearchResults);
  }
  document.querySelectorAll('[data-booking]').forEach(link => { link.href = whatsappUrl(baseMessage); link.target = '_blank'; link.rel = 'noopener'; });
  document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = whatsappUrl(enquiryMessage); link.target = '_blank'; link.rel = 'noopener'; });
  document.getElementById('year').textContent = new Date().getFullYear();

  const mobileActionBar = document.querySelector('.mobile-actions');
  const heroSection = document.querySelector('.hero');
  if ('IntersectionObserver' in window && mobileActionBar && heroSection) {
    const heroObserver = new IntersectionObserver(([entry]) => {
      const showQuickActions = window.matchMedia('(max-width: 560px)').matches && !entry.isIntersecting;
      document.body.classList.toggle('show-mobile-actions', showQuickActions);
      mobileActionBar.setAttribute('aria-hidden', String(!showQuickActions));
    }, { threshold: 0 });
    heroObserver.observe(heroSection);
  }

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

  const track = document.querySelector('.slides');
  const slides = [...track.querySelectorAll('.slide')];
  const dots = [...document.querySelectorAll('.dot')];
  const carousel = document.querySelector('.carousel');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  [firstClone, lastClone].forEach(clone => {
    clone.setAttribute('aria-hidden', 'true');
    clone.inert = true;
    clone.dataset.clone = 'true';
  });
  track.append(firstClone);
  track.insertBefore(lastClone, slides[0]);

  let current = 0, timer, hovering = false, focused = false, physicalPosition = 1;
  function updateSlideState() {
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
    });
    dots.forEach((dot, i) => { dot.classList.toggle('is-active', i === current); if (i === current) dot.setAttribute('aria-current','true'); else dot.removeAttribute('aria-current'); });
  }
  function showSlide(index) {
    const next = (index + slides.length) % slides.length;
    let position = next + 1;
    if (index >= slides.length && current === slides.length - 1) position = slides.length + 1;
    if (index < 0 && current === 0) position = 0;
    current = next;
    physicalPosition = position;
    updateSlideState();
    track.classList.remove('no-transition');
    setTrackPosition(position);
  }
  const setTrackPosition = position => { track.style.transform = `translateX(-${position * 100}%)`; };
  setTrackPosition(1);
  updateSlideState();
  track.addEventListener('transitionend', event => {
    if (event.target !== track || event.propertyName !== 'transform') return;
    if (physicalPosition !== 0 && physicalPosition !== slides.length + 1) return;
    track.classList.add('no-transition');
    physicalPosition = physicalPosition === 0 ? slides.length : 1;
    setTrackPosition(physicalPosition);
    track.offsetHeight;
    track.classList.remove('no-transition');
  });
  function stopTimer() { clearInterval(timer); timer = undefined; }
  function startTimer() {
    stopTimer();
    if (!reducedMotion.matches && !document.hidden && !hovering && !focused) timer = setInterval(() => showSlide(current + 1), 5000);
  }
  function navigate(index) { showSlide(index); startTimer(); }
  document.querySelector('[data-prev]').addEventListener('click', () => navigate(current - 1));
  document.querySelector('[data-next]').addEventListener('click', () => navigate(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => navigate(i)));
  carousel.addEventListener('mouseenter', () => { hovering = true; stopTimer(); });
  carousel.addEventListener('mouseleave', () => { hovering = false; startTimer(); });
  carousel.addEventListener('focusin', () => { focused = true; stopTimer(); });
  carousel.addEventListener('focusout', event => {
    if (carousel.contains(event.relatedTarget)) return;
    focused = false;
    startTimer();
  });
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); navigate(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); navigate(current + 1); }
  });
  let touchStart = null;
  carousel.addEventListener('touchstart', event => { touchStart = event.changedTouches[0].clientX; }, {passive:true});
  carousel.addEventListener('touchend', event => { if (touchStart === null) return; const delta = event.changedTouches[0].clientX - touchStart; if (Math.abs(delta) > 45) navigate(current + (delta < 0 ? 1 : -1)); touchStart = null; }, {passive:true});
  document.addEventListener('visibilitychange', startTimer);
  reducedMotion.addEventListener?.('change', startTimer);
  if (!reducedMotion.addEventListener) reducedMotion.addListener(startTimer);
  startTimer();
})();
