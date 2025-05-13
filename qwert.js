function initAOS() {
    try {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    } catch (error) {
        console.error('AOS initialization failed:', error);
    }
}

// Setup navbar scroll effect
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    if (!navbar || !backToTop) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
    });
}

// Setup image preview functionality
function setupImagePreview() {
    const previewModal = document.getElementById('previewModal');
    const previewImage = document.getElementById('previewImage');
    const closePreview = document.getElementById('closePreview');
    if (!previewModal || !previewImage || !closePreview) return;

    window.openPreview = function(imgSrc) {
        try {
            previewImage.src = imgSrc;
            previewModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        } catch (error) {
            console.error('Error opening preview:', error);
        }
    };

    function closePreviewModal() {
        previewModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    closePreview.addEventListener('click', closePreviewModal);
    previewModal.addEventListener('click', function(e) {
        if (e.target === previewModal) {
            closePreviewModal();
        }
    });
}

// Render products based on weight filter
function renderProducts(minWeight = 0, maxWeight = 999) {
    const container = document.getElementById('necklace-gallery');
    if (!container) return;

    try {
        const filteredProducts = products.filter(p => p.weight >= minWeight && p.weight <= maxWeight);

        if (filteredProducts.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-search fa-3x mb-3 text-muted"></i>
                    <h4>No products found in this weight range</h4>
                    <p>Please try a different weight filter</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-aos="fade-up" onclick="openPreview('${product.img}')">
                <div class="product-img-container">
                    <img src="${product.img}" alt="Silver Annaprashan baby ${product.id}" loading="lazy" class="product-img">
                </div>
                <div class="product-info">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="product-weight">Weight: ${product.weight}g</span>
                    </div>
                </div>
            </div>
        `).join("\n");

        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    } catch (error) {
        console.error('Error rendering products:', error);
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-exclamation-triangle fa-3x mb-3 text-danger"></i>
                <h4>Error loading products</h4>
                <p>Please try again later</p>
            </div>
        `;
    }
}

// Setup weight filter buttons
function setupWeightFilter() {
    const weightBtns = document.querySelectorAll('.weight-filter-btn:not(.reset-filter)');
    const resetBtn = document.querySelector('.reset-filter');
    if (!weightBtns.length || !resetBtn) return;

    weightBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            weightBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const minWeight = parseFloat(this.dataset.min) || 0;
            const maxWeight = parseFloat(this.dataset.max) || 999;
            renderProducts(minWeight, maxWeight);
        });
    });

    resetBtn.addEventListener('click', function() {
        weightBtns.forEach(b => b.classList.remove('active'));
        renderProducts();
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAOS();
    setupNavbarScroll();
    setupImagePreview();
    setupWeightFilter();
    renderProducts();
});
