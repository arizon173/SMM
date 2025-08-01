document.addEventListener('DOMContentLoaded', () => {
  // Кешування DOM-елементів
  const DOM = {
    burger: document.querySelector('.burger'),
    navLinks: document.querySelector('.nav-links'),
    header: document.querySelector('.header'),
    carousel: document.querySelector('.carousel-container'),
    modal: document.querySelector('.modal'),
    modalImg: document.querySelector('.modal-img'),
    closeBtn: document.querySelector('.close'),
    portfolio: document.querySelector('.portfolio-grid')
  };

  // Стан меню (відкрите/закрите)
  let isMenuOpen = false;

  // Функція для закриття меню
  const closeMenu = () => {
    DOM.burger.classList.remove('active');
    DOM.navLinks.classList.remove('active');
    document.body.style.overflow = '';
    isMenuOpen = false;
  };

  // Функція для відкриття/закриття меню
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    DOM.burger.classList.toggle('active');
    DOM.navLinks.classList.toggle('active');
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  };

  // Бургер-меню з делегуванням подій
  if (DOM.burger && DOM.navLinks) {
    DOM.burger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Закриття меню при кліку на посилання
    DOM.navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        closeMenu();
      }
    });

    // Закриття меню при кліку поза меню
    document.addEventListener('click', (e) => {
      if (isMenuOpen && 
          !DOM.navLinks.contains(e.target) && 
          !DOM.burger.contains(e.target)) {
        closeMenu();
      }
    });

    // Закриття меню при натисканні Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    });
  }

  // Ефект скролу для хедера з requestAnimationFrame
  if (DOM.header) {
    let lastScrollY = window.scrollY;
    
    const updateHeader = () => {
      DOM.header.classList.toggle('scrolled', window.scrollY > 50);
    };

    const onScroll = () => {
      if (Math.abs(window.scrollY - lastScrollY) > 5) {
        requestAnimationFrame(updateHeader);
        lastScrollY = window.scrollY;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateHeader(); // Ініціалізація стану
  }

  // Кнопка "Більше" для портфоліо з делегуванням
  if (DOM.portfolio) {
    DOM.portfolio.addEventListener('click', (e) => {
      const button = e.target.closest('.read-more');
      if (!button) return;
      
      const portfolioItem = button.closest('.portfolio-item');
      portfolioItem.classList.toggle('expanded');
      button.textContent = portfolioItem.classList.contains('expanded') 
        ? 'Згорнути' 
        : 'Більше';
    });
  }

  // Вертикальна карусель з оптимізацією
  if (DOM.carousel) {
    const slides = document.querySelectorAll('.carousel-item');
    let current = 0;
    let isAnimating = false;
    let autoScrollInterval;

    const updateSlides = () => {
      if (isAnimating || !slides.length) return;
      isAnimating = true;

      slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev', 'next');
        if (i === current) {
          slide.classList.add('active');
          gsap.to(slide, { 
            opacity: 1, 
            scale: 1, 
            duration: 0.6,
            ease: 'power2.out'
          });
        } else if (i === (current - 1 + slides.length) % slides.length) {
          slide.classList.add('prev');
          gsap.to(slide, { 
            opacity: 0.5, 
            scale: 0.9, 
            duration: 0.6,
            ease: 'power2.out'
          });
        } else if (i === (current + 1) % slides.length) {
          slide.classList.add('next');
          gsap.to(slide, { 
            opacity: 0.5, 
            scale: 0.9, 
            duration: 0.6,
            ease: 'power2.out'
          });
        } else {
          gsap.to(slide, { 
            opacity: 0, 
            scale: 0.8, 
            duration: 0.6,
            ease: 'power2.out'
          });
        }
      });

      setTimeout(() => isAnimating = false, 600);
    };

    const nextSlide = () => {
      current = (current + 1) % slides.length;
      updateSlides();
    };

    const prevSlide = () => {
      current = (current - 1 + slides.length) % slides.length;
      updateSlides();
    };

    // Автоскрол з паузою при взаємодії
    const startAutoScroll = () => {
      autoScrollInterval = setInterval(nextSlide, 5000);
    };

    const pauseAutoScroll = () => {
      clearInterval(autoScrollInterval);
      setTimeout(startAutoScroll, 10000); // Повернення автоскролу через 10с
    };

    DOM.carousel.addEventListener('mouseenter', pauseAutoScroll);
    DOM.carousel.addEventListener('touchstart', pauseAutoScroll);
    
    startAutoScroll();
    updateSlides();
  }

  // Модальне вікно для сертифікатів
  if (DOM.modal && DOM.modalImg && DOM.closeBtn) {
    const openModal = (imgSrc) => {
      DOM.modal.classList.remove('hidden');
      DOM.modalImg.src = imgSrc;
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      DOM.modal.classList.add('hidden');
      document.body.style.overflow = '';
    };

    // Відкриття модалки
    document.addEventListener('click', (e) => {
      const img = e.target.closest('.certificate-image');
      if (img) openModal(img.src);
    });

    // Закриття модалки
    DOM.closeBtn.addEventListener('click', closeModal);
    DOM.modal.addEventListener('click', (e) => {
      if (e.target === DOM.modal) closeModal();
    });

    // Закриття при натисканні Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !DOM.modal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

  // Плавний скрол з делегуванням
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    
    const targetId = anchor.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      e.preventDefault();
      
      gsap.to(window, {
        scrollTo: {
          y: targetElement,
          offsetY: 80
        },
        duration: 1,
        ease: "power2.out"
      });
    }

    // Закриття меню після кліку на посилання
    if (isMenuOpen) {
      closeMenu();
    }
  });

  // Анімації при скролі з Intersection Observer
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      '.service-card, .portfolio-item, .about-content, .testimonial'
    );
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out"
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    elements.forEach(element => {
      gsap.set(element, { opacity: 0, y: 30 });
      observer.observe(element);
    });
  };

  animateOnScroll();
});
