// ===================================================================
// THEME TOGGLE
// ===================================================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const body = document.body;

const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  body.classList.add('dark-mode');
  themeIcon.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
});

// ===================================================================
// SMOOTH SCROLL + ACTIVE NAV LINK
// ===================================================================
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

const sections = document.querySelectorAll('.section');
function highlightNavOnScroll() {
  let scrollPos = window.scrollY + 200;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}
window.addEventListener('scroll', highlightNavOnScroll);

// ===================================================================
// ABOUT LIST REVEAL
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
  const lists = document.querySelectorAll('.about-list');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    lists.forEach(list => observer.observe(list));
  } else {
    lists.forEach(list => list.classList.add('in-view'));
  }
});

// ===================================================================
// PIN-CARD REVEAL ON SCROLL (projects / hackathons / patents)
// ===================================================================
const pinCards = document.querySelectorAll('.pin-card');
if ('IntersectionObserver' in window) {
  const cardObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        const isOdd = Array.from(pinCards).indexOf(entry.target) % 2 === 0;
        entry.target.style.transform = `translateY(0) rotate(${isOdd ? '-1.2deg' : '1deg'})`;
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  pinCards.forEach(card => cardObserver.observe(card));
} else {
  pinCards.forEach(card => { card.style.opacity = '1'; });
}

// ===================================================================
// ANIMATED STAT COUNTERS
// ===================================================================
const statNumbers = document.querySelectorAll('.stat-number');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || '';

  if (prefersReducedMotion) {
    el.textContent = target + suffix;
    return;
  }

  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = value + suffix;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target + suffix;
    }
  }
  requestAnimationFrame(tick);
}

if ('IntersectionObserver' in window) {
  const statObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statNumbers.forEach(el => statObserver.observe(el));
} else {
  statNumbers.forEach(el => {
    el.textContent = el.getAttribute('data-target') + (el.getAttribute('data-suffix') || '');
  });
}

// ===================================================================
// EXPERIENCE — HORIZONTAL SCROLL PROGRESS BAR
// ===================================================================
const track = document.getElementById('timelineTrack');
const fill = document.getElementById('timelineFill');

if (track && fill) {
  track.addEventListener('scroll', () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const progress = maxScroll > 0 ? (track.scrollLeft / maxScroll) * 100 : 0;
    fill.style.width = progress + '%';
  });
}

// ===================================================================
// FEEDBACK FORM
// ===================================================================
const feedbackForm = document.getElementById("feedbackForm");
const formStatus = document.getElementById("formStatus");

if (feedbackForm && formStatus) {
  feedbackForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(feedbackForm);
    const name = formData.get("name")?.toString().trim() || "there";

    try {
      const response = await fetch("https://formspree.io/f/mbdvbqoj", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        formStatus.textContent = `✅ Thanks, ${name}! Your feedback has been sent successfully.`;
        feedbackForm.reset();
      } else {
        formStatus.textContent =
          "❌ Oops! Something went wrong. Please try again.";
      }
    } catch (error) {
      formStatus.textContent =
        "❌ Network error. Please check your connection and try again.";
    }
  });
}

// ===================================================================
// FOOTER YEAR
// ===================================================================
const footer = document.querySelector('.footer p');
if (footer) {
  const year = new Date().getFullYear();
  footer.textContent = `© ${year} Made by S. Keerthisree. All rights reserved.`;
}

console.log('Portfolio initialized 📌');