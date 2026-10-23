/**
 * AYUSH'S BIRTHDAY EXPERIENCE — JAVASCRIPT CORE
 * ═══════════════════════════════════════════════════════════════════
 * High-performance GSAP animations, interactive horizontal timeline,
 * PDF/Video modals, brotherhood letter reveal, and physics confetti.
 * ═══════════════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
  // Use global configuration or fallback
  const cfg = window.AYUSH_CONFIG || {};

  /* ─────────────────────────────────────────────────────────────
     1. INJECT CONFIG DATA INTO DOM SAFELY
  ───────────────────────────────────────────────────────────── */
  (function populateFromConfig() {
    if (!cfg.recipient) return;

    // Recipient names
    const recipientName = cfg.recipient.name || "Ayush";
    document.title = `Happy Birthday, ${recipientName} ✦ The GOAT's Day-One Bro`;

    // Timeline entries config sync
    if (cfg.timeline && Array.isArray(cfg.timeline.entries)) {
      const pdfEntry = cfg.timeline.entries.find(e => e.type === 'pdf');
      if (pdfEntry && pdfEntry.pdfUrl) {
        const dlBtn = document.getElementById('downloadPdfBtn');
        const iframe = document.getElementById('pdfIframe');
        const placeholder = document.getElementById('pdfPreviewPlaceholder');
        if (dlBtn) dlBtn.href = pdfEntry.pdfUrl;
        if (iframe && placeholder) {
          iframe.src = pdfEntry.pdfUrl;
          iframe.classList.remove('hidden');
          placeholder.style.display = 'none';
        }
      }

      const videoEntry = cfg.timeline.entries.find(e => e.type === 'video');
      if (videoEntry && videoEntry.videoUrl) {
        const videoPlayer = document.getElementById('birthdayVideoPlayer');
        const videoSource = document.getElementById('videoSource');
        const videoPlaceholder = document.getElementById('videoPlaceholderScreen');
        if (videoPlayer && videoSource && videoPlaceholder) {
          videoSource.src = videoEntry.videoUrl;
          videoPlayer.load();
          videoPlayer.classList.add('active');
          videoPlaceholder.style.display = 'none';
        }
      }
    }
  })();


  /* ─────────────────────────────────────────────────────────────
     2. CELESTIAL BACKGROUND CANVAS (ARGENTINA / GOLD / BARCA)
  ───────────────────────────────────────────────────────────── */
  (function initAmbientCanvas() {
    const canvas = document.getElementById('ambientCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const NUM_STARS = Math.min(160, Math.floor(window.innerWidth / 10));
    const stars = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.008 + 0.003,
      phase: Math.random() * Math.PI * 2,
      type: Math.random() > 0.7 ? 'sky' : (Math.random() > 0.85 ? 'gold' : 'white'),
      driftX: (Math.random() - 0.5) * 0.15,
      driftY: (Math.random() - 0.5) * 0.08,
    }));

    function animFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(s => {
        s.phase += s.speed;
        s.x += s.driftX;
        s.y += s.driftY;
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;

        const a = s.alpha * (0.4 + 0.6 * Math.sin(s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);

        if (s.type === 'sky') {
          ctx.fillStyle = `rgba(117, 201, 241, ${a})`;
        } else if (s.type === 'gold') {
          ctx.fillStyle = `rgba(255, 209, 102, ${a * 0.9})`;
        } else {
          ctx.fillStyle = `rgba(248, 250, 252, ${a * 0.8})`;
        }
        ctx.fill();
      });

      requestAnimationFrame(animFrame);
    }
    animFrame();
  })();


  /* ─────────────────────────────────────────────────────────────
     3. GSAP ANIMATIONS & SCROLL REVEALS
  ───────────────────────────────────────────────────────────── */
  (function initGSAP() {
    if (typeof gsap === 'undefined') return;
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero timeline entrance
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      .from('.hero-badge', { opacity: 0, y: -20, duration: 0.8, delay: 0.2 })
      .from('.hero-pretitle', { opacity: 0, y: 15, duration: 0.6 }, '-=0.4')
      .from('.hero-headline', { opacity: 0, y: 25, scale: 0.98, duration: 1 }, '-=0.4')
      .from('.hero-supporting', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
      .from('.hero-friendship-quote', { opacity: 0, y: 15, duration: 0.7 }, '-=0.4')
      .from('.hero-actions .btn', { opacity: 0, y: 20, stagger: 0.15, duration: 0.7 }, '-=0.3')
      .from('.hero-ribbon', { opacity: 0, y: 20, duration: 0.8 }, '-=0.4')
      .from('.hero-scroll-indicator', { opacity: 0, duration: 0.8 }, '-=0.2');

    // Section scroll animations
    if (typeof ScrollTrigger !== 'undefined') {
      // ── Our Story Timeline (Original Spine Draw & 3D Flip) ──
      gsap.fromTo('.timeline-spine',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 2.5,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-wrap',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        }
      );

      const storyItems = gsap.utils.toArray('.tl-item');
      storyItems.forEach((item, i) => {
        const side = item.dataset.side;
        const card = item.querySelector('.tl-card');

        // Fade & float up
        gsap.fromTo(item,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.05,
          }
        );

        // 3D card tilt & perspective flip on scroll
        if (card) {
          gsap.fromTo(card,
            {
              rotationY: side === 'left' ? -25 : 25,
              rotationX: 8,
              transformPerspective: 600,
            },
            {
              rotationY: 0,
              rotationX: 0,
              duration: 1.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });

      // Timeline Section Header & Cards
      gsap.from('#timeline .section-header', {
        scrollTrigger: {
          trigger: '#timeline',
          start: 'top 85%',
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: 'power2.out',
      });

      gsap.from('.timeline-card', {
        scrollTrigger: {
          trigger: '.timeline-track-outer',
          start: 'top 85%',
        },
        opacity: 0,
        y: 45,
        stagger: 0.18,
        duration: 0.85,
        ease: 'power3.out',
      });

      // Messi Corner Cards Stagger
      gsap.from('.bento-card', {
        scrollTrigger: {
          trigger: '#messiCorner',
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        stagger: 0.14,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Brotherhood Letter entrance
      gsap.from('#letterSection .section-container', {
        scrollTrigger: {
          trigger: '#letterSection',
          start: 'top 80%',
        },
        opacity: 0,
        y: 35,
        duration: 0.85,
        ease: 'power2.out',
      });

      // Celebrate Section pod entrance
      gsap.from('.celebrate-glass-pod', {
        scrollTrigger: {
          trigger: '#celebrateSection',
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.94,
        y: 30,
        duration: 0.9,
        ease: 'back.out(1.2)',
      });
    }

    // ── 3D Card Interactive Tilt (Desktop Hover & Mobile Touch) ──
    document.querySelectorAll('.tl-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const tx = ((e.clientX - r.left) / r.width - 0.5) * 16;
        const ty = ((e.clientY - r.top) / r.height - 0.5) * 16;
        gsap.to(card, {
          rotationY: tx,
          rotationX: -ty,
          transformPerspective: 600,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.6, ease: 'power2.out' });
      });

      card.addEventListener('touchmove', e => {
        const t = e.touches[0];
        const r = card.getBoundingClientRect();
        const tx = ((t.clientX - r.left) / r.width - 0.5) * 14;
        const ty = ((t.clientY - r.top) / r.height - 0.5) * 14;
        gsap.to(card, {
          rotationY: tx,
          rotationX: -ty,
          transformPerspective: 600,
          duration: 0.3,
          ease: 'power2.out',
        });
      }, { passive: true });

      card.addEventListener('touchend', () => {
        gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.6, ease: 'power2.out' });
      });
    });
  })();


  /* ─────────────────────────────────────────────────────────────
     4. HORIZONTAL TIMELINE LOGIC & SYNCHRONIZATION
  ───────────────────────────────────────────────────────────── */
  (function initTimeline() {
    const track = document.getElementById('timelineTrack');
    const pills = document.querySelectorAll('.year-pill');
    const prevBtn = document.getElementById('timelinePrevBtn');
    const nextBtn = document.getElementById('timelineNextBtn');
    const cards = document.querySelectorAll('.timeline-card');
    const progressFill = document.getElementById('timelineProgressFill');

    if (!track || !cards.length) return;

    let currentIndex = 0;

    function updateActiveState(index) {
      if (index < 0 || index >= cards.length) return;
      currentIndex = index;

      // Update pills
      pills.forEach((p, idx) => {
        const isActive = idx === currentIndex;
        p.classList.toggle('active', isActive);
        p.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Update cards
      cards.forEach((card, idx) => {
        card.classList.toggle('active-card', idx === currentIndex);
      });

      // Update progress fill
      if (progressFill) {
        const percent = ((currentIndex + 1) / cards.length) * 100;
        progressFill.style.width = `${percent}%`;
      }

      // Update arrow states
      if (prevBtn) prevBtn.disabled = currentIndex === 0;
      if (nextBtn) nextBtn.disabled = currentIndex === cards.length - 1;
    }

    function scrollToIndex(index) {
      if (index < 0 || index >= cards.length) return;
      const targetCard = cards[index];
      targetCard.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
      updateActiveState(index);
    }

    // Pill click listener
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const idx = parseInt(pill.dataset.index, 10);
        scrollToIndex(idx);
      });
    });

    // Arrow button listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) scrollToIndex(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) scrollToIndex(currentIndex + 1);
      });
    }

    // Keyboard navigation on track
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        if (currentIndex < cards.length - 1) {
          e.preventDefault();
          scrollToIndex(currentIndex + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          e.preventDefault();
          scrollToIndex(currentIndex - 1);
        }
      }
    });

    // Detect scroll to update pills dynamically
    let scrollTimeout;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const trackRect = track.getBoundingClientRect();
        let closestIndex = 0;
        let minDiff = Infinity;

        cards.forEach((card, idx) => {
          const cardRect = card.getBoundingClientRect();
          const diff = Math.abs(cardRect.left - trackRect.left);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = idx;
          }
        });

        updateActiveState(closestIndex);
      }, 60);
    }, { passive: true });

    // Initial state
    updateActiveState(0);
  })();


  /* ─────────────────────────────────────────────────────────────
     5. MODAL MANAGEMENT (PDF & VIDEO)
  ───────────────────────────────────────────────────────────── */
  (function initModals() {
    // PDF Modal elements
    const pdfModal = document.getElementById('pdfModal');
    const openPdfBtn = document.getElementById('openPdfBtn');
    const closePdfBtn = document.getElementById('closePdfModal');
    const closePdfBottom = document.getElementById('closePdfModalBottom');
    const pdfBackdrop = document.getElementById('pdfModalBackdrop');

    // Video Modal elements
    const videoModal = document.getElementById('videoModal');
    const openVideoBtn = document.getElementById('openVideoBtn');
    const videoThumbTrigger = document.getElementById('videoThumbnailTrigger');
    const closeVideoBtn = document.getElementById('closeVideoModal');
    const closeVideoBottom = document.getElementById('closeVideoModalBottom');
    const videoBackdrop = document.getElementById('videoModalBackdrop');
    const videoPlayer = document.getElementById('birthdayVideoPlayer');

    function openModal(modal) {
      if (!modal) return;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      // Trigger transition next tick
      requestAnimationFrame(() => {
        modal.classList.add('active');
        if (modal === videoModal && videoPlayer) {
          videoPlayer.play().catch(() => {});
        }
      });
    }

    function closeModal(modal) {
      if (!modal) return;
      modal.classList.remove('active');
      setTimeout(() => {
        modal.hidden = true;
        document.body.style.overflow = '';
      }, 250);

      // If video modal is closing, pause video
      if (modal === videoModal && videoPlayer) {
        videoPlayer.pause();
      }
    }

    // PDF bindings
    if (openPdfBtn) openPdfBtn.addEventListener('click', () => openModal(pdfModal));
    if (closePdfBtn) closePdfBtn.addEventListener('click', () => closeModal(pdfModal));
    if (closePdfBottom) closePdfBottom.addEventListener('click', () => closeModal(pdfModal));
    if (pdfBackdrop) pdfBackdrop.addEventListener('click', () => closeModal(pdfModal));

    // Video bindings
    if (openVideoBtn) openVideoBtn.addEventListener('click', () => openModal(videoModal));
    if (videoThumbTrigger) videoThumbTrigger.addEventListener('click', () => openModal(videoModal));
    if (closeVideoBtn) closeVideoBtn.addEventListener('click', () => closeModal(videoModal));
    if (closeVideoBottom) closeVideoBottom.addEventListener('click', () => closeModal(videoModal));
    if (videoBackdrop) videoBackdrop.addEventListener('click', () => closeModal(videoModal));

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (pdfModal && !pdfModal.hidden) closeModal(pdfModal);
        if (videoModal && !videoModal.hidden) closeModal(videoModal);
      }
    });

    // Timeline Celebrate Button Jump
    const celebrateNowBtn = document.getElementById('celebrateNowBtn');
    if (celebrateNowBtn) {
      celebrateNowBtn.addEventListener('click', () => {
        const target = document.getElementById('celebrateSection');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          launchConfetti();
        }
      });
    }
  })();


  /* ─────────────────────────────────────────────────────────────
     6. BIRTHDAY MESSAGE REVEAL & COPY
  ───────────────────────────────────────────────────────────── */
  (function initLetter() {
    const unlockBtn = document.getElementById('unlockLetterBtn');
    const sealedCard = document.getElementById('sealedCard');
    const unsealedCard = document.getElementById('unsealedCard');
    const copyWishBtn = document.getElementById('copyWishBtn');

    if (unlockBtn && sealedCard && unsealedCard) {
      unlockBtn.addEventListener('click', () => {
        // Animate unsealing
        if (typeof gsap !== 'undefined') {
          gsap.to(sealedCard, {
            scale: 0.95,
            opacity: 0,
            duration: 0.35,
            ease: 'power2.in',
            onComplete: () => {
              sealedCard.style.display = 'none';
              unsealedCard.classList.remove('hidden');
              gsap.fromTo(unsealedCard, 
                { opacity: 0, y: 30, scale: 0.98 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.2)' }
              );
              // Trigger slight celebration
              launchConfetti({ count: 40 });
            }
          });
        } else {
          sealedCard.style.display = 'none';
          unsealedCard.classList.remove('hidden');
        }
      });
    }

    // Copy Wish to Clipboard
    if (copyWishBtn) {
      copyWishBtn.addEventListener('click', () => {
        const textContainer = document.getElementById('letterTextContainer');
        const textToCopy = textContainer ? textContainer.innerText : "Happy Birthday Ayush!";
        
        navigator.clipboard.writeText(textToCopy)
          .then(() => showToast("Brotherhood note copied to clipboard! 📋"))
          .catch(() => showToast("Note copied! ✦"));
      });
    }
  })();


  /* ─────────────────────────────────────────────────────────────
     7. TOAST COUNTER & LIGHTWEIGHT PHYSICS CONFETTI
  ───────────────────────────────────────────────────────────── */
  let toastTotal = parseInt(localStorage.getItem('ayush_birthday_toasts') || '0', 10);
  const toastCountEl = document.getElementById('toastCount');
  if (toastCountEl) toastCountEl.textContent = toastTotal;

  function incrementToast() {
    toastTotal++;
    if (toastCountEl) toastCountEl.textContent = toastTotal;
    localStorage.setItem('ayush_birthday_toasts', toastTotal.toString());
  }

  // Toast Buttons
  const celebrateToastBtn = document.getElementById('celebrateToastBtn');
  const navToastBtn = document.getElementById('navToastBtn');

  if (celebrateToastBtn) {
    celebrateToastBtn.addEventListener('click', () => {
      incrementToast();
      launchConfetti({ count: 90 });
      showToast("🥂 Toast raised to Ayush! The GOAT's day-one brother!");
    });
  }

  if (navToastBtn) {
    navToastBtn.addEventListener('click', () => {
      incrementToast();
      launchConfetti({ count: 50 });
      showToast("Toasting to the legend Ayush! ✦");
    });
  }

  // Toast Popup Message Utility
  function showToast(message) {
    const toast = document.getElementById('toastPopup');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Lightweight Physics Confetti Generator
  function launchConfetti(options = {}) {
    const count = options.count || 75;
    const colors = [
      '#75C9F1', // Argentina sky blue
      '#F8FAFC', // White
      '#FFD166', // Gold
      '#8B1538', // Barca burgundy
      '#172B63', // Barca navy
      '#F7A8C4', // Miami pink
    ];

    const container = document.body;
    const particles = [];

    const originX = window.innerWidth / 2;
    const originY = window.innerHeight * 0.45;

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      const size = Math.random() * 8 + 6;
      const isCircle = Math.random() > 0.5;

      el.style.position = 'fixed';
      el.style.left = `${originX}px`;
      el.style.top = `${originY}px`;
      el.style.width = `${size}px`;
      el.style.height = `${isCircle ? size : size * 0.6}px`;
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.borderRadius = isCircle ? '50%' : '2px';
      el.style.pointerEvents = 'none';
      el.style.zIndex = '9999';
      el.style.opacity = '1';

      container.appendChild(el);

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 6;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 4; // slight upward bias
      const rotSpeed = (Math.random() - 0.5) * 30;

      particles.push({
        el,
        x: originX,
        y: originY,
        vx,
        vy,
        rot: 0,
        rotSpeed,
        gravity: 0.35,
        drag: 0.96,
        opacity: 1,
      });
    }

    let frame = 0;
    function updateConfetti() {
      frame++;
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.rot += p.rotSpeed;

        if (frame > 25) {
          p.opacity -= 0.022;
        }

        if (p.opacity > 0) {
          alive = true;
          p.el.style.transform = `translate(${p.x - originX}px, ${p.y - originY}px) rotate(${p.rot}deg)`;
          p.el.style.opacity = p.opacity;
        } else if (p.el.parentNode) {
          p.el.parentNode.removeChild(p.el);
        }
      });

      if (alive) {
        requestAnimationFrame(updateConfetti);
      }
    }

    requestAnimationFrame(updateConfetti);
  }

  /* ─────────────────────────────────────────────────────────────
     8. NAV HIDE / SHOW ON SCROLL
  ───────────────────────────────────────────────────────────── */
  (function navBehavior() {
    let lastY = 0;
    const nav = document.getElementById('siteHeader');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > lastY && y > 120) {
        // Scrolling down -> hide nav
        if (typeof gsap !== 'undefined') {
          gsap.to(nav, { y: -90, duration: 0.35, ease: 'power2.in' });
        }
      } else {
        // Scrolling up -> show nav
        if (typeof gsap !== 'undefined') {
          gsap.to(nav, { y: 0, duration: 0.35, ease: 'power2.out' });
        }
      }
      lastY = y;
    }, { passive: true });
  })();

  // Expose launchConfetti globally
  window.launchConfetti = launchConfetti;
});
