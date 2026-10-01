document.getElementById("year").textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll(".card, .project, .timeline-item, .architecture");

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  revealTargets.forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
  });
} else {
  revealTargets.forEach(el => el.classList.add("is-visible"));
}
