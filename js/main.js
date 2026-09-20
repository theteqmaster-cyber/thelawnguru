/**
 * The Lawn Guru - Main Interactive Script
 * Harare, Zimbabwe • Lawn & Landscaping Specialists
 */

document.addEventListener('DOMContentLoaded', () => {
  initTurfSplashAndParticles();
  initHeader();
  initMobileNav();
  initScrollReveal();
  initGalleryLightbox();
  initReviewsSystem();
  initContactForm();
});

/* ==========================================================================
   Smooth Scroll Reveal (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   First-Time Visitor Turf Rollout Splash & Ambient Particles (Ideas 1 & 6)
   ========================================================================== */
function initTurfSplashAndParticles() {
  const splash = document.getElementById('turfSplashOverlay');
  const ambientContainer = document.getElementById('heroAmbientContainer');

  // Spawn ambient floating dew & leaf particles (Idea 6)
  if (ambientContainer) {
    const leafSvg = `<svg viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7.5 17.5 9.5 12 17 10V8zm0-6C9.5 2 4 7.5 4 15c0 1.5.3 3 .8 4.3 1.8-4.7 4.2-9.3 12.2-11.3V2z"/></svg>`;
    
    // Create 7 ambient particles
    for (let i = 0; i < 7; i++) {
      const particle = document.createElement('div');
      particle.className = 'ambient-particle';

      const isDew = i % 2 === 0;
      if (isDew) {
        particle.classList.add('dewdrop-particle');
        const size = Math.floor(Math.random() * 8) + 8; // 8px to 16px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
      } else {
        particle.classList.add('leaf-particle');
        particle.innerHTML = leafSvg;
        const size = Math.floor(Math.random() * 8) + 14; // 14px to 22px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
      }

      particle.style.left = `${Math.floor(Math.random() * 90) + 5}%`;
      particle.style.animationDuration = `${(Math.random() * 5 + 6).toFixed(1)}s`;
      particle.style.animationDelay = `${(Math.random() * 4).toFixed(1)}s`;

      ambientContainer.appendChild(particle);
    }
  }

  // Handle Splash Curtain (Idea 1)
  if (!splash) return;

  const hasSeen = sessionStorage.getItem('thelawnguru_splash_seen');
  if (hasSeen) {
    splash.classList.add('hidden');
    return;
  }

  let dismissed = false;
  const dismissSplash = () => {
    if (dismissed) return;
    dismissed = true;
    splash.classList.add('rollout-up');
    sessionStorage.setItem('thelawnguru_splash_seen', 'true');
    setTimeout(() => {
      splash.classList.add('hidden');
    }, 850);
  };

  // Auto roll out after 1.25 seconds
  const timer = setTimeout(dismissSplash, 1250);

  // Allow immediate tap/click to dismiss without waiting
  splash.addEventListener('click', () => {
    clearTimeout(timer);
    dismissSplash();
  });
}

/* ==========================================================================
   1. Header Scroll Effect
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navDrawer = document.querySelector('.mobile-nav-drawer');
  if (!toggleBtn || !navDrawer) return;

  toggleBtn.addEventListener('click', () => {
    navDrawer.classList.toggle('open');
    const isOpen = navDrawer.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close when clicking links
  navDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navDrawer.classList.remove('open');
    });
  });
}

/* ==========================================================================
   3. Gallery Category Filter & Lightbox Modal
   ========================================================================== */
function initGalleryLightbox() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  // Filter Buttons
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Lightbox Click
  if (lightboxModal && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-title');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'Lawn Guru Project Photo';
          if (lightboxCaption && caption) {
            lightboxCaption.textContent = caption.textContent;
          }
          lightboxModal.classList.add('active');
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
}

/* ==========================================================================
   5. Reviews System (Pre-loaded 7 Great + 1 Average + Add Review)
   ========================================================================== */
const DEFAULT_REVIEWS = [
  {
    id: 1,
    name: "Tinashe Moyo",
    suburb: "Borrowdale, Harare",
    rating: 5,
    date: "12 September 2026",
    text: "The Lawn Guru transformed our Borrowdale home completely! The Durban grass they supplied is lush, emerald green, and took root in just two weeks. Excellent punctuality and professional advice on lawn fertilization."
  },
  {
    id: 2,
    name: "Sarah Van Der Merwe",
    suburb: "Highlands, Harare",
    rating: 5,
    date: "4 September 2026",
    text: "We needed our corporate commercial entrance revamped in Highlands. Their landscaping design, stone borders, and clean Kikuyu turf made the premises look prestigious. Outstanding workmanship!"
  },
  {
    id: 3,
    name: "Kudzai Chidambwe",
    suburb: "Mount Pleasant, Harare",
    rating: 5,
    date: "28 August 2026",
    text: "Prompt communication on WhatsApp, an on-site yard assessment within 24 hours, and our 350m² lawn was laid flawlessly in two days. The best lawn specialist in Harare!"
  },
  {
    id: 4,
    name: "Michelle Ndlovu",
    suburb: "Avondale, Harare",
    rating: 5,
    date: "19 August 2026",
    text: "Our yard was previously hard, uneven red earth. The Lawn Guru team graded the ground, brought rich topsoil, and laid Buffalo grass. Now our kids play barefoot on it every day without worry."
  },
  {
    id: 5,
    name: "Tendai Mataranyika",
    suburb: "Greystone Park, Harare",
    rating: 4,
    date: "11 August 2026",
    text: "Top tier grass quality and crisp edging along our paved driveway. The crew was courteous and left the entire yard spotless after finishing. Highly recommended for garden cleanups and turf."
  },
  {
    id: 6,
    name: "David Mutasa",
    suburb: "Chisipite, Harare",
    rating: 5,
    date: "2 August 2026",
    text: "Honest transparent pricing with zero surprise charges. The owner personally guided us on which grass variety would withstand our shaded trees. The Pasadena lawn looks like a golf green!"
  },
  {
    id: 7,
    name: "Rutendo Gumbo",
    suburb: "Westgate, Harare",
    rating: 5,
    date: "25 July 2026",
    text: "Ordered 200m² for our newly built home in Westgate. Healthy turf rolls, fast delivery, and attentive after-care instructions. Harare's true lawn gurus!"
  },
  {
    id: 8,
    name: "Brian Musarurwa",
    suburb: "Glen Lorne, Harare",
    rating: 3,
    date: "14 July 2026",
    text: "The grass quality itself is great and grew beautifully green. However, the topsoil delivery truck had a 4-hour delay on the first morning due to logistics. Once the workers arrived they worked double-time and finished on schedule. Fair and honest service overall."
  }
];

function initReviewsSystem() {
  const container = document.getElementById('reviewsContainer');
  const reviewForm = document.getElementById('addReviewForm');
  const starInputs = document.querySelectorAll('#starRatingInput span');
  const ratingInputHidden = document.getElementById('selectedRating');

  // Load reviews from localStorage or default
  let reviews = [];
  try {
    const saved = localStorage.getItem('thelawnguru_reviews');
    if (saved) {
      reviews = JSON.parse(saved);
    } else {
      reviews = [...DEFAULT_REVIEWS];
      localStorage.setItem('thelawnguru_reviews', JSON.stringify(reviews));
    }
  } catch (e) {
    reviews = [...DEFAULT_REVIEWS];
  }

  // Render reviews if container exists
  if (container) {
    renderReviews(reviews, container);
    updateReviewsStats(reviews);
  }

  // Star Rating Picker
  if (starInputs.length > 0 && ratingInputHidden) {
    starInputs.forEach(star => {
      star.addEventListener('click', () => {
        const val = parseInt(star.getAttribute('data-value'), 10);
        ratingInputHidden.value = val;
        starInputs.forEach(s => {
          const sVal = parseInt(s.getAttribute('data-value'), 10);
          if (sVal <= val) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
      });
    });
  }

  // Review Form Submit
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reviewName').value.trim();
      const suburb = document.getElementById('reviewSuburb').value.trim() || 'Harare';
      const text = document.getElementById('reviewText').value.trim();
      const rating = parseInt(ratingInputHidden ? ratingInputHidden.value : 5, 10) || 5;

      if (!name || !text) {
        showToast('Please fill in your name and review message.');
        return;
      }

      const newReview = {
        id: Date.now(),
        name,
        suburb: suburb.includes('Harare') ? suburb : `${suburb}, Harare`,
        rating,
        date: "Just now",
        text
      };

      reviews.unshift(newReview);
      try {
        localStorage.setItem('thelawnguru_reviews', JSON.stringify(reviews));
      } catch (err) {}

      if (container) {
        renderReviews(reviews, container);
        updateReviewsStats(reviews);
      }

      reviewForm.reset();
      if (ratingInputHidden) ratingInputHidden.value = '5';
      starInputs.forEach(s => s.classList.add('active'));

      showToast('Thank you! Your review has been added successfully.');
    });
  }
}

function renderReviews(reviewsList, container) {
  container.innerHTML = '';
  reviewsList.forEach(item => {
    const card = document.createElement('div');
    card.className = 'review-card';

    // Build star SVG string
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= item.rating) {
        starsHtml += `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
      } else {
        starsHtml += `<svg style="color: #cbd5e1;" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
      }
    }

    const initial = item.name.charAt(0).toUpperCase();

    card.innerHTML = `
      <div class="review-stars">${starsHtml}</div>
      <p class="review-text">"${escapeHtml(item.text)}"</p>
      <div class="review-author-row">
        <div class="author-avatar">${initial}</div>
        <div class="author-info">
          <div class="author-name">${escapeHtml(item.name)}</div>
          <div class="author-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            ${escapeHtml(item.suburb)}
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function updateReviewsStats(reviewsList) {
  const avgElem = document.getElementById('reviewsAvgScore');
  const countElem = document.getElementById('reviewsCountDisplay');
  if (!avgElem || !countElem) return;

  if (reviewsList.length === 0) return;

  const sum = reviewsList.reduce((acc, r) => acc + r.rating, 0);
  const avg = (sum / reviewsList.length).toFixed(1);

  avgElem.textContent = avg;
  countElem.textContent = `Based on ${reviewsList.length} verified customer reviews in Harare`;
}

/* ==========================================================================
   6. Contact Form & Confirmation Modal
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const modal = document.getElementById('contactSuccessModal');
  const modalClose = document.getElementById('modalCloseBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value.trim();
    const phone = form.querySelector('[name="phone"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    if (!name || !phone || !message) {
      showToast('Please fill in your name, contact number, and message.');
      return;
    }

    // Show success modal
    if (modal) {
      modal.classList.add('active');
    } else {
      showToast('Message sent! Thank you for reaching out to The Lawn Guru.');
    }

    form.reset();
  });

  if (modal && modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.className = 'toast-alert';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div>
      <div class="toast-title">The Lawn Guru</div>
      <div class="toast-desc">${escapeHtml(message)}</div>
    </div>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
