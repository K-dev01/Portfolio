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
