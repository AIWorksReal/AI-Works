const menuBtn = document.querySelector('.menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealElements.forEach((element) => revealObserver.observe(element));

function loadGoogleAnalytics() {
  const meta = document.querySelector('meta[name="google-analytics-id"]');
  if (!meta || window.__aiWorksAnalyticsLoaded) return;
  const id = meta.content;
  window.__aiWorksAnalyticsLoaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id);
}

const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');
const cookieReject = document.getElementById('cookieReject');
const cookieChoice = localStorage.getItem('aiworks_cookie_choice');

if (cookieChoice === 'accepted') {
  loadGoogleAnalytics();
} else if (!cookieChoice && cookieBanner) {
  setTimeout(() => cookieBanner.classList.add('show'), 500);
}

if (cookieAccept) {
  cookieAccept.addEventListener('click', () => {
    localStorage.setItem('aiworks_cookie_choice', 'accepted');
    loadGoogleAnalytics();
    cookieBanner?.classList.remove('show');
  });
}

if (cookieReject) {
  cookieReject.addEventListener('click', () => {
    localStorage.setItem('aiworks_cookie_choice', 'rejected');
    cookieBanner?.classList.remove('show');
  });
}

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sūta...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        contactForm.reset();
        formStatus.textContent = 'Ziņa veiksmīgi nosūtīta!';
        formStatus.classList.add('success');
      } else {
        formStatus.textContent = 'Radās kļūda. Lūdzu, mēģiniet vēlreiz.';
        formStatus.classList.add('error');
      }
    } catch (error) {
      formStatus.textContent = 'Radās kļūda. Pārbaudiet interneta savienojumu.';
      formStatus.classList.add('error');
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  });
}
