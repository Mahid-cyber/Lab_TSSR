document.getElementById("year").textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll(".card, .project, .timeline-item, .architecture");
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
