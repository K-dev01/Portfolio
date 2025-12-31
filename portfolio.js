// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
}
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
    // Fallback: just reveal immediately
    lists.forEach(list => list.classList.add('in-view'));
  }
});


// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update icon
    if (body.classList.contains('dark-mode')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Highlight active section in navigation on scroll
const sections = document.querySelectorAll('.section');

function highlightNavOnScroll() {
    let scrollPos = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', highlightNavOnScroll);

// Add intersection observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for fade-in animation
const cards = document.querySelectorAll('.project-card, .coding-card, .patent-card');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add typing effect to animated text
const animatedText = document.querySelector('.animated-text');
if (animatedText) {
    const text = animatedText.textContent;
    animatedText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            animatedText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        } else {
            // Restart after a delay
            setTimeout(() => {
                animatedText.textContent = '';
                i = 0;
                typeWriter();
            }, 3000);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// Add hover effect sound (optional - commented out by default)
/*
const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYHGGS57OScTgwMUKXi8LVkHQU5k9jzx3ElBSl+zPLaizsKElyx6OyrWBUIQ5zg8sFuJAUuhM/y2Ik2Bhxqu+bklE4LDFCm4/C1ZB0FOJHa88d0JwUqfM3y2os6CRJZruju');
hoverSound.volume = 0.1;

document.querySelectorAll('.project-card, .coding-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        // hoverSound.play();
    });
});
*/

// Add dynamic year to footer
const footer = document.querySelector('.footer p');
if (footer) {
    const currentYear = new Date().getFullYear();
    footer.textContent = `© ${currentYear} S. Keerthisree. All rights reserved.`;
}

// Parallax effect for home section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.home-content');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add particle effect to home section (optional - lightweight version)
function createParticle() {
    const homeSection = document.querySelector('.home-section');
    if (!homeSection) return;
    
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'var(--accent-primary)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.opacity = '0.5';
    particle.style.pointerEvents = 'none';
    particle.style.animation = 'float 6s ease-in-out infinite';
    
    homeSection.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 6000);
}

// Create particles periodically
setInterval(createParticle, 2000);

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        background: var(--sidebar-hover);
        color: var(--accent-primary);
    }
`;
document.head.appendChild(style);

console.log('Portfolio website initialized! 🚀');
console.log('Theme: ' + (body.classList.contains('dark-mode') ? 'Dark' : 'Light'));
// SERVICE TEXT ROTATION
/*const services = [
    "Web Design",
    "Frontend Engineer",
    "Full Stack Developer",
    "Software Development"
];

const serviceText = document.getElementById("service-text");
let i = 0;

function rotateText() {
    serviceText.textContent = services[i];
    i = (i + 1) % services.length;
}

rotateText();
setInterval(rotateText, 2000);
*/