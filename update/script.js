/* ===========================
   BLUEDOVE ENERGY & AGRO LTD
   Main JavaScript
   =========================== */

/* --- Navbar scroll effect --- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* --- Mobile hamburger menu --- */
const hamburger = document.getElementById('hamburger');
const navDrawer  = document.getElementById('navDrawer');

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  hamburger.classList.toggle('active');
  navDrawer.classList.toggle('open');
});

// Close nav drawer when a link is clicked
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navDrawer.classList.remove('open');
  });
});

// Close nav drawer when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navDrawer.contains(e.target)) {
    hamburger.classList.remove('active');
    navDrawer.classList.remove('open');
  }
});

/* --- Three-dot dropdown menu --- */
const dotsBtn      = document.getElementById('dotsBtn');
const dotsDropdown = document.getElementById('dotsDropdown');

dotsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  dotsDropdown.classList.toggle('open');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!dotsBtn.contains(e.target) && !dotsDropdown.contains(e.target)) {
    dotsDropdown.classList.remove('open');
  }
});

/* --- Smooth scrolling for anchor links --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* --- Scroll reveal animation --- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling cards
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      siblings.forEach((el, idx) => {
        if (el === entry.target) {
          setTimeout(() => el.classList.add('visible'), idx * 80);
        }
      });
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* --- Contact form validation --- */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function showError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.add('error');
  error.textContent = message;
}

function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.remove('error');
  error.textContent = '';
}

// Live clear on input
['name', 'phone', 'email', 'message'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', () => clearError(id, id + 'Error'));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const name    = document.getElementById('name').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Name validation
  if (!name) {
    showError('name', 'nameError', 'Please enter your full name.');
    valid = false;
  } else { clearError('name', 'nameError'); }

  // Phone validation
  if (!phone) {
    showError('phone', 'phoneError', 'Please enter your phone number.');
    valid = false;
  } else if (!/^[\+\d\s\-\(\)]{7,20}$/.test(phone)) {
    showError('phone', 'phoneError', 'Please enter a valid phone number.');
    valid = false;
  } else { clearError('phone', 'phoneError'); }

  // Email validation (optional but must be valid if provided)
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('email', 'emailError', 'Please enter a valid email address.');
    valid = false;
  } else { clearError('email', 'emailError'); }

  // Message validation
  if (!message) {
    showError('message', 'messageError', 'Please enter your message.');
    valid = false;
  } else if (message.length < 10) {
    showError('message', 'messageError', 'Message must be at least 10 characters.');
    valid = false;
  } else { clearError('message', 'messageError'); }

  if (valid) {
    // Show success message
    formSuccess.classList.add('show');
    form.reset();
    // Hide success after 5 seconds
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }
});

/* --- Footer copyright year --- */
document.getElementById('year').textContent = new Date().getFullYear();
