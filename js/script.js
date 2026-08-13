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

    // ==========================================================================
    // PRODUCTS DATABASE
    // ==========================================================================
    const products = [
        // JALECOS (52 items)
        { id: "J0016", name: "Jaleco Eliza (0016)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0016.webp", category: "jaleco", badge: "-20%" },
        { id: "J0018", name: "Jaleco Eliza (0018)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0018.webp", category: "jaleco", badge: "Novidade" },
        { id: "J0022", name: "Jaleco Eliza (0022)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0022.webp", category: "jaleco", badge: "" },
        { id: "J0024", name: "Jaleco João (0024)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0024.webp", category: "jaleco", badge: "" },
        { id: "J0027", name: "Jaleco João (0027)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0027.webp", category: "jaleco", badge: "" },
        { id: "J0038", name: "Jaleco Rubens (0038)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0038.webp", category: "jaleco", badge: "" },
        { id: "J0041", name: "Jaleco Eliza (0041)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0041.webp", category: "jaleco", badge: "" },
        { id: "J0046", name: "Jaleco Rubens e André (0046)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0046.webp", category: "jaleco", badge: "" },
        { id: "J0052", name: "Jaleco Rubens e André (0052)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0052.webp", category: "jaleco", badge: "" },
        { id: "J0057", name: "Jaleco André (0057)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0057.webp", category: "jaleco", badge: "" },
        { id: "J0059", name: "Jaleco Rubens (0059)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0059.webp", category: "jaleco", badge: "" },
        { id: "J0061", name: "Jaleco Rubens (0061)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0061.webp", category: "jaleco", badge: "" },
        { id: "J0065", name: "Jaleco Rubens (0065)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0065.webp", category: "jaleco", badge: "" },
        { id: "J0067", name: "Jaleco André (0067)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0067.webp", category: "jaleco", badge: "" },
        { id: "J0069", name: "Jaleco André (0069)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0069.webp", category: "jaleco", badge: "" },
        { id: "J0072", name: "Jaleco André (0072)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0072.webp", category: "jaleco", badge: "" },
        { id: "J0079", name: "Jaleco Coats (0079)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0079.webp", category: "jaleco", badge: "" },
        { id: "J0086", name: "Jaleco Alice (0086)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0086.webp", category: "jaleco", badge: "" },
        { id: "J0089", name: "Jaleco Alice (0089)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0089.webp", category: "jaleco", badge: "" },
        { id: "J0093", name: "Jaleco Alice (0093)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0093.webp", category: "jaleco", badge: "" },
        { id: "J0107", name: "Jaleco Katherine (0107)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0107.webp", category: "jaleco", badge: "" },
        { id: "J0108", name: "Jaleco Alice (0108)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0108.webp", category: "jaleco", badge: "" },
        { id: "J0110", name: "Jaleco Katherine (0110)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0110.webp", category: "jaleco", badge: "" },
        { id: "J0116", name: "Jaleco Katherine (0116)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0116.webp", category: "jaleco", badge: "" },
        { id: "J0118", name: "Jaleco Lise (0118)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0118.webp", category: "jaleco", badge: "" },
        { id: "J0123", name: "Jaleco Lise (0123)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0123.webp", category: "jaleco", badge: "" },
        { id: "J0132", name: "Jaleco Lise (0132)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0132.webp", category: "jaleco", badge: "" },
        { id: "J0133", name: "Jaleco Lise (0133)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0133.webp", category: "jaleco", badge: "" },
        { id: "J0139", name: "Jaleco Bell (0139)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0139.webp", category: "jaleco", badge: "" },
        { id: "J0144", name: "Jaleco Bell (0144)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0144.webp", category: "jaleco", badge: "" },
        { id: "J0146", name: "Jaleco Bell (0146)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0146.webp", category: "jaleco", badge: "" },
        { id: "J0147", name: "Jaleco Bell (0147)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0147.webp", category: "jaleco", badge: "" },
        { id: "J0166", name: "Jaleco Lise (0166)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0166.webp", category: "jaleco", badge: "" },
        { id: "J0169", name: "Jaleco Lise (0169)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0169.webp", category: "jaleco", badge: "" },
        { id: "J0171", name: "Jaleco Lise (0171)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0171.webp", category: "jaleco", badge: "" },
        { id: "J0173", name: "Jaleco Lise (0173)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0173.webp", category: "jaleco", badge: "" },
        { id: "J0185", name: "Jaleco Katherine (0185)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0185.webp", category: "jaleco", badge: "" },
        { id: "J0190", name: "Jaleco Katherine (0190)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0190.webp", category: "jaleco", badge: "" },
        { id: "J0200", name: "Jaleco Katherine (0200)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0200.webp", category: "jaleco", badge: "" },
        { id: "J0211", name: "Jaleco André (0211)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0211.webp", category: "jaleco", badge: "" },
        { id: "J0213", name: "Jaleco Coats (0213)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0213.webp", category: "jaleco", badge: "" },
        { id: "J0221", name: "Jaleco Coats (0221)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0221.webp", category: "jaleco", badge: "" },
        { id: "J0229", name: "Jaleco Eliza (0229)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0229.webp", category: "jaleco", badge: "" },
        { id: "J0230", name: "Jaleco Eliza (0230)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0230.webp", category: "jaleco", badge: "" },
        { id: "J0233", name: "Jaleco Eliza (0233)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0233.webp", category: "jaleco", badge: "" },
        { id: "J0244", name: "Jaleco Lise c/s cinto (0244)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0244.webp", category: "jaleco", badge: "" },
        { id: "J0251", name: "Jaleco Lise c/s cinto (0251)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0251.webp", category: "jaleco", badge: "" },
        { id: "J0258", name: "Jaleco Lise com cinto (0258)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0258.webp", category: "jaleco", badge: "" },
        { id: "J0263", name: "Jaleco Lise com cinto (0263)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0263.webp", category: "jaleco", badge: "" },
        { id: "J0265", name: "Jaleco Lise com cinto (0265)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0265.webp", category: "jaleco", badge: "" },
        { id: "J0266", name: "Jaleco Lise com cinto (0266)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0266.webp", category: "jaleco", badge: "" },
        { id: "J0272", name: "Jaleco Lise com cinto (0272)", price: 520.00, originalPrice: 650.00, pixPrice: 494.00, img: "images/IMG_0272.webp", category: "jaleco", badge: "" },

        // SCRUBS (36 items)
        { id: "S0288", name: "Scrub John (0288)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0288.webp", category: "scrub", badge: "" },
        { id: "S0297", name: "Scrub John (0297)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0297.webp", category: "scrub", badge: "" },
        { id: "S0299", name: "Scrub John (0299)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0299.webp", category: "scrub", badge: "" },
        { id: "S0303", name: "Scrub John (0303)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0303.webp", category: "scrub", badge: "" },
        { id: "S0305", name: "Scrub John (0305)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0305.webp", category: "scrub", badge: "" },
        { id: "S0309", name: "Scrub John (0309)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0309.webp", category: "scrub", badge: "" },
        { id: "S0311", name: "Scrub John (0311)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0311.webp", category: "scrub", badge: "" },
        { id: "S0316", name: "Scrub John (0316)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0316.webp", category: "scrub", badge: "" },
        { id: "S0321", name: "Scrub Annie (0321)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0321.webp", category: "scrub", badge: "" },
        { id: "S0326", name: "Scrub Annie (0326)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0326.webp", category: "scrub", badge: "" },
        { id: "S0331", name: "Scrub Annie (0331)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0331.webp", category: "scrub", badge: "" },
        { id: "S0335", name: "Scrub Coats (0335)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0335.webp", category: "scrub", badge: "" },
        { id: "S0341", name: "Scrub Calça Annie (0341)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0341.webp", category: "scrub", badge: "" },
        { id: "S0343", name: "Scrub Calça Annie (0343)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0343.webp", category: "scrub", badge: "" },
        { id: "S0345", name: "Scrub Annie (0345)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0345.webp", category: "scrub", badge: "" },
        { id: "S0349", name: "Scrub Annie (0349)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0349.webp", category: "scrub", badge: "" },
        { id: "S0353", name: "Scrub Annie (0353)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0353.webp", category: "scrub", badge: "" },
        { id: "S0361", name: "Scrub Annie (0361)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0361.webp", category: "scrub", badge: "" },
        { id: "S0363", name: "Scrub Annie (0363)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0363.webp", category: "scrub", badge: "" },
        { id: "S0366", name: "Scrub James (0366)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0366.webp", category: "scrub", badge: "" },
        { id: "S0367", name: "Scrub James (0367)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0367.webp", category: "scrub", badge: "" },
        { id: "S0372", name: "Scrub James (0372)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0372.webp", category: "scrub", badge: "" },
        { id: "S0375", name: "Scrub James (0375)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0375.webp", category: "scrub", badge: "" },
        { id: "S0376", name: "Scrub James (0376)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0376.webp", category: "scrub", badge: "" },
        { id: "S0381", name: "Scrub James (0381)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0381.webp", category: "scrub", badge: "" },
        { id: "S0396", name: "Scrub Marie (0396)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0396.webp", category: "scrub", badge: "" },
        { id: "S0408", name: "Scrub Marie (0408)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0408.webp", category: "scrub", badge: "" },
        { id: "S0411", name: "Scrub Marie (0411)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0411.webp", category: "scrub", badge: "" },
        { id: "S0413", name: "Scrub Marie (0413)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0413.webp", category: "scrub", badge: "" },
        { id: "S0425", name: "Scrub Coats (0425)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0425.webp", category: "scrub", badge: "" },
        { id: "S0426", name: "Scrub Coats (0426)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0426.webp", category: "scrub", badge: "" },
        { id: "S0435", name: "Scrub Coats (0435)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0435.webp", category: "scrub", badge: "" },
        { id: "S0445", name: "Scrub Coats (0445)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0445.webp", category: "scrub", badge: "" },
        { id: "S0459", name: "Scrub Coats (0459)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0459.webp", category: "scrub", badge: "" },
        { id: "S0463", name: "Scrub Coats (0463)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0463.webp", category: "scrub", badge: "" },
        { id: "S0505", name: "Scrub Coats (0505)", price: 320.00, originalPrice: 390.00, pixPrice: 304.00, img: "images/IMG_0505.webp", category: "scrub", badge: "" }
    ];

    let currentTab = 'all';
    let visibleItemsCount = 12;
    let searchQuery = '';

    const catalogGrid = document.getElementById('catalog-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loadMoreContainer = document.getElementById('load-more-container');

    const renderProducts = () => {
        if (!catalogGrid) return;

        let filtered = products.filter(product => {
            const matchesTab = currentTab === 'all' || product.category === currentTab;
            const matchesSearch = searchQuery === '' || 
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                product.id.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        });

        if (filtered.length === 0) {
            catalogGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-muted);">
                    Nenhum modelo encontrado correspondente aos filtros.
                </div>
            `;
            if (loadMoreContainer) loadMoreContainer.style.display = 'none';
            return;
        }

        const visibleItems = filtered.slice(0, visibleItemsCount);

        catalogGrid.innerHTML = visibleItems.map(item => {
            const badgeHtml = item.badge ? `<span class="badge ${item.badge.startsWith('-') ? 'badge-sale' : 'badge-new'}">${item.badge}</span>` : '';
            return `
                <div class="product-card" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-img="${item.img}">
                    <div class="product-image-container">
                        <img src="${item.img}" alt="${item.name}" class="product-img" loading="lazy">
                        ${badgeHtml}
                        <button class="quick-add-btn" aria-label="Adicionar ao Carrinho">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                    <div class="product-details">
                        <h3 class="product-title">${item.name}</h3>
                        <div class="product-pricing">
                            <span class="original-price">R$ ${item.originalPrice.toFixed(2).replace('.', ',')}</span>
                            <span class="sale-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                        </div>
                        <p class="pix-price">R$ ${item.pixPrice.toFixed(2).replace('.', ',')} com Pix</p>
                    </div>
                </div>
            `;
        }).join('');

        if (loadMoreContainer) {
            if (filtered.length > visibleItemsCount) {
                loadMoreContainer.style.display = 'flex';
            } else {
                loadMoreContainer.style.display = 'none';
            }
        }
    };

    // Event Delegation for Adding to Cart
    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('.quick-add-btn');
        if (!btn) return;
        
        e.stopPropagation();
        e.preventDefault();
        
        const card = btn.closest('.product-card');
        if (!card) return;
        
        const id = card.dataset.id;
        const name = card.dataset.name;
        const price = parseFloat(card.dataset.price);
        const img = card.dataset.img;

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, img, quantity: 1 });
        }

        updateCartUI();
        showToast(`${name} adicionado à sacola!`);
    });

    // Handle Tab clicks
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTab = btn.dataset.tab;
            visibleItemsCount = 12; // reset pagination
            renderProducts();
        });
    });

    // Handle Load More click
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleItemsCount += 12;
            renderProducts();
        });
    }

    // Live search filter integration
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            visibleItemsCount = 12;
            renderProducts();
        });

        // Close search overlay and scroll to products on Enter key
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                closeAll();
                const productsSection = document.getElementById('produtos');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // Initialize products catalog rendering
    renderProducts();

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
