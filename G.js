// Loading Screen
window.addEventListener('load', function() {
    const pageLoader = document.querySelector('.page-loader');
    setTimeout(function() {
        pageLoader.classList.add('fade-out');
        setTimeout(function() {
            pageLoader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out-quart',
    once: true,
    mirror: false,
    anchorPlacement: 'top-bottom'
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
                top: target.offsetTop - 100,
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

// Form submission handling
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('Thank you for your message. We will contact you shortly.');
        this.reset();
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
        window.open('https://chat.whatsapp.com/DUi8XW13jBo66VkSoMezUJ', '_blank');
    });
});

// Map link functionality
document.querySelectorAll('.map-link').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://maps.app.goo.gl/Zq5KPthJUn6sJwXc6', '_blank');
    });
});

// Wishlist functionality
document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('active');
        const icon = this.querySelector('i');
        
        if (this.classList.contains('active')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            showToast('Added to wishlist');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            showToast('Removed from wishlist');
        }
    });
});


// Current time for gold ticker
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    document.getElementById('current-time').textContent = timeString;
}

// Update time every minute
updateCurrentTime();
setInterval(updateCurrentTime, 60000);

// Toast Notification
function showToast(message) {
    const toastEl = document.getElementById('liveToast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toastEl && toastMessage) {
        toastMessage.textContent = message;
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
}


// Parallax effect for hero image
if (document.querySelector('.gold-hero')) {
    const hero = document.querySelector('.gold-hero');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
}
