/**
 * Vikas Jain — Digital Marketing Specialist Portfolio
 * Interactive Functionality & Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initAuditTabs();
  setCurrentYear();
});

/* --------------------------------------------------------------------------
   1. Navbar Scroll Effect & Active Link Tracking
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Add shadow class on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link highlighting
    let currentSection = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. Mobile Hamburger Menu Toggle & Backdrop Overlay
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  const links = navLinks ? navLinks.querySelectorAll('a') : [];

  if (!toggleBtn || !navLinks) return;

  function openMenu() {
    navLinks.classList.add('mobile-active');
    if (navOverlay) navOverlay.classList.add('active');
    toggleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('mobile-active');
    if (navOverlay) navOverlay.classList.remove('active');
    toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('mobile-active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking overlay
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Close when clicking any menu item
  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('mobile-active')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   3. Interactive 5-Pillar Growth Engine Framework Tabs
   -------------------------------------------------------------------------- */
function initAuditTabs() {
  const auditButtons = document.querySelectorAll('.audit-btn');
  const auditPanels = document.querySelectorAll('.audit-panel');

  if (!auditButtons.length || !auditPanels.length) return;

  auditButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      auditButtons.forEach(b => b.classList.remove('active'));
      auditPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-audit');
      const targetPanel = document.getElementById(targetId);

      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. Toast Notification Helper
   -------------------------------------------------------------------------- */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 3500);
}

/* --------------------------------------------------------------------------
   5. Footer Current Year
   -------------------------------------------------------------------------- */
function setCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
