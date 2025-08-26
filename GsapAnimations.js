const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-links a');

let isMenuOpen = false;

gsap.from(navLinks, {
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




// GSAP ScrollTrigger animations

// About Section Animations
gsap.to("#about", {
    y: 100,
    opacity: 0,
    duration: 0.5,
    scrollTrigger: {
        trigger: "#about",
        start: "top 0%",
        end: "bottom top",
        scrub: true,              // smooth animation
        pin: true,                // keeps page1 fixed
        pinSpacing: false
    }
});


gsap.from("#about .hero-text", {
    x: -100,
    opacity: 0,
    duration: 2,
    delay: 0.5,
});

//Skills Section Animations

gsap.from("#skills h2", {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: "#skills",
        start: "top 40%",
        toggleActions: "play none none reverse"
    }
});

gsap.from(".skills-group.left", {
    x: -100,
    opacity: 0,
    duration: 0.3,
    scrollTrigger: {
        trigger: ".skills-group.left",
        start: "top 80%",
        end: "bottom 130%",
        // markers: true,
        scrub: 2,

    }
});

gsap.from(".skills-group.middle", {
    y: 100,
    opacity: 0,
    duration: 0.3,
    scrollTrigger: {
        trigger: ".skills-group.middle",
        start: "top 80%",
        end: "bottom 130%",
        // markers: true,
        scrub: 2,
    }
});

gsap.from(".skills-group.right", {
    x: 100,
    opacity: 0,
    duration: 0.3,
    scrollTrigger: {
        trigger: ".skills-group.right",
        start: "top 80%",
       end: "bottom 130%",
        // markers: true,
        scrub: 2,
    }
});


// Projects Section Animations
gsap.from("#projects .project-card", {
    y: 50,
    opacity: 0,
    duration: 1,
    // delay:0.5,
    stagger: 0.9,
    scrollTrigger: {
        trigger: "#projects",
        start: "top 30%",
        end: "bottom 100%",
        // markers:true,
        scrub: 2,
    }
});

gsap.from("#projects h2", {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: "#projects",
        start: "top 40%",
        toggleActions: "play none none reverse"
    }
});