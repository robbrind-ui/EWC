/* ============================================
   EXECUTIVE WRITING COACH — Site JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Sticky Nav Shadow --- */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* --- Hamburger Menu --- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Scroll Fade-In --- */
  const faders = document.querySelectorAll('.fade-in');
  if (faders.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    faders.forEach(el => observer.observe(el));
  }

  /* --- Challenges Carousel --- */
  const carouselTrack = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  if (carouselTrack && prevBtn && nextBtn) {
    let index = 0;
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    const isMobile = () => window.innerWidth <= 768;
    const slidesPerView = () => isMobile() ? 1 : 2;
    const maxIndex = () => Math.max(0, slides.length - slidesPerView());

    function updateCarousel() {
      const pct = 100 / slidesPerView();
      carouselTrack.style.transform = `translateX(-${index * pct}%)`;
    }

    prevBtn.addEventListener('click', () => {
      index = Math.max(0, index - 1);
      updateCarousel();
    });
    nextBtn.addEventListener('click', () => {
      index = Math.min(maxIndex(), index + 1);
      updateCarousel();
    });

    window.addEventListener('resize', () => {
      index = Math.min(index, maxIndex());
      updateCarousel();
    });
  }

  /* --- Testimonial Carousel --- */
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const tPrev = document.querySelector('.testimonial-prev');
  const tNext = document.querySelector('.testimonial-next');
  if (testimonialSlides.length > 0 && tPrev && tNext) {
    let tIndex = 0;

    function showTestimonial(i) {
      testimonialSlides.forEach(s => s.classList.remove('active'));
      testimonialSlides[i].classList.add('active');
    }

    tPrev.addEventListener('click', () => {
      tIndex = (tIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
      showTestimonial(tIndex);
    });
    tNext.addEventListener('click', () => {
      tIndex = (tIndex + 1) % testimonialSlides.length;
      showTestimonial(tIndex);
    });

    // Auto-advance every 8 seconds
    let autoplay = setInterval(() => {
      tIndex = (tIndex + 1) % testimonialSlides.length;
      showTestimonial(tIndex);
    }, 8000);

    // Pause autoplay on hover
    const tContainer = document.querySelector('.testimonial-carousel');
    if (tContainer) {
      tContainer.addEventListener('mouseenter', () => clearInterval(autoplay));
      tContainer.addEventListener('mouseleave', () => {
        autoplay = setInterval(() => {
          tIndex = (tIndex + 1) % testimonialSlides.length;
          showTestimonial(tIndex);
        }, 8000);
      });
    }
  }

});
