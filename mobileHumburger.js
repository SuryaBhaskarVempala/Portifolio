const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-links a');

let isMenuOpen = false;

gsap.from(navLinks,{
    y: 100,
    opacity: 0,
    duration: 0.5,
    stagger: 0.2,
    // ease: "power2.inOut"
})

// GSAP timeline (paused, reversed by default)
const tl = gsap.timeline({ paused: true, reversed: true });

tl.fromTo(
  navLinks,
  {
    x: 250,  
  },
  {
    x: 0,
    autoAlpha: 1,
    stagger: 0.1,
    duration: 0.3,
    ease: "power2.inOut"
  }
);

// Remove classes after reverse finishes
tl.eventCallback("onReverseComplete", () => {
    mobileMenuBtn.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
});

// Toggle function
const toggleMenu = () => {
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    mobileMenuBtn.classList.add('active');
    navMenu.classList.add('active');
    hamburger.classList.add('active');

    tl.play();
  } else {
    tl.reverse();
  }
};


mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        toggleMenu();
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) {
            toggleMenu();
        }
    });
});

// Navbar scroll effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    if (currentScrollY > 50) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    }

    lastScrollY = currentScrollY;
});