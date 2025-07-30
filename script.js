// Burger menu toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navLinks.classList.toggle('active');
  
  // Додаємо анімацію бургеру
  if (burger.classList.contains('active')) {
    gsap.to(burger, { 
      rotation: 180, 
      duration: 0.5, 
      ease: "power2.out" 
    });
  } else {
    gsap.to(burger, { 
      rotation: 0, 
      duration: 0.5, 
      ease: "power2.out" 
    });
  }
});

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
    gsap.to(header, {
      backdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(30, 30, 32, 0.9)',
      duration: 0.5
    });
  } else {
    header.classList.remove('scrolled');
    gsap.to(header, {
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(30, 30, 32, 0.7)',
      duration: 0.5
    });
  }
});

// Стилізація всіх кнопок
function styleButtons() {
  // Стилі для основних кнопок
  document.querySelectorAll('.btn-primary, .btn-secondary, .nav-btn').forEach(btn => {
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.style.border = 'none';
    btn.style.cursor = 'pointer';
    btn.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    btn.style.boxShadow = '0 4px 15px rgba(166, 138, 100, 0.3)';
    
    // Градієнт для ефекту кавової піни
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
    
    // Події для анімації
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-3px)';
      btn.style.boxShadow = '0 8px 25px rgba(166, 138, 100, 0.5)';
      gradient.style.opacity = '0.8';
      
      // Анімація для кнопок
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
  
  // Специфічні стилі для кожної групи кнопок
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
  
  // Стилі для іконок соціальних мереж
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
    
    // Ефект при наведенні
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
}

// Викликаємо функцію стилізації при завантаженні
window.addEventListener('DOMContentLoaded', styleButtons);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    // Анімація прокрутки
    gsap.to(window, {
      scrollTo: {
        y: targetElement,
        offsetY: 80
      },
      duration: 1,
      ease: "power2.out"
    });
    
    // Close mobile menu if open
    if (navLinks.classList.contains('active')) {
      burger.classList.remove('active');
      navLinks.classList.remove('active');
      gsap.to(burger, { 
        rotation: 0, 
        duration: 0.5, 
        ease: "power2.out" 
      });
    }
  });
});

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

function showTestimonial(index) {
  // Приховуємо всі відгуки
  gsap.to(testimonials, {
    opacity: 0,
    y: 30,
    duration: 0.5,
    stagger: 0.1,
    onComplete: () => {
      testimonials.forEach(testimonial => testimonial.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Показуємо активний відгук
      testimonials[index].classList.add('active');
      dots[index].classList.add('active');
      
      // Анімація появи
      gsap.fromTo(testimonials[index], 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.7)" }
      );
    }
  });
  
  currentIndex = index;
}

function nextTestimonial() {
  let nextIndex = currentIndex + 1;
  if (nextIndex >= testimonials.length) nextIndex = 0;
  showTestimonial(nextIndex);
}

function prevTestimonial() {
  let prevIndex = currentIndex - 1;
  if (prevIndex < 0) prevIndex = testimonials.length - 1;
  showTestimonial(prevIndex);
}

// Add event listeners
nextBtn.addEventListener('click', nextTestimonial);
prevBtn.addEventListener('click', prevTestimonial);

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showTestimonial(index);
    
    // Анімація точки
    gsap.fromTo(dot,
      { scale: 1 },
      { scale: 1.4, duration: 0.2, yoyo: true, repeat: 1 }
    );
  });
});

// Auto rotate testimonials
setInterval(nextTestimonial, 5000);

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

// Set initial styles for animated elements
document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-container, .testimonial').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Trigger once on load
window.addEventListener('load', animateOnScroll);

// Блокує контекстне меню (ПКМ)
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// Блокує виділення
document.addEventListener('selectstart', function(e) {
  e.preventDefault();
});

// Блокує довге натискання на мобільному
document.addEventListener('touchstart', function(e) {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});

// Ініціалізація GSAP
gsap.registerPlugin(ScrollToPlugin);















/* Carousel Script */
/* Carousel Script */
const slides = document.querySelectorAll('.carousel-item');
let current = 0;
let isAnimating = false;
let touchStartY = 0;
let touchEndY = 0;

function updateSlides() {
  if (isAnimating) return;
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
}

function nextSlide() {
  current = (current + 1) % slides.length;
  updateSlides();
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  updateSlides();
}

// Auto-scroll
let autoScroll = setInterval(nextSlide, 5000);

// Touch support
const carousel = document.querySelector('.carousel-container');
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

// Initialize carousel
updateSlides();














// Опціонально: можна додати логіку, наприклад, модальне відкриття сертифіката
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-img');
const closeBtn = document.querySelector('.close');

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
