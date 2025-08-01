document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('.header');

  if (burger && navLinks) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation(); // Запобігаємо батьківським клікам
      burger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !burger.contains(e.target) && navLinks.classList.contains('active')) {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Header scroll effect
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Стилізація кнопок
  const styleButtons = () => {
    document.querySelectorAll('.btn-primary, .btn-secondary, .nav-btn').forEach(btn => {
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.style.border = 'none';
      btn.style.cursor = 'pointer';
      btn.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      btn.style.boxShadow = '0 4px 15px rgba(166, 138, 100, 0.3)';
      
      const gradient = document.createElement('div');
      gradient.style.position = 'absolute';
      gradient.style.top = '0';
      gradient.style.left = '0';
      gradient.style.width = '100%';
      gradient.style.height = '100%';
      gradient.style.background = 'linear-gradient(120deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)';
      gradient.style.opacity = '0.5';
      gradient.style.pointerEvents = 'none';
      gradient.style.transition = 'opacity 0.3s ease';
      btn.appendChild(gradient);
      
      btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px)';
        btn.style.boxShadow = '0 8px 25px rgba(166, 138, 100, 0.5)';
        gradient.style.opacity = '0.8';
        gsap.to(btn, {
          y: -5,
          boxShadow: '0 10px 30px rgba(166, 138, 100, 0.6)',
          duration: 0.3
        });
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 4px 15px rgba(166, 138, 100, 0.3)';
        gradient.style.opacity = '0.5';
        gsap.to(btn, {
          y: 0,
          boxShadow: '0 4px 15px rgba(166, 138, 100, 0.3)',
          duration: 0.3
        });
      });
      
      btn.addEventListener('mousedown', () => {
        gsap.to(btn, {
          scale: 0.95,
          duration: 0.1
        });
      });
      
      btn.addEventListener('mouseup', () => {
        gsap.to(btn, {
          scale: 1,
          duration: 0.2
        });
      });
    });

    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.style.background = 'linear-gradient(145deg, #d7c4a7, #a68a64)';
      btn.style.color = '#3c2f2f';
      btn.style.padding = '14px 30px';
      btn.style.borderRadius = '50px';
      btn.style.fontWeight = '600';
      btn.style.fontSize = '16px';
    });

    document.querySelectorAll('.btn-secondary').forEach(btn => {
      btn.style.background = 'rgba(255, 245, 230, 0.1)';
      btn.style.color = '#f8ede3';
      btn.style.border = '2px solid rgba(255, 245, 230, 0.3)';
      btn.style.padding = '14px 30px';
      btn.style.borderRadius = '50px';
      btn.style.fontWeight = '600';
      btn.style.fontSize = '16px';
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.style.width = '50px';
      btn.style.height = '50px';
      btn.style.borderRadius = '50%';
      btn.style.background = 'rgba(60, 47, 47, 0.8)';
      btn.style.border = '1px solid rgba(255, 245, 230, 0.3)';
      btn.style.display = 'flex';
      btn.style.alignItems = 'center';
      btn.style.justifyContent = 'center';
    });

    document.querySelectorAll('.icon-link').forEach(link => {
      link.style.display = 'flex';
      link.style.justifyContent = 'center';
      link.style.alignItems = 'center';
      link.style.width = '80px';
      link.style.height = '80px';
      link.style.borderRadius = '50%';
      link.style.background = 'rgba(215, 196, 167, 0.1)';
      link.style.backdropFilter = 'blur(5px)';
      link.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      link.style.transition = 'all 0.4s ease';
      
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          scale: 1.1,
          backgroundColor: 'rgba(215, 196, 167, 0.2)',
          duration: 0.3
        });
      });
      
      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          scale: 1,
          backgroundColor: 'rgba(215, 196, 167, 0.1)',
          duration: 0.3
        });
      });
    });
  };

  window.addEventListener('DOMContentLoaded', styleButtons);

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        gsap.to(window, {
          scrollTo: {
            y: targetElement,
            offsetY: 80
          },
          duration: 1,
          ease: "power2.out"
        });
      }

      if (navLinks && navLinks.classList.contains('active')) {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
        if (burger) {
          gsap.to(burger, { rotation: 0, duration: 0.5, ease: "power2.out" });
        }
        document.body.style.overflow = '';
      }
    });
  });

  // Testimonial slider
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 0;

  const showTestimonial = (index) => {
    if (!testimonials.length) return;
    gsap.to(testimonials, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      stagger: 0.1,
      onComplete: () => {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        
        gsap.fromTo(testimonials[index], 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.7)" }
        );
      }
    });
    currentIndex = index;
  };

  const nextTestimonial = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= testimonials.length) nextIndex = 0;
    showTestimonial(nextIndex);
  };

  const prevTestimonial = () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = testimonials.length - 1;
    showTestimonial(prevIndex);
  };

  if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
  if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showTestimonial(index);
      gsap.fromTo(dot, { scale: 1 }, { scale: 1.4, duration: 0.2, yoyo: true, repeat: 1 });
    });
  });

  if (testimonials.length) setInterval(nextTestimonial, 5000);

  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-container, .testimonial');
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight * 0.8) {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out"
        });
      }
    });
  };

  document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-container, .testimonial').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
  });

  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);

  // Блокує контекстне меню
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('selectstart', e => e.preventDefault());
  document.addEventListener('touchstart', e => {
    if (e.touches.length > 1) e.preventDefault();
  }, { passive: false });
  document.addEventListener('gesturestart', e => e.preventDefault());

  // Carousel
  const slides = document.querySelectorAll('.carousel-item');
  const carousel = document.querySelector('.carousel-container');
  let current = 0;
  let isAnimating = false;
  let touchStartY = 0;
  let touchEndY = 0;

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
          translateZ: 0,
          filter: 'brightness(1) blur(0px)',
          duration: 0.6,
          ease: 'power2.out',
        });
      } else if (i === (current - 1 + slides.length) % slides.length) {
        slide.classList.add('prev');
        gsap.to(slide, {
          opacity: 0.5,
          scale: 0.9,
          translateZ: -100,
          translateY: '-10%',
          filter: 'brightness(0.6) blur(2px)',
          duration: 0.6,
          ease: 'power2.out',
        });
      } else if (i === (current + 1) % slides.length) {
        slide.classList.add('next');
        gsap.to(slide, {
          opacity: 0.5,
          scale: 0.9,
          translateZ: -100,
          translateY: '10%',
          filter: 'brightness(0.6) blur(2px)',
          duration: 0.6,
          ease: 'power2.out',
        });
      } else {
        gsap.to(slide, {
          opacity: 0,
          scale: 0.8,
          translateZ: -200,
          filter: 'brightness(0.6) blur(2px)',
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    });

    setTimeout(() => {
      isAnimating = false;
    }, 600);
  };

  const nextSlide = () => {
    current = (current + 1) % slides.length;
    updateSlides();
  };

  const prevSlide = () => {
    current = (current - 1 + slides.length) % slides.length;
    updateSlides();
  };

  if (carousel) {
    let autoScroll = setInterval(nextSlide, 5000);
    carousel.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    });

    carousel.addEventListener('touchend', (e) => {
      touchEndY = e.changedTouches[0].clientY;
      if (touchStartY - touchEndY > 50) {
        clearInterval(autoScroll);
        nextSlide();
        autoScroll = setInterval(nextSlide, 5000);
      } else if (touchEndY - touchStartY > 50) {
        clearInterval(autoScroll);
        prevSlide();
        autoScroll = setInterval(nextSlide, 5000);
      }
    });

    updateSlides();
  }

  // Modal for certificates
  const modal = document.querySelector('.modal');
  const modalImg = document.querySelector('.modal-img');
  const closeBtn = document.querySelector('.close');

  if (modal && modalImg && closeBtn) {
    document.querySelectorAll('.certificate-image').forEach(img => {
      img.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modalImg.src = img.src;
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  }

  // Ініціалізація GSAP
  if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
    gsap.registerPlugin(ScrollToPlugin);
  } else {
    console.error('GSAP or ScrollToPlugin not loaded!');
  }
});
