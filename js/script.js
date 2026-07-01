const menuBtn = document.querySelector('.menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

menuBtn?.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

document.querySelectorAll('.mobile-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    formStatus.textContent = "Sūta ziņu...";
    formStatus.className = "form-status";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        formStatus.textContent = "Ziņa veiksmīgi nosūtīta!";
        formStatus.className = "form-status success";
        contactForm.reset();
      } else {
        formStatus.textContent = "Radās kļūda. Lūdzu, mēģiniet vēlreiz.";
        formStatus.className = "form-status error";
      }
    } catch (error) {
      formStatus.textContent = "Radās kļūda. Pārbaudiet interneta savienojumu.";
      formStatus.className = "form-status error";
    }
  });
}