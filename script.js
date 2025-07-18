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
