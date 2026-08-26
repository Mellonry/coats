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
    // PRODUCTS DATABASE (Cleaned & Grouped Models with Portfolio Galleries)
    // ==========================================================================
    const products = [
        {
            id: "J_ELIZA",
            name: "Jaleco Eliza",
            price: 520.00,
            originalPrice: 650.00,
            pixPrice: 494.00,
            category: "jaleco",
            badge: "-20%",
            description: "O Jaleco Eliza é a expressão máxima da alfaiataria médica feminina. Com gola estruturada, botões refinados e tecido de alta densidade com elastano que garante flexibilidade e caimento impecável.",
            images: [
                "images/IMG_0016.webp",
                "images/IMG_0018.webp",
                "images/IMG_0022.webp",
                "images/IMG_0041.webp",
                "images/IMG_0229.webp",
                "images/IMG_0230.webp",
                "images/IMG_0233.webp"
            ]
        },
        {
            id: "J_JOAO",
            name: "Jaleco João",
            price: 520.00,
            originalPrice: 650.00,
            pixPrice: 494.00,
            category: "jaleco",
            badge: "Masculino",
            description: "Corte macio e contemporâneo para profissionais exigentes. O Jaleco João alia presença marcante com tecido bi-stretch respirável e bolsos utilitários internos.",
            images: [
                "images/IMG_0024.webp",
                "images/IMG_0027.webp"
            ]
        },
        {
            id: "J_RUBENS",
            name: "Jaleco Rubens",
            price: 520.00,
            originalPrice: 650.00,
            pixPrice: 494.00,
            category: "jaleco",
            badge: "Lançamento",
            description: "Design minimalista e sofisticado. O modelo Rubens destaca-se pelo colarinho de alfaiate, botoeiros embutidos e acabamento acetinado de extrema elegância.",
            images: [
                "images/IMG_0038.webp",
                "images/IMG_0059.webp",
                "images/IMG_0061.webp",
                "images/IMG_0065.webp"
            ]
        },
        {
            id: "J_ANDRE",
            name: "Jaleco André",
            price: 520.00,
            originalPrice: 650.00,
            pixPrice: 494.00,
            category: "jaleco",
            badge: "",
            description: "Sofisticação e atemporalidade para o dia a dia. O Jaleco André possui lapelas impecáveis e caimento ajustado ao corpo sem limitar seus movimentos.",
            images: [
                "images/IMG_0057.webp",
                "images/IMG_0067.webp",
                "images/IMG_0069.webp",
                "images/IMG_0072.webp",
                "images/IMG_0211.webp"
            ]
        },
        {
            id: "J_RUBENS_ANDRE",
            name: "Jaleco Rubens & André",
            price: 520.00,
            originalPrice: 650.00,
            pixPrice: 494.00,
            category: "jaleco",
            badge: "Duo Luxe",
            description: "Coleção especial integrando as melhores linhas de alfaiataria masculina com botões duplos e forro acetinado de alta respirabilidade.",
            images: [
                "images/IMG_0046.webp",
                "images/IMG_0052.webp"
            ]
        },
        {
            id: "J_ALICE",
            name: "Jaleco Alice",
            price: 520.00,
            originalPrice: 650.00,
            pixPrice: 494.00,
            category: "jaleco",
            badge: "Mais Vendido",
            description: "Um clássico da alta costura médica. Detalhes em pregas sutis, cintura desenhada e punhos italianos com botões refinados.",
            images: [
                "images/IMG_0086.webp",
                "images/IMG_0089.webp",
                "images/IMG_0093.webp",
                "images/IMG_0108.webp"
            ]
        },
        {
            id: "J_KATHERINE",
            name: "Jaleco Katherine",
            price: 520.00,
            originalPrice: 650.00,
            pixPrice: 494.00,
            category: "jaleco",
            badge: "-20%",
            description: "O modelo Katherine é referência em delicadeza e luxo. Possui gola V aplicada com caimento impecável, ideal para médicas e especialistas em estética.",
            images: [
                "images/IMG_0107.webp",
                "images/IMG_0110.webp",
                "images/IMG_0116.webp",
                "images/IMG_0185.webp",
                "images/IMG_0190.webp",
                "images/IMG_0200.webp"
            ]
        },
        {
            id: "J_LISE",
            name: "Jaleco Lise",
            price: 520.00,
            originalPrice: 650.00,
            pixPrice: 494.00,
            category: "jaleco",
            badge: "Cinto Ajustável",
            description: "Modelagem multifuncional com cinto removível de alta costura, permitindo uso acinturado ou fluido. Tecido com elastano de secagem rápida.",
            images: [
                "images/IMG_0118.webp",
                "images/IMG_0123.webp",
                "images/IMG_0132.webp",
                "images/IMG_0133.webp",
                "images/IMG_0166.webp",
                "images/IMG_0169.webp",
                "images/IMG_0171.webp",
                "images/IMG_0173.webp",
                "images/IMG_0244.webp",
                "images/IMG_0251.webp",
                "images/IMG_0258.webp",
                "images/IMG_0263.webp",
                "images/IMG_0265.webp",
                "images/IMG_0266.webp",
                "images/IMG_0272.webp"
            ]
        },
        {
            id: "J_BELL",
            name: "Jaleco Bell",
            price: 520.00,
            originalPrice: 650.00,
            pixPrice: 494.00,
            category: "jaleco",
            badge: "",
            description: "Linhas limpas e caimento estruturado. O Jaleco Bell transmite autoridade e leveza com gola notched e bolsos invisíveis laterais.",
            images: [
                "images/IMG_0139.webp",
                "images/IMG_0144.webp",
                "images/IMG_0146.webp",
                "images/IMG_0147.webp"
            ]
        },
        {
            id: "J_COATS",
            name: "Jaleco COATS Edição Ouro",
            price: 560.00,
            originalPrice: 700.00,
            pixPrice: 532.00,
            category: "jaleco",
            badge: "Edição Ouro",
            description: "A peça emblemática que carrega a assinatura COATS. Botões folheados a ouro, tecido gabardine nobre e acabamento feito à mão.",
            images: [
                "images/IMG_0079.webp",
                "images/IMG_0213.webp",
                "images/IMG_0221.webp"
            ]
        },
        {
            id: "S_JOHN",
            name: "Scrub John",
            price: 320.00,
            originalPrice: 390.00,
            pixPrice: 304.00,
            category: "scrub",
            badge: "Tecnológico",
            description: "Conjunto Scrub masculino com modelagem esportiva de luxo. Tecido ultra-respirável com ação antibacteriana e secagem rápida.",
            images: [
                "images/IMG_0288.webp",
                "images/IMG_0297.webp",
                "images/IMG_0299.webp",
                "images/IMG_0303.webp",
                "images/IMG_0305.webp",
                "images/IMG_0309.webp",
                "images/IMG_0311.webp",
                "images/IMG_0316.webp"
            ]
        },
        {
            id: "S_ANNIE",
            name: "Scrub Annie",
            price: 320.00,
            originalPrice: 390.00,
            pixPrice: 304.00,
            category: "scrub",
            badge: "Mais Vendido",
            description: "O Scrub feminino dos sonhos. Decote V suave, calça jogger funcional com bolsos estratégicos e elástico de alto conforto na cintura.",
            images: [
                "images/IMG_0321.webp",
                "images/IMG_0326.webp",
                "images/IMG_0331.webp",
                "images/IMG_0341.webp",
                "images/IMG_0343.webp",
                "images/IMG_0345.webp",
                "images/IMG_0349.webp",
                "images/IMG_0353.webp",
                "images/IMG_0361.webp",
                "images/IMG_0363.webp"
            ]
        },
        {
            id: "S_JAMES",
            name: "Scrub James",
            price: 320.00,
            originalPrice: 390.00,
            pixPrice: 304.00,
            category: "scrub",
            badge: "",
            description: "Ergonomia avançada para cirurgiões e médicos atuantes. Tecido quadri-stretch com máxima flexibilidade e acabamento anti-pilling.",
            images: [
                "images/IMG_0366.webp",
                "images/IMG_0367.webp",
                "images/IMG_0372.webp",
                "images/IMG_0375.webp",
                "images/IMG_0376.webp",
                "images/IMG_0381.webp"
            ]
        },
        {
            id: "S_MARIE",
            name: "Scrub Marie",
            price: 320.00,
            originalPrice: 390.00,
            pixPrice: 304.00,
            category: "scrub",
            badge: "Novidade",
            description: "Elegância minimalista em formato Scrub. Corte acinturado com mangas curtas de caimento fluido e toque incrivelmente macio.",
            images: [
                "images/IMG_0396.webp",
                "images/IMG_0408.webp",
                "images/IMG_0411.webp",
                "images/IMG_0413.webp"
            ]
        },
        {
            id: "S_COATS",
            name: "Scrub COATS High-Tech",
            price: 340.00,
            originalPrice: 420.00,
            pixPrice: 323.00,
            category: "scrub",
            badge: "Premium",
            description: "Engenharia têxtil de ponta em scrubs hospitalares. Repelente a líquidos, proteção solar UPF50+ e durabilidade extrema.",
            images: [
                "images/IMG_0335.webp",
                "images/IMG_0425.webp",
                "images/IMG_0426.webp",
                "images/IMG_0435.webp",
                "images/IMG_0445.webp",
                "images/IMG_0459.webp",
                "images/IMG_0463.webp",
                "images/IMG_0505.webp"
            ]
        }
    ];

    let currentTab = 'all';
    let visibleItemsCount = 12;
    let searchQuery = '';
    let selectedSizeModal = 'M';

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
            const secondImg = item.images[1] || item.images[0];
            return `
                <div class="product-card" data-id="${item.id}">
                    <div class="product-image-container">
                        <img src="${item.images[0]}" alt="${item.name}" class="product-img" loading="lazy" data-hover="${secondImg}" data-main="${item.images[0]}">
                        ${badgeHtml}
                        <button class="quick-view-btn">VER GALERIA / ZOOM</button>
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

        // Attach Card Hover Photo Swap Listener
        catalogGrid.querySelectorAll('.product-card').forEach(card => {
            const img = card.querySelector('.product-img');
            if (img && img.dataset.hover) {
                card.addEventListener('mouseenter', () => {
                    img.src = img.dataset.hover;
                });
                card.addEventListener('mouseleave', () => {
                    img.src = img.dataset.main;
                });
            }
            
            // Open Modal on click anywhere on card
            card.addEventListener('click', (e) => {
                const prodId = card.dataset.id;
                const prod = products.find(p => p.id === prodId);
                if (prod) {
                    openProductModal(prod);
                }
            });
        });

        if (loadMoreContainer) {
            if (filtered.length > visibleItemsCount) {
                loadMoreContainer.style.display = 'flex';
            } else {
                loadMoreContainer.style.display = 'none';
            }
        }
    };

    // ==========================================================================
    // PRODUCT QUICK VIEW / LIGHTBOX MODAL LOGIC
    // ==========================================================================
    const productModal = document.getElementById('product-modal');
    
    const openProductModal = (product) => {
        if (!productModal) return;

        document.getElementById('modal-title').textContent = product.name;
        document.getElementById('modal-category').textContent = product.category === 'jaleco' ? 'Jaleco de Luxo' : 'Scrub Tecnológico';
        document.getElementById('modal-price').textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
        document.getElementById('modal-original-price').textContent = `R$ ${product.originalPrice.toFixed(2).replace('.', ',')}`;
        document.getElementById('modal-pix').textContent = `R$ ${product.pixPrice.toFixed(2).replace('.', ',')} no PIX (5% OFF)`;
        document.getElementById('modal-desc').textContent = product.description;

        const mainImg = document.getElementById('modal-main-img');
        mainImg.src = product.images[0];

        // Render gallery thumbnails
        const thumbsBar = document.getElementById('modal-thumbnails');
        thumbsBar.innerHTML = product.images.map((img, idx) => `
            <img src="${img}" alt="${product.name} - Foto ${idx+1}" class="modal-thumb ${idx === 0 ? 'active' : ''}" data-src="${img}">
        `).join('');

        thumbsBar.querySelectorAll('.modal-thumb').forEach(thumb => {
            thumb.addEventListener('click', () => {
                thumbsBar.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                mainImg.src = thumb.dataset.src;
            });
        });

        // WhatsApp direct link generator
        const updateWaLink = () => {
            const waBtn = document.getElementById('modal-whatsapp-btn');
            if (waBtn) {
                const message = encodeURIComponent(`Olá COATS! Gostaria de encomendar o ${product.name} (Tamanho: ${selectedSizeModal}). Poderia me passar mais informações?`);
                waBtn.href = `https://wa.me/5575981256201?text=${message}`;
            }
        };
        updateWaLink();

        // Size selector interaction
        const sizeBtns = productModal.querySelectorAll('.size-btn');
        sizeBtns.forEach(btn => {
            btn.onclick = () => {
                sizeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedSizeModal = btn.dataset.size;
                updateWaLink();
            };
        });

        // Add to cart from modal
        const addCartBtn = document.getElementById('modal-add-cart-btn');
        addCartBtn.onclick = () => {
            const cartId = `${product.id}_${selectedSizeModal}`;
            const existing = cart.find(i => i.id === cartId);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({
                    id: cartId,
                    name: `${product.name} (${selectedSizeModal})`,
                    price: product.price,
                    img: product.images[0],
                    quantity: 1
                });
            }
            updateCartUI();
            showToast(`${product.name} (${selectedSizeModal}) adicionado à sacola!`);
            closeModal();
        };

        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (productModal) {
            productModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (productModal) {
        productModal.querySelector('.close-modal-btn').addEventListener('click', closeModal);
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) closeModal();
        });
    }

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

    // ==========================================================================
    // EMBROIDERY VIDEO SELECTOR TABS
    // ==========================================================================
    const videoSelectBtns = document.querySelectorAll('.video-select-btn');
    const embroideryVideo = document.querySelector('.embroidery-video');
    if (videoSelectBtns.length > 0 && embroideryVideo) {
        videoSelectBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                videoSelectBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const src = btn.getAttribute('data-src');
                if (src) {
                    embroideryVideo.src = src;
                    embroideryVideo.play();
                }
            });
        });
    }
});
