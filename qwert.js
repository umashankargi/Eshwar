function initAOS() {
            try {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out',
                    once: true
                });
            } catch (error) {
                console.error('AOS initialization failed:', error);
            }
        }

        function setupNavbarScroll() {
            const navbar = document.querySelector('.navbar');
            const backToTop = document.querySelector('.back-to-top');
            if (!navbar || !backToTop) return;

            window.addEventListener('scroll', function () {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                    backToTop.classList.add('active');
                } else {
                    navbar.classList.remove('scrolled');
                    backToTop.classList.remove('active');
                }
            });
        }

        function setupCategoryNavigation() {
            const categoryLinks = document.querySelectorAll('.category-link');
            categoryLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    categoryLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');

                    const target = this.getAttribute('href');
                    if (target) {
                        const targetEl = document.querySelector(target);
                        if (targetEl) {
                            targetEl.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                });
            });
        }

        function setupImagePreview() {
            const previewModal = document.getElementById('previewModal');
            const previewImage = document.getElementById('previewImage');
            const closePreview = document.getElementById('closePreview');
            if (!previewModal || !previewImage || !closePreview) return;

            window.openPreview = function (imgSrc) {
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
            previewModal.addEventListener('click', function (e) {
                if (e.target === previewModal) {
                    closePreviewModal();
                }
            });
        }

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
                    <div class="col-md-6 col-lg-4 col-xl-3" data-aos="fade-up" data-aos-delay="200">
                        <div class="product-card" onclick="openPreview('${product.img}')">
                            <div class="position-relative">
                                <img src="${product.img}" alt="Silver Annaprashan baby ${product.id}" loading="lazy" class="img-fluid product-img w-100">
                            </div>
                            <div class="p-4">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="text-gold fw-bold">Weight: ${product.weight}g</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join("\n");

                const productCards = container.querySelectorAll('.product-card');
                productCards.forEach(card => {
                    const img = card.querySelector('.product-img');
                    if (img) {
                        card.addEventListener('mouseenter', () => {
                            img.style.transform = 'scale(1.05)';
                        });
                        card.addEventListener('mouseleave', () => {
                            img.style.transform = 'scale(1)';
                        });
                    }
                });

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

        function setupWeightFilter() {
            const weightBtns = document.querySelectorAll('.weight-filter-btn:not(.reset-filter)');
            const resetBtn = document.querySelector('.reset-filter');
            if (!weightBtns.length || !resetBtn) return;

            weightBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    weightBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');

                    const minWeight = parseFloat(this.dataset.min) || 0;
                    const maxWeight = parseFloat(this.dataset.max) || 999;
                    renderProducts(minWeight, maxWeight);
                });
            });

            resetBtn.addEventListener('click', function () {
                weightBtns.forEach(b => b.classList.remove('active'));
                renderProducts();
            });
        }

        document.addEventListener('DOMContentLoaded', function () {
            initAOS();
            setupNavbarScroll();
            setupCategoryNavigation();
            setupImagePreview();
            setupWeightFilter();
            renderProducts();
        });
