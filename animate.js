const bios = document.querySelectorAll('.bio');

const handleAnimation = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            entry.target.classList.remove('animate');
        }
    });
}

const observer = new IntersectionObserver(handleAnimation, {
    threshold: 0.5
});

bios.forEach(bio => {
    observer.observe(bio);
});