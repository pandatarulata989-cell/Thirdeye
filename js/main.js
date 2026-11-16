/* ==========================================================================
   THIRD EYE MINERALS & PROCESSORS PRIVATE LIMITED
   Main Application & Interactive Features Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 01. Sticky Header Scroll Effect --- */
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  /* --- 02. Mobile Drawer Navigation --- */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const closeDrawer = document.querySelector('.close-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileMenu = () => {
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (closeDrawer) closeDrawer.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* --- 03. Automatic Swiper.js Capability Strip Initialization --- */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.capability-swiper', {
      slidesPerView: 1.3,
      spaceBetween: 12,
      grabCursor: true,
      loop: true,
      speed: 700,
      autoplay: {
        delay: 2200,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      breakpoints: {
        480: {
          slidesPerView: 2.2,
          spaceBetween: 14,
        },
        768: {
          slidesPerView: 3.5,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 16,
        }
      }
    });
  }

  /* --- 04. Modal Pop-Up Enquiry Form Logic --- */
  const modalOverlay = document.getElementById('enquiryModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalForm = document.getElementById('modalEnquiryForm');
  const modalStatus = document.getElementById('modalFormStatus');
  const modalProductSelect = document.getElementById('modalProductSelect');

  const openModal = (productName = '') => {
    if (!modalOverlay) return;
    if (modalProductSelect && productName) {
      modalProductSelect.value = productName;
    }
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Bind all buttons with .trigger-modal class
  document.querySelectorAll('.trigger-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = btn.getAttribute('data-product') || '';
      openModal(product);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Handle Modal Form Submit
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalFullName').value.trim();
      const phone = document.getElementById('modalPhoneNumber').value.trim();
      const product = modalProductSelect ? modalProductSelect.value : '';

      if (!name || !phone || !product) {
        if (modalStatus) {
          modalStatus.textContent = 'Please fill out all required fields (Name, Phone, Product).';
          modalStatus.className = 'form-status error';
        }
        return;
      }

      if (modalStatus) {
        modalStatus.textContent = '✓ Enquiry received. Our procurement team will contact you shortly.';
        modalStatus.className = 'form-status success';
      }
      modalForm.reset();

      setTimeout(() => {
        closeModal();
        if (modalStatus) modalStatus.style.display = 'none';
      }, 2500);
    });
  }

  /* --- 05. 1,00,000 MT Animated Counter (Indian Formatting) --- */
  const countElement = document.getElementById('capacity-counter');
  let hasCounted = false;

  function formatIndianNumber(num) {
    const str = num.toString();
    if (str.length <= 3) return str;
    const lastThree = str.substring(str.length - 3);
    const otherNumbers = str.substring(0, str.length - 3);
    const formattedOther = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    return formattedOther + "," + lastThree;
  }

  function startCountUp() {
    if (hasCounted || !countElement) return;
    hasCounted = true;

    const target = 100000;
    const duration = 1800;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const currentVal = Math.floor(easeProgress * target);

      countElement.textContent = formatIndianNumber(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        countElement.textContent = '1,00,000';
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // IntersectionObserver for Counter
  const capacitySection = document.querySelector('.capacity-section');
  if (capacitySection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCountUp();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(capacitySection);
  }

  /* --- 06. Main Inline Form Validation --- */
  const enquiryForm = document.getElementById('enquiryForm');
  const formStatus = document.getElementById('formStatus');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('fullName').value.trim();
      const phone = document.getElementById('phoneNumber').value.trim();
      const product = document.getElementById('productSelect').value;

      if (!name || !phone || !product) {
        showStatus('Please fill in required fields (Full Name, Phone Number, Product).', 'error');
        return;
      }

      showStatus('✓ Enquiry successfully submitted. Our team at Third Eye Minerals & Processors will contact you shortly.', 'success');
      enquiryForm.reset();
    });
  }

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = 'form-status ' + type;
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // WhatsApp Trigger Buttons
  document.querySelectorAll('.btn-whatsapp, .btn-whatsapp-nav').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = document.getElementById('productSelect')?.value || 'Iron Ore / Industrial Products';
      const text = encodeURIComponent(`Hello Third Eye Minerals & Processors, I am interested in inquiring about ${product} supply.`);
      window.open(`https://wa.me/919861087720?text=${text}`, '_blank');
    });
  });

  /* --- 07. Smooth Scroll for Anchor Links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1 && !this.classList.contains('trigger-modal')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  /* --- 08. Scroll Reveal Observer for Animations --- */
  const revealElements = document.querySelectorAll('.section-title, .section-description, .eyebrow, .division-card, .ore-card, .bm-card, .about-image-wrapper, .about-content, .durastrong-visual, .durastrong-content, .contact-info-card, .contact-form-card');
  
  if (revealElements.length > 0 && typeof IntersectionObserver !== 'undefined') {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    revealElements.forEach((el, index) => {
      el.classList.add('reveal-element');
      // Add staggered delay for grid items
      if (el.classList.contains('division-card') || el.classList.contains('ore-card') || el.classList.contains('bm-card')) {
        const staggerIndex = index % 3;
        el.style.transitionDelay = `${staggerIndex * 0.12}s`;
      }
      revealObserver.observe(el);
    });
  }

});
