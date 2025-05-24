// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Initialize slider controls if they exist
    const nextBtn = document.querySelector('.next-slide');
    const prevBtn = document.querySelector('.prev-slide');
    const slider = document.querySelector('.hero-slider');

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Auto slide change every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }

    // Initialize first slide
    showSlide(0);
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initHeroSlider);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update URL without page jump
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        }
    });
});

// Add click event for WhatsApp CTA buttons
document.querySelectorAll('.highlight-whatsapp a, .whatsapp-float').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://wa.me/919912438836', '_blank');
    });
});

// Add click event for WhatsApp community buttons
document.querySelectorAll('.highlight-community a, .whatsapp-community-float, .whatsapp-community-alert').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://chat.whatsapp.com/DUi8XW13jBo66VkSoMezUJ', '_blank');
    });
});

// Add click event for map link
document.querySelectorAll('.map-link, .highlight-link').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://maps.app.goo.gl/Zq5KPthJUn6sJwXc6', '_blank');
    });
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            this.classList.toggle('collapsed');
        });
    }
});
