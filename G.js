// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
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
            
            // Close mobile menu if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (!navbarToggler.classList.contains('collapsed')) {
                navbarToggler.click();
            }
        }
    });
});

// WhatsApp button functionality
document.querySelectorAll('.whatsapp-float').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://wa.me/919912438836', '_blank');
    });
});

// WhatsApp community button functionality
document.querySelectorAll('.whatsapp-community-alert').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://chat.whatsapp.com/CJ2YjvRefRcGIU5W7qtbTg', '_blank');
    });
});

// Map link functionality
document.querySelectorAll('.map-link').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://maps.app.goo.gl/Zq5KPthJUn6sJwXc6', '_blank');
    });
});
