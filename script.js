// ✅ ОПТИМІЗОВАНИЙ WebsiteController
class WebsiteController {
  constructor() {
    this.state = {
      isMenuOpen: false,
      isAnimating: false,
      lastScrollY: 0,
      autoScrollInterval: null,
      currentSlide: 0
    };

    this.config = {
      scrollThreshold: 5,
      headerScrollThreshold: 50,
      carouselInterval: 5000,
      pauseDuration: 10000,
      animationDuration: 600
    };

    this.DOM = this.cacheElements();
    this.init();
  }

  cacheElements() {
    const selectors = {
      burger: '.burger',
      navLinks: '.nav-links',
      header: '.header',
      carousel: '.carousel-container',
      modal: '.modal',
      modalImg: '.modal-img',
      closeBtn: '.close',
      portfolio: '.portfolio-grid'
    };

    return Object.fromEntries(
      Object.entries(selectors).map(([key, sel]) => [key, document.querySelector(sel)])
    );
  }

  init() {
    this.initBurgerMenu();
    this.initHeaderScroll();
    this.initPortfolio();
    this.initCarousel();
    this.initModal();
    this.initSmoothScroll();
    this.initScrollAnimations();
    this.bindGlobalEvents();
  }

  // === BURGER MENU ===
  initBurgerMenu() {
    const { burger, navLinks } = this.DOM;
    if (!burger || !navLinks) return;

    burger.addEventListener('click', e => {
      e.stopPropagation();
      this.toggleMenu();
    });

    navLinks.addEventListener('click', e => {
      if (e.target.tagName === 'A') this.closeMenu();
    });
  }

  toggleMenu() {
    this.state.isMenuOpen = !this.state.isMenuOpen;
    const { burger, navLinks } = this.DOM;
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = this.state.isMenuOpen ? 'hidden' : '';
  }

  closeMenu() {
    if (!this.state.isMenuOpen) return;
    this.state.isMenuOpen = false;
    this.toggleMenu();
  }

  // === HEADER ===
  initHeaderScroll() {
    if (!this.DOM.header) return;
    this.state.lastScrollY = window.scrollY;
    this.updateHeaderState();

    window.addEventListener('scroll', () => {
      const current = window.scrollY;
      if (Math.abs(current - this.state.lastScrollY) > this.config.scrollThreshold) {
        requestAnimationFrame(() => {
          this.updateHeaderState();
          this.state.lastScrollY = current;
        });
      }
    }, { passive: true });
  }

  updateHeaderState() {
    this.DOM.header.classList.toggle('scrolled', window.scrollY > this.config.headerScrollThreshold);
  }

  // === PORTFOLIO ===
  initPortfolio() {
    const { portfolio } = this.DOM;
    if (!portfolio) return;

    portfolio.addEventListener('click', e => {
      const btn = e.target.closest('.read-more');
      if (!btn) return;
      const item = btn.closest('.portfolio-item');
      const expanded = item.classList.toggle('expanded');
      btn.textContent = expanded ? 'Згорнути' : 'Більше';
    });
  }

  // === CAROUSEL ===
  initCarousel() {
    const { carousel } = this.DOM;
    if (!carousel) return;

    this.slides = carousel.querySelectorAll('.carousel-item');
    if (!this.slides.length) return;

    carousel.addEventListener('mouseenter', this.pauseAutoScroll.bind(this));
    carousel.addEventListener('mouseleave', this.resumeAutoScroll.bind(this));
    carousel.addEventListener('touchstart', this.pauseAutoScroll.bind(this));

    this.startAutoScroll();
    this.updateSlides();
  }

  updateSlides() {
    if (this.state.isAnimating) return;
    this.state.isAnimating = true;

    const total = this.slides.length;

    this.slides.forEach((slide, i) => {
      slide.classList.remove('active', 'prev', 'next');
      const props = { duration: 0.6, ease: 'power2.out', opacity: 0, scale: 0.8 };

      if (i === this.state.currentSlide) {
        slide.classList.add('active');
        Object.assign(props, { opacity: 1, scale: 1 });
      } else if (i === (this.state.currentSlide - 1 + total) % total) {
        slide.classList.add('prev');
        Object.assign(props, { opacity: 0.5, scale: 0.9 });
      } else if (i === (this.state.currentSlide + 1) % total) {
        slide.classList.add('next');
        Object.assign(props, { opacity: 0.5, scale: 0.9 });
      }

      gsap?.to(slide, props);
    });

    setTimeout(() => this.state.isAnimating = false, this.config.animationDuration);
  }

  nextSlide() {
    this.state.currentSlide = (this.state.currentSlide + 1) % this.slides.length;
    this.updateSlides();
  }

  startAutoScroll() {
    this.clearAutoScroll();
    this.state.autoScrollInterval = setInterval(() => this.nextSlide(), this.config.carouselInterval);
  }

  pauseAutoScroll() {
    this.clearAutoScroll();
    setTimeout(() => this.startAutoScroll(), this.config.pauseDuration);
  }

  resumeAutoScroll() {
    this.startAutoScroll();
  }

  clearAutoScroll() {
    clearInterval(this.state.autoScrollInterval);
    this.state.autoScrollInterval = null;
  }

  // === MODAL ===
  initModal() {
    const { modal, modalImg, closeBtn } = this.DOM;
    if (!modal || !modalImg || !closeBtn) return;

    closeBtn.addEventListener('click', () => this.closeModal());
    modal.addEventListener('click', e => e.target === modal && this.closeModal());
    document.addEventListener('click', e => {
      const img = e.target.closest('.certificate-image');
      if (img) this.openModal(img.src);
    });
  }

  openModal(src) {
    this.DOM.modal.classList.remove('hidden');
    this.DOM.modalImg.src = src;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.DOM.modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // === SMOOTH SCROLL ===
  initSmoothScroll() {
    document.addEventListener('click', e => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      e.preventDefault();

      gsap?.to(window, {
        scrollTo: { y: target, offsetY: 80 },
        duration: 1,
        ease: 'power2.out'
      }) || target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      this.closeMenu();
    });
  }

  // === LAZY SCROLL ANIMATIONS ===
  initScrollAnimations() {
    const animated = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .testimonial');
    if (!animated.length || !window.IntersectionObserver) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap?.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out'
          }) || Object.assign(entry.target.style, {
            opacity: 1,
            transform: 'translateY(0)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
          });

          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    animated.forEach(el => {
      gsap?.set(el, { opacity: 0, y: 30 });
      observer.observe(el);
    });
  }

  // === GLOBAL EVENTS ===
  bindGlobalEvents() {
    document.addEventListener('click', e => {
      const { burger, navLinks } = this.DOM;
      if (this.state.isMenuOpen && !navLinks?.contains(e.target) && !burger?.contains(e.target)) {
        this.closeMenu();
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (this.state.isMenuOpen) this.closeMenu();
        if (!this.DOM.modal.classList.contains('hidden')) this.closeModal();
      }
    });

    window.addEventListener('beforeunload', () => this.clearAutoScroll());
  }

  // === PUBLIC API ===
  goToSlide(index) {
    if (index >= 0 && index < this.slides.length) {
      this.state.currentSlide = index;
      this.updateSlides();
    }
  }

  pauseCarousel() { this.clearAutoScroll(); }
  resumeCarousel() { this.startAutoScroll(); }
}

// Ініціалізація
window.addEventListener('DOMContentLoaded', () => {
  window.websiteController = new WebsiteController();
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = WebsiteController;
}
