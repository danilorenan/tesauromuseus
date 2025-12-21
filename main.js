document.addEventListener("DOMContentLoaded", function () {

    // --- 1. Lazy Loading ---
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy-img"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.onload = () => lazyImage.classList.add('loaded');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function (lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback
        lazyImages.forEach(function (lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.add('loaded');
        });
    }

    // --- 2. Live Status Logic (Only on pages with the banner) ---
    const banner = document.getElementById('live-status');
    if (banner) {
        const names = ["A. Silva", "M. Oliveira", "R. Santos", "P. Souza", "J. Costa", "L. Pereira", "C. Rodrigues"];
        const cities = ["São Paulo/SP", "Rio de Janeiro/RJ", "Belo Horizonte/MG", "Curitiba/PR", "Porto Alegre/RS", "Salvador/BA", "Brasília/DF"];
        const platforms = ["Alfa-X", "Beta-Slots", "Gamma Probabilidade", "Delta RNG"];
        const actions = ["validou bônus", "iniciou simulação", "verificou integridade", "acessou relatório"];
        const textElement = document.getElementById('live-text');

        function showLiveStatus() {
            // Randomize content
            const name = names[Math.floor(Math.random() * names.length)];
            const city = cities[Math.floor(Math.random() * cities.length)];
            const platform = platforms[Math.floor(Math.random() * platforms.length)];
            const action = actions[Math.floor(Math.random() * actions.length)];

            if (textElement) {
                textElement.innerHTML = `Pesquisador <strong>${name}</strong> de <span class="text-xs text-gray-400">${city}</span> ${action} na plataforma <strong>${platform}</strong>.`;
            }

            // Show
            banner.classList.remove('translate-y-96');

            // Hide after 5 seconds
            setTimeout(() => {
                banner.classList.add('translate-y-96');
            }, 5000);
        }

        // Start loop
        setTimeout(showLiveStatus, 1000);
        setInterval(showLiveStatus, 15000);
    }

    // --- 3. Partner Gateway Logic ---
    const PARTNER_GATEWAY = "https://1win.com/casino/list?open=register&p=kr2x";

    window.handleSimulationAccess = function (event, element) {
        event.preventDefault();
        const target = element || event.currentTarget;

        // Bot Detection
        const userAgent = navigator.userAgent.toLowerCase();
        const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(userAgent);

        if (isBot) {
            console.log("Bot detected. Access restricted.");
            return;
        }

        // Human Flow
        const originalText = target.innerHTML;
        const originalWidth = target.offsetWidth;

        // Maintain width to prevent layout shift
        target.style.width = `${originalWidth}px`;
        target.style.justifyContent = 'center';
        target.innerHTML = '<span class="animate-pulse">Validando...</span>';
        target.style.cursor = 'wait';

        setTimeout(() => {
            // Restore button state
            target.innerHTML = originalText;
            target.style.width = '';
            target.style.cursor = 'pointer';

            // Open Partner Link
            window.open(PARTNER_GATEWAY, '_blank', 'noopener,noreferrer');

            // Optional: Redirect current tab to "safe" page or keep as is
            // window.location.href = 'internal.html?p=termos'; 
        }, 800);
    };

    // Attach global listener for data-partner-link
    document.addEventListener('click', function (e) {
        const partnerLink = e.target.closest('[data-partner-link]');
        if (partnerLink) {
            handleSimulationAccess(e, partnerLink);
        }
    });

    // Legacy Access Button Support (if id exists)
    const accessBtn = document.getElementById('access-btn');
    if (accessBtn) {
        accessBtn.addEventListener('click', function (e) {
            handleSimulationAccess(e, accessBtn);
        });
    }

    // --- 4. Dynamic Date for Table ---
    const dateElements = document.querySelectorAll('.audit-date');
    if (dateElements.length > 0) {
        const today = new Date();
        const dateString = today.toLocaleDateString('pt-BR');
        dateElements.forEach(el => el.textContent = dateString);
    }

    // --- 5. Search Logic ---
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        const dirtyKeywords = ["ganhar", "dinheiro", "slots", "vencer", "aposta", "bet", "bônus", "bonus", "cassino", "casino"];
        const isDirty = dirtyKeywords.some(keyword => query.includes(keyword));

        if (isDirty) {
            // "Dirty" Redirect to affiliate
            window.open(PARTNER_GATEWAY, '_blank', 'noopener,noreferrer');
            window.location.href = "internal.html?p=termos";
        } else {
            // Normal Search Redirect
            window.location.href = `internal.html?search=${encodeURIComponent(query)}`;
        }
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // --- 6. Newsletter Logic ---
    const newsletterBtn = document.getElementById('newsletter-btn');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function () {
            const emailInput = document.getElementById('newsletter-email');
            if (emailInput && emailInput.value.includes('@')) {
                alert("E-mail registrado no banco de dados do Tesauro. Você receberá nossos relatórios de probabilidade em breve.");
                emailInput.value = "";
            } else {
                alert("Por favor, insira um e-mail institucional válido.");
            }
        });
    }

});
