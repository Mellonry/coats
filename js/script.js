document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // PROMO BANNER ROTATOR
    // ==========================================================================
    const promoTexts = document.querySelectorAll('.promo-text');
    let currentPromoIndex = 0;

    if (promoTexts.length > 1) {
        setInterval(() => {
            promoTexts[currentPromoIndex].style.display = 'none';
            currentPromoIndex = (currentPromoIndex + 1) % promoTexts.length;
            promoTexts[currentPromoIndex].style.display = 'block';
        }, 5000);
    }

    // ==========================================================================
    // STICKY HEADER SCROLL EFFECT
    // ==========================================================================
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            header.style.height = '75px';
            header.style.backgroundColor = 'rgba(252, 250, 247, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(28,26,25,0.05)';
        } else {
            header.classList.remove('scrolled');
            header.style.height = 'var(--header-height)';
            header.style.backgroundColor = 'rgba(252, 250, 247, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // ==========================================================================
    // DRAWER & OVERLAY TOGGLES
    // ==========================================================================
    
    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'drawer-backdrop';
    document.body.appendChild(backdrop);

    // Helper functions
    const openElement = (elem) => {
        elem.classList.add('active');
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeAll = () => {
        document.querySelectorAll('.mobile-nav-drawer, .cart-drawer, .search-overlay, .drawer-backdrop').forEach(elem => {
            elem.classList.remove('active');
        });
        document.body.style.overflow = '';
    };

    backdrop.addEventListener('click', closeAll);

    // Mobile Navigation Drawer
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileDrawer = document.querySelector('.mobile-nav-drawer');
    const closeDrawerBtn = document.querySelector('.close-drawer-btn');

    if (mobileMenuBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener('click', () => openElement(mobileDrawer));
    }
    if (closeDrawerBtn) {
        closeDrawerBtn.addEventListener('click', closeAll);
    }
    
    // Close mobile drawer when clicking a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', closeAll);
    });

    // Search Overlay
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    const closeSearchBtn = document.querySelector('.close-search-btn');

    if (searchToggle && searchOverlay) {
        searchToggle.addEventListener('click', () => {
            openElement(searchOverlay);
            setTimeout(() => document.querySelector('.search-input').focus(), 300);
        });
    }
    if (closeSearchBtn) {
        closeSearchBtn.addEventListener('click', closeAll);
    }

    // Shopping Cart Drawer
    const cartToggle = document.querySelector('.cart-toggle');
    const cartDrawer = document.querySelector('.cart-drawer');
    const closeCartBtn = document.querySelector('.close-cart-btn');
    const closeCartBtnLink = document.querySelector('.close-cart-btn-link');

    if (cartToggle && cartDrawer) {
        cartToggle.addEventListener('click', () => openElement(cartDrawer));
    }
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeAll);
    }
    if (closeCartBtnLink) {
        closeCartBtnLink.addEventListener('click', closeAll);
    }

    // ==========================================================================
    // SHOPPING CART LOGIC
    // ==========================================================================
    let cart = JSON.parse(localStorage.getItem('jaleco_chic_cart')) || [];

    const cartCountBadge = document.querySelector('.cart-count');
    const cartContent = document.querySelector('.cart-content');
    const emptyCartMsg = document.querySelector('.empty-cart-message');
    const cartItemsList = document.querySelector('.cart-items-list');
    const cartFooter = document.querySelector('.cart-footer');
    const subtotalVal = document.querySelector('.subtotal-val');
    const toast = document.getElementById('toast');

    // Toast Notification helper
    const showToast = (message) => {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };

    // Update Cart UI
    const updateCartUI = () => {
        // Calculate items count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountBadge.textContent = totalItems;

        if (cart.length === 0) {
            emptyCartMsg.style.display = 'flex';
            cartItemsList.style.display = 'none';
            cartFooter.style.display = 'none';
        } else {
            emptyCartMsg.style.display = 'none';
            cartItemsList.style.display = 'flex';
            cartFooter.style.display = 'block';

            // Render list
            cartItemsList.innerHTML = '';
            let subtotal = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;

                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                        <div>Qtd: ${item.quantity}</div>
                        <button class="cart-item-remove" data-id="${item.id}">Remover</button>
                    </div>
                `;
                cartItemsList.appendChild(itemElement);
            });

            subtotalVal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        }

        // Save to LocalStorage
        localStorage.setItem('jaleco_chic_cart', JSON.stringify(cart));
    };

    // Add to Cart Action
    document.querySelectorAll('.quick-add-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.product-card');
            const id = card.dataset.id;
            const name = card.dataset.name;
            const price = parseFloat(card.dataset.price);
            const img = card.dataset.img;

            // Check if already in cart
            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, img, quantity: 1 });
            }

            updateCartUI();
            showToast(`${name} adicionado à sacola!`);
        });
    });

    // Remove from Cart Action
    cartItemsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-item-remove')) {
            const id = e.target.dataset.id;
            cart = cart.filter(item => item.id !== id);
            updateCartUI();
            showToast('Item removido da sacola.');
        }
    });

    // Initialize Cart
    updateCartUI();

    // Checkout Simulation
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            showToast('Obrigado! Redirecionando para pagamento seguro...');
            setTimeout(() => {
                cart = [];
                updateCartUI();
                closeAll();
            }, 2000);
        });
    }

    // ==========================================================================
    // TESTIMONIALS SLIDER
    // ==========================================================================
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentTestimonialIndex = 0;

    const showTestimonial = (index) => {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialSlides[index].classList.add('active');
    };

    if (nextBtn && prevBtn && testimonialSlides.length > 0) {
        nextBtn.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialSlides.length;
            showTestimonial(currentTestimonialIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
            showTestimonial(currentTestimonialIndex);
        });
    }

    // ==========================================================================
    // NEWSLETTER FORM SUBMIT
    // ==========================================================================
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterSuccess = document.getElementById('newsletterSuccess');

    if (newsletterForm && newsletterSuccess) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            newsletterForm.style.display = 'none';
            newsletterSuccess.style.display = 'block';
            showToast('E-mail cadastrado com sucesso!');
        });
    }
});
