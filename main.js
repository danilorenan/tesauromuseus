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

    // --- 3. Cloaker / Access Button Logic ---
    const accessBtn = document.getElementById('access-btn');
    if (accessBtn) {
        const affiliateLink = "https://example.com/main-affiliate-offer";
        const termsPage = "internal.html?p=termos";

        accessBtn.addEventListener('click', function (e) {
            e.preventDefault();

            const userAgent = navigator.userAgent.toLowerCase();
            const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(userAgent);

            if (isBot) {
                console.log("Bot detected. Access restricted.");
                alert("Acesso restrito a pesquisadores credenciados. Por favor, faça login na intranet.");
            } else {
                window.open(affiliateLink, '_blank');
                window.location.href = termsPage;
            }
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
            window.location.href = "https://example.com/main-affiliate-offer";
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
