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
            id: "J_KATHERINE",
            name: "Jaleco Katherine",
            price: 199.99,
            category: "jaleco",
            gender: "feminino",
            badge: "",
            description: "Jaleco de gola tradicional, com mangas estilo blazer e punho clássico. Possui bolsos funcionais e fechamento frontal por botões, proporcionando um visual elegante e profissional.",
            fabric: "96% poliamida, 4% elastano",
            sizes: [
                "P",
                "M",
                "G"
            ],
            images: [
                "images/catalogo/katherine-01.webp",
                "images/catalogo/katherine-02.webp",
                "images/catalogo/katherine-03.webp",
                "images/catalogo/katherine-04.webp",
                "images/catalogo/katherine-05.webp",
                "images/catalogo/katherine-06.webp"
            ],
            colors: [
                {
                    name: "Branco",
                    hex: "#ffffff",
                    images: [
                        "images/catalogo/katherine-01.webp",
                        "images/catalogo/katherine-02.webp",
                        "images/catalogo/katherine-03.webp",
                        "images/catalogo/katherine-04.webp",
                        "images/catalogo/katherine-05.webp",
                        "images/catalogo/katherine-06.webp"
                    ]
                },
                {
                    name: "Azul-marinho",
                    hex: "#1c2b4a"
                },
                {
                    name: "Preto",
                    hex: "#1c1a19"
                }
            ]
        },
        {
            id: "J_ELOAH",
            name: "Jaleco Eloah",
            price: 189.99,
            category: "jaleco",
            gender: "feminino",
            badge: "",
            description: "Jaleco de gola tradicional, com mangas estilo blazer e punho clássico. Possui bolsos funcionais e fechamento frontal por botões, proporcionando um visual elegante e profissional.",
            fabric: "96% poliamida, 4% elastano",
            sizes: [
                "P",
                "M",
                "G"
            ],
            images: [
                "images/catalogo/eloah-01.webp",
                "images/catalogo/eloah-02.webp",
                "images/catalogo/eloah-03.webp",
                "images/catalogo/eloah-04.webp"
            ],
            colors: [
                {
                    name: "Branco",
                    hex: "#ffffff",
                    images: [
                        "images/catalogo/eloah-01.webp",
                        "images/catalogo/eloah-02.webp",
                        "images/catalogo/eloah-03.webp",
                        "images/catalogo/eloah-04.webp"
                    ]
                },
                {
                    name: "Azul-marinho",
                    hex: "#1c2b4a"
                },
                {
                    name: "Preto",
                    hex: "#1c1a19"
                }
            ]
        },
        {
            id: "J_LISE",
            name: "Jaleco Lise",
            price: 199.99,
            category: "jaleco",
            gender: "feminino",
            badge: "",
            description: "Jaleco de gola redonda e mangas estilo boneca, com fechamento em zíper. Disponível nas opções com ou sem cinto, permitindo diferentes propostas de uso e acabamento.",
            fabric: "96% poliamida, 4% elastano",
            sizes: [
                "P",
                "M",
                "G"
            ],
            images: [
                "images/catalogo/lise-01.webp",
                "images/catalogo/lise-02.webp",
                "images/catalogo/lise-03.webp",
                "images/catalogo/lise-04.webp",
                "images/catalogo/lise-05.webp",
                "images/catalogo/lise-06.webp"
            ],
            colors: [
                {
                    name: "Branco",
                    hex: "#ffffff",
                    images: [
                        "images/catalogo/lise-01.webp",
                        "images/catalogo/lise-02.webp",
                        "images/catalogo/lise-03.webp",
                        "images/catalogo/lise-04.webp",
                        "images/catalogo/lise-05.webp",
                        "images/catalogo/lise-06.webp"
                    ]
                },
                {
                    name: "Azul-marinho",
                    hex: "#1c2b4a"
                },
                {
                    name: "Preto",
                    hex: "#1c1a19"
                }
            ]
        },
        {
            id: "J_MARIAH",
            name: "Jaleco Mariah",
            price: 189.99,
            category: "jaleco",
            gender: "feminino",
            badge: "",
            description: "Jaleco de gola redonda e mangas estilo boneca, com fechamento em zíper.",
            fabric: "96% poliamida, 4% elastano",
            sizes: [
                "P",
                "M",
                "G"
            ],
            images: [
                "images/catalogo/mariah-01.webp",
                "images/catalogo/mariah-02.webp",
                "images/catalogo/mariah-03.webp",
                "images/catalogo/mariah-04.webp"
            ],
            colors: [
                {
                    name: "Branco",
                    hex: "#ffffff",
                    images: [
                        "images/catalogo/mariah-01.webp",
                        "images/catalogo/mariah-02.webp",
                        "images/catalogo/mariah-03.webp",
                        "images/catalogo/mariah-04.webp"
                    ]
                },
                {
                    name: "Azul-marinho",
                    hex: "#1c2b4a"
                },
                {
                    name: "Preto",
                    hex: "#1c1a19"
                }
            ]
        },
        {
            id: "J_ELIZA",
            name: "Jaleco Eliza",
            price: 269.99,
            category: "jaleco",
            gender: "feminino",
            badge: "",
            description: "Jaleco em estilo sobretudo, com fechamento transpassado que proporciona uma proposta elegante e marcante. Uma peça sofisticada para compor o visual profissional.",
            fabric: "96% poliamida, 4% elastano",
            sizes: [
                "P",
                "M",
                "G"
            ],
            images: [
                "images/catalogo/eliza-01.webp",
                "images/catalogo/eliza-02.webp",
                "images/catalogo/eliza-03.webp",
                "images/catalogo/eliza-04.webp",
                "images/catalogo/eliza-05.webp"
            ],
            colors: [
                {
                    name: "Branco",
                    hex: "#ffffff",
                    images: [
                        "images/catalogo/eliza-01.webp",
                        "images/catalogo/eliza-02.webp",
                        "images/catalogo/eliza-03.webp",
                        "images/catalogo/eliza-04.webp"
                    ]
                },
                {
                    name: "Azul-marinho",
                    hex: "#1c2b4a"
                },
                {
                    name: "Preto",
                    hex: "#1c1a19",
                    images: [
                        "images/catalogo/eliza-05.webp"
                    ]
                }
            ]
        },
        {
            id: "J_BELL",
            name: "Jaleco Bell",
            price: 219.99,
            category: "jaleco",
            gender: "feminino",
            badge: "",
            description: "Jaleco de gola tradicional, com mangas estilo blazer e punho largo com três botões. Possui fechamento frontal por um botão, trazendo um toque elegante e sofisticado à peça.",
            fabric: "96% poliamida, 4% elastano",
            sizes: [
                "P",
                "M",
                "G"
            ],
            images: [
                "images/catalogo/bell-01.webp",
                "images/catalogo/bell-02.webp",
                "images/catalogo/bell-03.webp",
                "images/catalogo/bell-04.webp"
            ],
            colors: [
                {
                    name: "Branco",
                    hex: "#ffffff"
                },
                {
                    name: "Azul-marinho",
                    hex: "#1c2b4a"
                },
                {
                    name: "Preto",
                    hex: "#1c1a19",
                    images: [
                        "images/catalogo/bell-01.webp",
                        "images/catalogo/bell-02.webp",
                        "images/catalogo/bell-03.webp",
                        "images/catalogo/bell-04.webp"
                    ]
                }
            ]
        },
        {
            id: "J_RUBENS",
            name: "Jaleco Rubens",
            price: 189.99,
            category: "jaleco",
            gender: "masculino",
            badge: "",
            description: "Jaleco masculino com bolso pequeno e dois bolsos laterais, oferecendo praticidade e funcionalidade para a rotina profissional.",
            fabric: "96% poliamida, 4% elastano",
            sizes: [
                "P",
                "M",
                "G"
            ],
            images: [
                "images/catalogo/rubens-01.webp",
                "images/catalogo/rubens-02.webp",
                "images/catalogo/rubens-03.webp",
                "images/catalogo/rubens-04.webp",
                "images/catalogo/rubens-05.webp"
            ],
            colors: [
                {
                    name: "Branco",
                    hex: "#ffffff",
                    images: [
                        "images/catalogo/rubens-01.webp",
                        "images/catalogo/rubens-02.webp",
                        "images/catalogo/rubens-03.webp",
                        "images/catalogo/rubens-04.webp",
                        "images/catalogo/rubens-05.webp"
                    ]
                },
                {
                    name: "Azul-marinho",
                    hex: "#1c2b4a"
                },
                {
                    name: "Preto",
                    hex: "#1c1a19"
                }
            ]
        },
        {
            id: "J_ANDRE",
            name: "Jaleco André",
            price: 199.99,
            category: "jaleco",
            gender: "masculino",
            badge: "",
            description: "Jaleco masculino com fechamento frontal em zíper, trazendo uma proposta moderna, prática e funcional para o dia a dia profissional.",
            fabric: "96% poliamida, 4% elastano",
            sizes: [
                "P",
                "M",
                "G"
            ],
            images: [
                "images/catalogo/andre-01.webp",
                "images/catalogo/andre-02.webp",
                "images/catalogo/andre-03.webp",
                "images/catalogo/andre-04.webp",
                "images/catalogo/andre-05.webp"
            ],
            colors: [
                {
                    name: "Branco",
                    hex: "#ffffff",
                    images: [
                        "images/catalogo/andre-01.webp",
                        "images/catalogo/andre-02.webp",
                        "images/catalogo/andre-03.webp",
                        "images/catalogo/andre-04.webp",
                        "images/catalogo/andre-05.webp"
                    ]
                },
                {
                    name: "Azul-marinho",
                    hex: "#1c2b4a"
                },
                {
                    name: "Preto",
                    hex: "#1c1a19"
                }
            ]
        },
        {
            id: "S_ANNIE",
            name: "Scrub Annie",
            price: 179.99,
            category: "scrub",
            gender: "feminino",
            badge: "",
            description: "Blusa de scrub com gola redonda e mangas curtas. Possui fechamento frontal com botões invisíveis, proporcionando um visual clean, delicado e profissional.",
            fabric: "96% poliamida, 4% elastano",
            sizes: [
                "P",
                "M",
                "G"
            ],
            images: [
                "images/catalogo/annie-01.webp",
                "images/catalogo/annie-02.webp",
                "images/catalogo/annie-03.webp",
                "images/catalogo/annie-04.webp"
            ],
            colors: [
                {
                    name: "Azul-marinho",
                    hex: "#1c2b4a",
                    images: [
                        "images/catalogo/annie-02.webp",
                        "images/catalogo/annie-04.webp"
                    ]
                },
                {
                    name: "Branco",
                    hex: "#ffffff",
                    images: [
                        "images/catalogo/annie-03.webp"
                    ]
                },
                {
                    name: "Marsala",
                    hex: "#7b2331",
                    images: [
                        "images/catalogo/annie-01.webp"
                    ]
                }
            ]
        },
        {
            id: "S_CLARA",
            name: "Scrub Clara",
            price: 179.99,
            category: "scrub",
            gender: "feminino",
            badge: "",
            description: "",
            fabric: "96% poliamida, 4% elastano",
            sizes: [
                "P",
                "M",
                "G"
            ],
            images: [
                "images/catalogo/clara-01.webp",
                "images/catalogo/clara-02.webp",
                "images/catalogo/clara-03.webp",
                "images/catalogo/clara-04.webp"
            ],
            colors: [
                {
                    name: "Azul-marinho",
                    hex: "#1c2b4a",
                    images: [
                        "images/catalogo/clara-04.webp"
                    ]
                },
                {
                    name: "Branco",
                    hex: "#ffffff",
                    images: [
                        "images/catalogo/clara-01.webp",
                        "images/catalogo/clara-02.webp",
                        "images/catalogo/clara-03.webp"
                    ]
                },
                {
                    name: "Marsala",
                    hex: "#7b2331"
                }
            ]
        },
        {
            id: "S_JAMES",
            name: "Scrub James",
            price: 199.99,
            category: "scrub",
            gender: "masculino",
            badge: "",
            description: "Blusa gola V, bolso sobreposto na altura do peito e na frente, calça cós estilo calça social na frente, elástico atrás e bolsos laterais.",
            fabric: "96% poliamida, 4% elastano",
            sizes: [
                "P",
                "M",
                "G"
            ],
            images: [
                "images/catalogo/james-01.webp",
                "images/catalogo/james-02.webp",
                "images/catalogo/james-03.webp",
                "images/catalogo/james-04.webp"
            ],
            colors: [
                {
                    name: "Azul-marinho",
                    hex: "#1c2b4a"
                },
                {
                    name: "Branco",
                    hex: "#ffffff"
                },
                {
                    name: "Marsala",
                    hex: "#7b2331",
                    images: [
                        "images/catalogo/james-01.webp",
                        "images/catalogo/james-04.webp"
                    ]
                }
            ]
        },
        {
            id: "S_JOHN",
            name: "Scrub John",
            price: 199.99,
            category: "scrub",
            gender: "masculino",
            badge: "",
            description: "Scrub com gola V, recortes no ombro e bolsos recortados na frente, calça cós estilo calça social na frente, elástico atrás e bolsos laterais.",
            fabric: "96% poliamida, 4% elastano",
            sizes: [
                "P",
                "M",
                "G"
            ],
            images: [
                "images/catalogo/john-01.webp",
                "images/catalogo/john-02.webp",
                "images/catalogo/john-03.webp",
                "images/catalogo/john-04.webp"
            ],
            colors: [
                {
                    name: "Azul-marinho",
                    hex: "#1c2b4a",
                    images: [
                        "images/catalogo/john-01.webp",
                        "images/catalogo/john-02.webp",
                        "images/catalogo/john-03.webp"
                    ]
                },
                {
                    name: "Branco",
                    hex: "#ffffff",
                    images: [
                        "images/catalogo/john-04.webp"
                    ]
                },
                {
                    name: "Marsala",
                    hex: "#7b2331"
                }
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
            const productTab = `${product.category}-${product.gender}`;
            const matchesTab = currentTab === 'all' ||
                productTab === currentTab ||
                (product.gender === 'unissex' && currentTab.startsWith(`${product.category}-`));
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
                            <span class="sale-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                        </div>
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
        const categoryLabel = product.category === 'jaleco' ? 'Jaleco' : 'Scrub';
        const genderLabel = product.gender === 'feminino' ? 'Feminino' : product.gender === 'masculino' ? 'Masculino' : 'Unissex';
        document.getElementById('modal-category').textContent = `${categoryLabel} ${genderLabel}`;
        document.getElementById('modal-price').textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
        document.getElementById('modal-desc').textContent = product.description;
        document.getElementById('modal-fabric').textContent = `Tecido: ${product.fabric}`;

        const mainImg = document.getElementById('modal-main-img');
        const thumbsBar = document.getElementById('modal-thumbnails');

        // Render gallery thumbnails for a given set of images (a color's photos, or the full gallery)
        const renderGallery = (imgs) => {
            mainImg.src = imgs[0];
            thumbsBar.innerHTML = imgs.map((img, idx) => `
                <img src="${img}" alt="${product.name} - Foto ${idx+1}" class="modal-thumb ${idx === 0 ? 'active' : ''}" data-src="${img}">
            `).join('');

            thumbsBar.querySelectorAll('.modal-thumb').forEach(thumb => {
                thumb.addEventListener('click', () => {
                    thumbsBar.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                    mainImg.src = thumb.dataset.src;
                });
            });
        };

        // Color selector interaction (only for products with color variants)
        const colorSelector = document.getElementById('modal-color-selector');
        const colorOptions = document.getElementById('modal-color-options');
        const colorNameLabel = document.getElementById('modal-color-name');
        let selectedColorModal = null;

        if (product.colors && product.colors.length) {
            colorSelector.style.display = 'block';
            // Start on the color shown in the cover photo
            const defaultColor = product.colors.find(c => c.images && c.images.includes(product.images[0])) || product.colors[0];
            selectedColorModal = defaultColor.name;
            colorNameLabel.textContent = selectedColorModal;

            colorOptions.innerHTML = product.colors.map((c, idx) => `
                <button class="color-swatch ${c.name === selectedColorModal ? 'active' : ''}" data-color="${c.name}" style="background-color: ${c.hex};" title="${c.name}" aria-label="${c.name}"></button>
            `).join('');

            colorOptions.querySelectorAll('.color-swatch').forEach(swatch => {
                swatch.addEventListener('click', () => {
                    colorOptions.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
                    swatch.classList.add('active');
                    selectedColorModal = swatch.dataset.color;
                    colorNameLabel.textContent = selectedColorModal;
                    const chosen = product.colors.find(c => c.name === selectedColorModal);
                    if (chosen.images) {
                        const thumb = thumbsBar.querySelector(`.modal-thumb[data-src="${chosen.images[0]}"]`);
                        if (thumb) thumb.click();
                    }
                    updateWaLink();
                });
            });

            renderGallery(product.images);
        } else {
            colorSelector.style.display = 'none';
            colorOptions.innerHTML = '';
            renderGallery(product.images);
        }

        // WhatsApp direct link generator
        const updateWaLink = () => {
            const waBtn = document.getElementById('modal-whatsapp-btn');
            if (waBtn) {
                const colorInfo = selectedColorModal ? `, Cor: ${selectedColorModal}` : '';
                const message = encodeURIComponent(`Olá COATS! Gostaria de encomendar o ${product.name} (Tamanho: ${selectedSizeModal}${colorInfo}). Poderia me passar mais informações?`);
                waBtn.href = `https://wa.me/5575981256201?text=${message}`;
            }
        };
        updateWaLink();

        // Size selector interaction
        const sizeBtns = productModal.querySelectorAll('.size-btn');
        selectedSizeModal = 'M';
        sizeBtns.forEach(b => b.classList.toggle('active', b.dataset.size === selectedSizeModal));
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
            const cartId = selectedColorModal ? `${product.id}_${selectedSizeModal}_${selectedColorModal}` : `${product.id}_${selectedSizeModal}`;
            const variantLabel = selectedColorModal ? `${selectedSizeModal}, ${selectedColorModal}` : selectedSizeModal;
            const chosenColor = selectedColorModal ? product.colors.find(c => c.name === selectedColorModal) : null;
            const cartImg = chosenColor && chosenColor.images ? chosenColor.images[0] : product.images[0];
            const existing = cart.find(i => i.id === cartId);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({
                    id: cartId,
                    name: `${product.name} (${variantLabel})`,
                    price: product.price,
                    img: cartImg,
                    quantity: 1
                });
            }
            updateCartUI();
            showToast(`${product.name} (${variantLabel}) adicionado à sacola!`);
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
    // EMBROIDERY OPTION CARDS (expand to show fonts, titles and crests)
    // ==========================================================================
    const embroideryCards = document.querySelectorAll('.embroidery-option-card');
    embroideryCards.forEach(card => {
        const toggle = () => {
            const isOpen = card.classList.contains('open');
            embroideryCards.forEach(c => {
                c.classList.remove('open');
                c.setAttribute('aria-expanded', 'false');
            });
            if (!isOpen) {
                card.classList.add('open');
                card.setAttribute('aria-expanded', 'true');
            }
        };
        card.addEventListener('click', toggle);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });

    // Crest images not added yet fall back to a shield placeholder
    document.querySelectorAll('.embroidery-crest img').forEach(img => {
        img.addEventListener('error', () => img.classList.add('missing'));
        if (img.complete && img.naturalWidth === 0) img.classList.add('missing');
    });
});
