/* ============================================
   REPAIR ASAP LLC — Main JavaScript
   ============================================ */

/* --------------------------------------------------
   PAGE-SPECIFIC INIT (runs immediately on DOMContentLoaded)
   These features don't depend on the dynamically loaded
   header/footer components.
   -------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

  // ---- Scroll Reveal (Intersection Observer) ----
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        const i = Array.from(siblings).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));




  // ---- Animated Counters ----
  const counters = document.querySelectorAll('.stat-number[data-target]');
  let countersAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats');
  if (statsSection) counterObserver.observe(statsSection);

  function animateCounters() {
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);
      const duration = 2000;
      const startTime = performance.now();

      function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
      }

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.round(easedProgress * target);

        counter.textContent = current.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // ---- FAQ Accordion ----
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(faq => {
        faq.classList.remove('active');
        faq.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if wasn't already open)
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---- Form Validation & Submit ----
  const form = document.getElementById('quoteForm');
  const submitBtn = document.getElementById('submitBtn');

  // Inline form calendar picker elements
  const inlineDateInput = form?.querySelector('#date');
  const inlineTimeSlotGroup = document.getElementById('inlineTimeSlotGroup');
  const inlineTimeSlotsEl = document.getElementById('inlineTimeSlots');
  const inlineTimeInput = document.getElementById('inline-time');
  const inlineAddressGroup = document.getElementById('inlineAddressGroup');
  const inlineAddressInput = document.getElementById('inline-address');
  const inlineDateClear = document.getElementById('inlineDateClear');
  const SLOTS_API = 'https://repair-asap-proxy.vercel.app/api/calendar-slots';

  // Date change → fetch time slots
  if (inlineDateInput) {
    const today = new Date().toISOString().split('T')[0];
    inlineDateInput.setAttribute('min', today);

    inlineDateInput.addEventListener('change', async () => {
      const date = inlineDateInput.value;
      if (inlineDateClear) inlineDateClear.style.display = date ? 'block' : 'none';
      if (!date || !inlineTimeSlotGroup || !inlineTimeSlotsEl) return;

      inlineTimeInput.value = '';
      inlineTimeSlotGroup.style.display = 'block';
      if (inlineAddressGroup) inlineAddressGroup.style.display = 'block';
      inlineTimeSlotsEl.innerHTML = '<div class="time-slots__loading"><span class="spinner-sm"></span> Loading available times...</div>';

      try {
        const resp = await fetch(`${SLOTS_API}?date=${date}`);
        const data = await resp.json();

        if (!data.slots || data.slots.length === 0) {
          inlineTimeSlotsEl.innerHTML = '<p class="time-slots__empty">No available times on this date. Please try another day.</p>';
          return;
        }

        inlineTimeSlotsEl.innerHTML = data.slots.map((slot, i) => {
          const raw = data.raw?.[i] || slot;
          return `<button type="button" class="time-slot" data-time="${raw}" data-label="${slot}">${slot}</button>`;
        }).join('');

        inlineTimeSlotsEl.querySelectorAll('.time-slot').forEach(btn => {
          btn.addEventListener('click', () => {
            inlineTimeSlotsEl.querySelectorAll('.time-slot').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            inlineTimeInput.value = btn.dataset.time;
            if (inlineTimeSlotGroup) inlineTimeSlotGroup.classList.remove('has-error');
          });
        });
      } catch (err) {
        inlineTimeSlotsEl.innerHTML = '<p class="time-slots__empty">Failed to load times. You can still submit without a time selection.</p>';
      }
    });
  }

  // Clear date button
  if (inlineDateClear && inlineDateInput) {
    inlineDateClear.addEventListener('click', () => {
      inlineDateInput.value = '';
      inlineDateClear.style.display = 'none';
      if (inlineTimeSlotGroup) inlineTimeSlotGroup.style.display = 'none';
      if (inlineTimeSlotsEl) inlineTimeSlotsEl.innerHTML = '';
      if (inlineTimeInput) inlineTimeInput.value = '';
      if (inlineAddressGroup) inlineAddressGroup.style.display = 'none';
      if (inlineAddressInput) { inlineAddressInput.value = ''; inlineAddressInput.classList.remove('error', 'success'); }
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Clear previous errors
      form.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('has-error');
      });
      form.querySelectorAll('.form-input').forEach(input => {
        input.classList.remove('error', 'success');
      });

      let isValid = true;

      // Validate required text inputs
      form.querySelectorAll('.form-input[required]').forEach(input => {
        if (!input.value.trim()) {
          showError(input);
          isValid = false;
        } else {
          input.classList.add('success');
        }
      });

      // Validate email (optional, but check format if provided)
      const email = form.querySelector('#email');
      if (email && email.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
          showError(email);
          isValid = false;
        } else {
          email.classList.add('success');
        }
      }

      // Validate phone
      const phone = form.querySelector('#phone');
      if (phone && phone.value.trim()) {
        const phoneDigits = phone.value.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
          showError(phone);
          isValid = false;
        } else {
          phone.classList.add('success');
        }
      }

      // Validate service
      const service = form.querySelector('#service');
      if (!service.value) {
        showError(service);
        isValid = false;
      } else {
        service.classList.add('success');
      }

      // Validate ZIP code (optional, but check format if provided)
      const zip = form.querySelector('#zip');
      if (zip && zip.value.trim()) {
        if (!/^\d{5}$/.test(zip.value.trim())) {
          showError(zip);
          isValid = false;
        } else {
          zip.classList.add('success');
        }
      }

      // Validate consent checkbox (required)
      const consent = form.querySelector('#contact-consent');
      if (consent && !consent.checked) {
        const consentGroup = consent.closest('.form-group');
        if (consentGroup) consentGroup.classList.add('has-error');
        isValid = false;
      }

      // Address required when date selected
      if (inlineDateInput && inlineDateInput.value && inlineAddressInput) {
        if (!inlineAddressInput.value.trim()) {
          showError(inlineAddressInput);
          isValid = false;
        } else {
          inlineAddressInput.classList.add('success');
        }
      }

      if (isValid) {
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        const payload = {
          name: form.querySelector('#name').value.trim(),
          phone: form.querySelector('#phone').value.trim(),
          email: email?.value.trim() || '',
          zip: zip?.value.trim() || '',
          service: service.value,
          date: form.querySelector('#date')?.value || '',
          message: form.querySelector('#message')?.value.trim() || '',
          photos: [],
          time: inlineTimeInput?.value || '',
          address: inlineAddressInput?.value?.trim() || '',
        };

        try {
          const response = await fetch('https://repair-asap-proxy.vercel.app/api/quote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          const result = await response.json();

          if (response.ok && result.success) {
            // Dynamic success screen with booking details
            let successHtml = '';
            if (result.booked && payload.time) {
              const activeSlot = inlineTimeSlotsEl?.querySelector('.time-slot.active');
              const timeLabel = activeSlot?.dataset?.label || payload.time;
              successHtml = `
                <div style="text-align:center; padding:40px 20px;">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:20px">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <h3 style="font-size:24px; margin-bottom:12px;">Appointment Confirmed! 📅</h3>
                  <p style="color:var(--text-secondary); font-size:16px; line-height:1.7; margin-bottom:16px;">Your visit has been scheduled. Our technician will text you 30 minutes before arrival.</p>
                  <div class="booking-details">
                    <div class="booking-detail"><span>📅</span> <strong>${payload.date}</strong> at <strong>${timeLabel}</strong></div>
                    ${payload.address ? `<div class="booking-detail"><span>📍</span> ${payload.address}</div>` : ''}
                    <div class="booking-detail"><span>🔧</span> ${payload.service || 'Handyman Service'}</div>
                  </div>
                </div>
              `;
            } else {
              successHtml = `
                <div style="text-align:center; padding:40px 20px;">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:20px">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <h3 style="font-size:24px; margin-bottom:12px;">Quote Request Received</h3>
                  <p style="color:var(--text-secondary); font-size:16px; line-height:1.7;">Thank you! We'll get back to you within 30 minutes during business hours.</p>
                </div>
              `;
            }
            form.innerHTML = successHtml;
          } else {
            const errMsg = result.error || 'Something went wrong.';
            if (errMsg.includes('slot') || errMsg.includes('Booking failed') || errMsg.includes('409')) {
              alert('That time slot was just taken! Please select another time.');
              if (inlineDateInput?.value) inlineDateInput.dispatchEvent(new Event('change'));
            } else {
              alert(errMsg + ' Please try again or call us.');
            }
          }
        } catch (err) {
          console.error('Quote submission error:', err);
          alert('Network error. Please try again or call us at +1 (775) 310-7770.');
        } finally {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }
      }
    });

    // Real-time validation on blur
    form.querySelectorAll('.form-input[required]').forEach(input => {
      input.addEventListener('blur', function () {
        if (this.value.trim()) {
          this.classList.remove('error');
          this.closest('.form-group').classList.remove('has-error');
          this.classList.add('success');
        }
      });

      input.addEventListener('input', function () {
        if (this.classList.contains('error') && this.value.trim()) {
          this.classList.remove('error');
          this.closest('.form-group').classList.remove('has-error');
        }
      });
    });
  }

  function showError(input) {
    input.classList.add('error');
    input.closest('.form-group').classList.add('has-error');
  }

  // ---- Set min date for date input ----
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // ---- Parallax effect on hero gradient ----
  const heroGradient = document.querySelector('.hero__gradient');
  if (heroGradient && window.matchMedia('(min-width: 768px)').matches) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroGradient.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    }, { passive: true });
  }

  // ---- Video Lightbox ----
  const lightbox = document.getElementById('videoLightbox');
  const lightboxIframe = document.getElementById('lightboxIframe');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(videoId) {
    lightboxIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    // Delay clearing src so fade-out animation completes
    setTimeout(() => { lightboxIframe.src = ''; }, 350);
  }

  // Attach to all portfolio play buttons
  document.querySelectorAll('.portfolio-card__video[data-video-id]').forEach(btn => {
    btn.addEventListener('click', () => openLightbox(btn.dataset.videoId));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  // Close on backdrop click
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) closeLightbox();
  });
});


/* --------------------------------------------------
   HEADER-DEPENDENT INIT (runs after components-loaded)
   These features require the dynamically loaded header
   to be present in the DOM.
   -------------------------------------------------- */
document.addEventListener('components-loaded', () => {

  // ---- Sticky Header ----
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // ---- Mobile Navigation ----
  const burger = document.getElementById('burger');
  let overlay = null;

  if (burger) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');

      if (burger.classList.contains('active')) {
        // Create overlay
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        overlay.innerHTML = `
          <nav class="header__nav" style="display:flex">
            <div class="mobile-services">
              <button class="nav-link mobile-services__toggle" type="button">
                Services
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.3s ease"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="mobile-services__list">
                <a href="/services/furniture-assembly/" class="mobile-services__link">Furniture Assembly</a>
                <a href="/services/tv-wall-mounting/" class="mobile-services__link">TV & Wall Mounting</a>
                <a href="/services/appliance-services/" class="mobile-services__link">Appliance Services</a>
                <a href="/services/flooring-installation/" class="mobile-services__link">Flooring Installation</a>
                <a href="/services/painting/" class="mobile-services__link">Painting & Wall Finishes</a>
                <a href="/services/ac-installation-cleaning/" class="mobile-services__link">AC Installation & Cleaning</a>
                <a href="/services/plumbing/" class="mobile-services__link">Plumbing</a>
                <a href="/services/electrical/" class="mobile-services__link">Electrical</a>
                <a href="/services/general-repairs/" class="mobile-services__link">General Repairs</a>
              </div>
            </div>
            <a href="/#why-us" class="nav-link">Why Us</a>
            <a href="/#reviews" class="nav-link">Reviews</a>
            <a href="/#faq" class="nav-link">FAQ</a>
            <a href="/#contact" class="nav-link">Contact</a>
            <button type="button" class="btn btn--accent" style="margin-top:16px" data-open-quote>Get a Free Quote</button>
          </nav>
        `;
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        // Mobile services accordion
        const mobileToggle = overlay.querySelector('.mobile-services__toggle');
        const mobileList = overlay.querySelector('.mobile-services__list');
        mobileToggle.addEventListener('click', () => {
          const isOpen = mobileList.classList.contains('open');
          mobileList.classList.toggle('open');
          mobileToggle.classList.toggle('active');
          const chevron = mobileToggle.querySelector('svg');
          chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
        });

        // Trigger animation
        requestAnimationFrame(() => overlay.classList.add('active'));

        // Close on link click
        overlay.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', closeMenu);
        });
      } else {
        closeMenu();
      }
    });
  }

  function closeMenu() {
    if (burger) burger.classList.remove('active');
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(() => {
        overlay.remove();
        overlay = null;
      }, 400);
    }
    document.body.style.overflow = '';
  }

  // ---- Smooth Scroll for same-page anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
});
