// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", () => {
  // Sélectionner tous les menus avec sous-menu
  const dropdowns = document.querySelectorAll('.has-submenu');

  dropdowns.forEach(menu => {
    const link = menu.querySelector('a');

    link.addEventListener('click', (e) => {
      e.preventDefault(); // empêcher d'aller sur le lien "#"
      const submenu = menu.querySelector('.submenu');
      
      // Ferme tous les autres
      document.querySelectorAll('.submenu').forEach(sm => {
        if (sm !== submenu) sm.style.display = 'none';
      });

      // Toggle ouverture
      submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    });
  });

  // Fermer si on clique en dehors
  document.addEventListener('click', (e) => {
    const clickedInsideMenu = e.target.closest('.has-submenu');
    if (!clickedInsideMenu) {
      document.querySelectorAll('.submenu').forEach(sm => sm.style.display = 'none');
    }
  });
});


const toggleSearch = () => {
  const searchForm = document.querySelector('.search-form');
  const searchButton = document.querySelector('.search-button');
  const searchInput = document.querySelector('.search-input');

  searchButton.addEventListener('click', () => {
    searchForm.classList.toggle('active-search');
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchInput.value = '';
      searchForm.classList.remove('active-search');
    }
  });
};

toggleSearch();

const apiKey = 'd1t6a19r01qh0t0537h0d1t6a19r01qh0t0537hg';
const url = `https://finnhub.io/api/v1/news?category=general&token=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const top5 = data.slice(0, 5); 
    afficherTopFlops(top5);
  })
  .catch(error => console.error('Erreur API :', error));

function afficherTopFlops(donnees) {
  const container = document.getElementById('top-flop-bandeau');
  donnees.forEach(news => {
    const item = document.createElement('div');
    item.className = 'top-flop-item';
    item.innerHTML = `
      <span><strong>${news.headline}</strong></span><br>
      <small>${news.source}</small>
    `;
    container.appendChild(item);
  });
}

