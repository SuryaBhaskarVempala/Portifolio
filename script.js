// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
let isMenuOpen = false;

const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('menu-open');
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

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach((el) => {
    observer.observe(el);
});

// Animate skill bars when they come into view
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-percentage');
            bars.forEach(bar => {
                const percent = bar.getAttribute('data-percent');
                // Reset width first
                bar.style.width = '0%';
                // Force reflow
                bar.offsetWidth;
                // Animate to the target percentage
                setTimeout(() => {
                    bar.style.width = `${percent}%`;
                }, 100);
            });
        } else {
            // Reset when out of view
            const bars = entry.target.querySelectorAll('.skill-percentage');
            bars.forEach(bar => {
                bar.style.width = '0%';
            });
        }
    });
}, {
    threshold: 0.2
});

// Observe all skill groups
document.querySelectorAll('.skills-group').forEach((el) => {
    skillsObserver.observe(el);
});

// Add click handler for skills navigation
document.querySelector('a[href="#skills"]').addEventListener('click', () => {
    const skillBars = document.querySelectorAll('.skill-percentage');
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        // Reset width first
        bar.style.width = '0%';
        // Force reflow
        bar.offsetWidth;
        // Animate to the target percentage
        setTimeout(() => {
            bar.style.width = `${percent}%`;
        }, 100);
    });
});

// Certificate auto-scroll functionality
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.certificates-slider');
    const cards = document.querySelectorAll('.certificate-card');
    
    // Clone cards for seamless loop
    const clonedCards = Array.from(cards).map(card => card.cloneNode(true));
    clonedCards.forEach(card => slider.appendChild(card));
    
    let scrollPosition = 0;
    let animationId;
    const scrollSpeed = 0.7; // Speed in pixels per frame
    
    function autoScroll() {
        scrollPosition += scrollSpeed;
        
        // Calculate the total width of original cards + gaps
        const totalWidth = Array.from(cards).reduce((total, card) => {
            return total + card.offsetWidth + 32; // 32px is the gap
        }, 0);
        
        // Reset position when we've scrolled past the original set
        if (scrollPosition >= totalWidth) {
            scrollPosition = 0;
        }
        
        slider.style.transform = `translateX(-${scrollPosition}px)`;
        animationId = requestAnimationFrame(autoScroll);
    }
    
    // Start animation immediately
    autoScroll();
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        cancelAnimationFrame(animationId);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoScroll();
    });
    
    // Touch pause for mobile
    let touchTimer;
    let isTouching = false;
    
    slider.addEventListener('touchstart', () => {
        isTouching = true;
        cancelAnimationFrame(animationId);
        clearTimeout(touchTimer);
    });
    
    slider.addEventListener('touchmove', () => {
        if (isTouching) {
            cancelAnimationFrame(animationId);
            clearTimeout(touchTimer);
        }
    });
    
    slider.addEventListener('touchend', () => {
        isTouching = false;
        touchTimer = setTimeout(() => {
            autoScroll();
        }, 2000);
    });
});




// Scroll ANimations :

const heroText = document.querySelector('.hero-text');
const projectCards = document.querySelectorAll('.project-card');

const handleBio = (entries,observer)=>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('heroTextAnimate');
            observer.unobserve(entry.target);
        }
    });
}
const bioObserver = new IntersectionObserver(handleBio, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

[heroText,...projectCards].forEach((el) => {
    bioObserver.observe(el);
});




// Spotlight follow effect for project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const glowBlob = card.querySelector('::before') || card;
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate position relative to card center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Update glow blob position
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // Apply transform to the pseudo-element
            card.style.setProperty('--glow-x', `${x}px`);
            card.style.setProperty('--glow-y', `${y}px`);
        });
        
        // Reset glow position when leaving card
        card.addEventListener('mouseleave', () => {
            card.style.removeProperty('--mouse-x');
            card.style.removeProperty('--mouse-y');
            card.style.removeProperty('--glow-x');
            card.style.removeProperty('--glow-y');
        });
    });
});



// for spotlight effect constant cards in mobile view 
document.querySelectorAll('.project-card').forEach(card => {
    function moveGlow(x, y) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x', `${x - rect.left}px`);
        card.style.setProperty('--y', `${y - rect.top}px`);
    }

    card.addEventListener('mousemove', e => moveGlow(e.clientX, e.clientY));
    card.addEventListener('touchmove', e => {
        const touch = e.touches[0];
        moveGlow(touch.clientX, touch.clientY);
    });

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--x', `50%`);
        card.style.setProperty('--y', `50%`);
    });
});



