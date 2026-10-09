/* Page d'accueil : convertisseur euros -> livres sterling */

const TAUX_EURO_LIVRE = 0.86; // taux indicatif, à mettre à jour si besoin

function lireNombre(texte) {
  // accepte "12,5" comme "12.5"
  return parseFloat(String(texte).replace(',', '.').trim());
}

function formater(n) {
  return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('convertisseur');
  const champ = document.getElementById('euros');
  const resultat = document.getElementById('resultat-conversion');

  // Les boutons 100 / 500 / 1000 remplissent le champ
  form.querySelectorAll('input[name="montant"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      champ.value = radio.value;
      convertir();
    });
  });

  function convertir() {
    const euros = lireNombre(champ.value);
    resultat.className = 'result';

    if (champ.value.trim() === '') {
      resultat.textContent = 'Entrez une somme en euros.';
      resultat.classList.add('ko');
    } else if (isNaN(euros)) {
      resultat.textContent = 'Ce n’est pas un nombre valide.';
      resultat.classList.add('ko');
    } else if (euros <= 0) {
      resultat.textContent = 'La somme doit être supérieure à 0.';
      resultat.classList.add('ko');
    } else {
      const livres = euros * TAUX_EURO_LIVRE;
      resultat.innerHTML = formater(euros) + ' € = <strong>' + formater(livres) + ' £</strong>';
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    convertir();
  });
});
