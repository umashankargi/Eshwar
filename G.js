// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Initialize Testimonial Swiper
const testimonialSwiper = new Swiper('.testimonialSwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Back to Top Button
document.querySelector('.back-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message. We will contact you shortly.');
        this.reset();
    });
});
// WhatsApp button functionality
document.querySelectorAll('.whatsapp-float, .highlight-whatsapp a').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://wa.me/919912438836', '_blank');
    });
});

// WhatsApp community button functionality
document.querySelectorAll('.whatsapp-community-float, .highlight-community a, .whatsapp-community-alert').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://chat.whatsapp.com/CJ2YjvRefRcGIU5W7qtbTg', '_blank');
    });
});

// Map link functionality
document.querySelectorAll('.map-link, .highlight-link').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://maps.app.goo.gl/Zq5KPthJUn6sJwXc6', '_blank');
    });
});