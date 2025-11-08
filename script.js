// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section > .container > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Interactive selectors for stacked content
function setupSelection(listSelector, detailSelector) {
    const list = document.querySelector(listSelector);
    const detailContainer = document.querySelector(detailSelector);
    if (!list || !detailContainer) return;

    const items = Array.from(list.querySelectorAll('[data-target]'));
    const detailCards = Array.from(detailContainer.querySelectorAll('[data-id]'));

    const activate = (targetId, { scroll = true } = {}) => {
        items.forEach(item => {
            const isActive = item.dataset.target === targetId;
            item.classList.toggle('active', isActive);
            if (isActive && scroll) {
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
            }
        });

        detailCards.forEach(card => {
            card.classList.toggle('active', card.dataset.id === targetId);
        });
    };

    items.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.addEventListener('click', () => activate(item.dataset.target));
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                activate(item.dataset.target);
            } else if ((event.key === 'ArrowDown' || event.key === 'ArrowRight') && index < items.length - 1) {
                event.preventDefault();
                const nextItem = items[index + 1];
                nextItem.focus();
                activate(nextItem.dataset.target, { scroll: false });
            } else if ((event.key === 'ArrowUp' || event.key === 'ArrowLeft') && index > 0) {
                event.preventDefault();
                const prevItem = items[index - 1];
                prevItem.focus();
                activate(prevItem.dataset.target, { scroll: false });
            }
        });
    });

    const presetActive = items.find(item => item.classList.contains('active'));
    if (presetActive) {
        activate(presetActive.dataset.target, { scroll: false });
    } else if (items.length) {
        activate(items[0].dataset.target, { scroll: false });
    }
}

// Initialize selectors when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupSelection('#educationList', '#educationDetail');
    setupSelection('#experienceList', '#experienceDetail');
    setupSelection('#skillsList', '#skillsDetail');
    setupSelection('#projectsList', '#projectsDetail');
});

