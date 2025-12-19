/**
 * Interatividade básica para o Portal Tesauro Museus
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const chips = document.querySelectorAll('.chip');

    // Simulação de busca
    const handleSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            console.log(`Buscando por: ${query}`);
            // Aqui seria implementada a lógica de filtragem ou redirecionamento
            alert(`Pesquisa acadêmica iniciada para: "${query}"\n(Funcionalidade de banco de dados em desenvolvimento)`);
        }
    };

    searchButton.addEventListener('click', handleSearch);

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Interatividade nos chips de filtros rápidos
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            searchInput.value = chip.textContent;
            handleSearch();
        });
    });

    // Efeito suave de revelação nos cards de categoria ao rolar
    const cards = document.querySelectorAll('.category-card');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
});

