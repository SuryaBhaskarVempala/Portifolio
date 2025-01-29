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

// Certificate slider functionality
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.certificates-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.certificate-card');
    
    let currentIndex = 0;
    let startX;
    let scrollLeft;
    let isDown = false;
    
    // Calculate cards to show based on viewport
    const getCardsToShow = () => {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 1024) return 3;
        return 4;
    };

    // Center single card
    const centerSingleCard = () => {
        if (cards.length === 1) {
            slider.style.justifyContent = 'center';
        } else {
            slider.style.justifyContent = 'flex-start';
        }
    };

    const updateSlider = () => {
        const cardsToShow = getCardsToShow();
        const maxIndex = Math.max(0, cards.length - cardsToShow);
        const cardWidth = cards[0].offsetWidth;
        const gapWidth = 32; // 2rem gap
        const offset = currentIndex * -(cardWidth + gapWidth);
        
        slider.style.transform = `translateX(${offset}px)`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === maxIndex;
        
        // Hide buttons if not enough cards
        const showButtons = cards.length > cardsToShow;
        prevBtn.style.display = showButtons ? 'flex' : 'none';
        nextBtn.style.display = showButtons ? 'flex' : 'none';
    };

    // Touch events
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('dragging');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('dragging');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('dragging');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        if (Math.abs(walk) > 50) {
            if (walk > 0 && currentIndex > 0) {
                currentIndex--;
                updateSlider();
                isDown = false;
            } else if (walk < 0 && currentIndex < cards.length - getCardsToShow()) {
                currentIndex++;
                updateSlider();
                isDown = false;
            }
        }
    });

    // Touch events for mobile
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        slider.classList.add('dragging');
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchend', () => {
        isDown = false;
        slider.classList.remove('dragging');
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        if (Math.abs(walk) > 50) {
            if (walk > 0 && currentIndex > 0) {
                currentIndex--;
                updateSlider();
                isDown = false;
            } else if (walk < 0 && currentIndex < cards.length - getCardsToShow()) {
                currentIndex++;
                updateSlider();
                isDown = false;
            }
        }
    });

    // Button clicks
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - getCardsToShow()) {
            currentIndex++;
            updateSlider();
        }
    });

    // Initial setup
    centerSingleCard();
    updateSlider();

    // Update on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            centerSingleCard();
            updateSlider();
        }, 250);
    });
}); 