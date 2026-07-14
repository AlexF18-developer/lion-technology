/* =======================================================
   PRODUCTS.JS
   Catálogo dinámico de productos, filtros inteligentes
   y enlaces automatizados a WhatsApp.
======================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================
       DATOS DE PRODUCTOS DE PRUEBA (Placeholder premium)
    ========================== */
    const products = [
        {
            id: 1,
            title: "Audífonos Lion Beast ANC",
            category: "audifonos",
            description: "Audífonos premium con cancelación activa de ruido (ANC), almohadillas de memory foam y 40 horas de batería.",
            price: 189.90,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: 2,
            title: "Smartwatch Lion Watch G3",
            category: "smartwatches",
            description: "Pantalla AMOLED de alta resolución, sensor de ritmo cardíaco, monitoreo de sueño y resistencia al agua IP68.",
            price: 249.90,
            image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: 3,
            title: "Cargador Lion Turbo GaN 65W",
            category: "cargadores",
            description: "Cargador ultra compacto con tecnología GaN. Incluye triple puerto (2 USB-C + 1 USB-A) compatible con laptops y celulares.",
            price: 79.90,
            image: "https://images.unsplash.com/photo-1731616103600-3fe7ccdc5a59?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 4,
            title: "Power Bank Lion Tank 20K",
            category: "powerbanks",
            description: "Batería externa de 20,000 mAh con carga súper rápida de 22.5W, pantalla LED digital y múltiples salidas USB.",
            price: 119.90,
            image: "https://images.unsplash.com/photo-1706275400998-7fc21c8cd8ed?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 5,
            title: "Audífonos Lion Buds Air Pro",
            category: "audifonos",
            description: "Audífonos True Wireless Bluetooth 5.3 con resistencia a salpicaduras, modo de latencia ultra baja y estuche táctil.",
            price: 129.90,
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: 6,
            title: "Smartwatch Lion Active Band",
            category: "smartwatches",
            description: "Pulsera inteligente ultraligera con medición de oxígeno (SpO2), 30 modos deportivos y batería que dura hasta 14 días.",
            price: 99.90,
            image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop&q=80"
        }
    ];

    /* ==========================
       CONFIGURACIÓN Y ELEMENTOS
    ========================== */
    const productsGrid = document.querySelector('.products__grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Usamos el número de celular que tienes configurado en tu index.html
    const WHATSAPP_NUMBER = "51950087635"; 

    /* ==========================
       RENDERIZAR PRODUCTOS EN EL HTML
    ========================== */
    const renderProducts = (productsList) => {
        // Limpiamos la grilla
        productsGrid.innerHTML = '';

        if (productsList.length === 0) {
            productsGrid.innerHTML = `
                <div class="products__empty" style="grid-column: 1/-1; text-align: center; padding: 40px 0;">
                    <i class="fa-regular fa-face-frown" style="font-size: 3rem; color: var(--text-light); margin-bottom: 15px;"></i>
                    <p style="color: var(--text-light);">No encontramos productos disponibles en esta categoría.</p>
                </div>
            `;
            return;
        }

        productsList.forEach(product => {
            // Creamos un mensaje personalizado para que el cliente lo envíe con 1 solo clic
            const message = `Hola Lion Technology, estoy interesado en comprar el producto: *${product.title}* por el precio de *S/ ${product.price.toFixed(2)}*. ¿Tienen stock disponible?`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

            // Crear el elemento de la tarjeta
            const card = document.createElement('article');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-card__image">
                    <img src="${product.image}" alt="${product.title}" loading="lazy">
                </div>
                <div class="product-card__content">
                    <span class="product-card__category">${getCategoryLabel(product.category)}</span>
                    <h3 class="product-card__title">${product.title}</h3>
                    <p class="product-card__description">${product.description}</p>
                    <div class="product-card__price">S/ ${product.price.toFixed(2)}</div>
                    <div class="product-card__button">
                        <a href="${whatsappUrl}" target="_blank" rel="noopener" class="btn btn--primary">
                            <i class="fa-brands fa-whatsapp"></i> Comprar ahora
                        </a>
                    </div>
                </div>
            `;
            productsGrid.appendChild(card);
        });
    };

    /* ==========================
       SOPORTE PARA CATEGORÍAS (ETIQUETAS VISIBLES)
    ========================== */
    const getCategoryLabel = (category) => {
        const labels = {
            "audifonos": "Audífonos",
            "cargadores": "Cargadores",
            "powerbanks": "Power Bank",
            "smartwatches": "Smartwatch"
        };
        return labels[category] || category;
    };

    /* ==========================
       SISTEMA DE FILTRADO ROBUSTO
    ========================== */
    // Mapa auxiliar por si tu HTML no tiene "data-filter" todavía
    const categoryMapping = {
        "todos": "all",
        "audífonos": "audifonos",
        "cargadores": "cargadores",
        "power bank": "powerbanks",
        "smartwatch": "smartwatches"
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 1. Manejo visual de la clase activa
            filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
            button.classList.add('filter-btn--active');

            // 2. Obtener la categoría elegida (de "data-filter" o leyendo el texto del botón directamente)
            let selectedCategory = button.getAttribute('data-filter');
            
            if (!selectedCategory) {
                const buttonText = button.textContent.trim().toLowerCase();
                selectedCategory = categoryMapping[buttonText] || "all";
            }

            // 3. Filtrar y pintar los productos en pantalla
            if (selectedCategory === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(prod => prod.category === selectedCategory);
                renderProducts(filtered);
            }
        });
    });

    /* ==========================
       INICIO
    ========================== */
    // Muestra todos los productos al cargar la página por primera vez
    renderProducts(products);

});