/* Page Culture : calcul de l'âge d'un musée */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('age-musee');
  const champ = document.getElementById('annee');
  const resultat = document.getElementById('resultat-musee');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const anneeActuelle = new Date().getFullYear();
    const annee = Number(champ.value);
    resultat.className = 'result';

    if (champ.value.trim() === '' || !Number.isInteger(annee)) {
      resultat.textContent = 'Entrez une année, par exemple 1824.';
      resultat.classList.add('ko');
    } else if (annee > anneeActuelle) {
      resultat.textContent = 'Cette année n’est pas encore arrivée : le musée ne peut pas exister.';
      resultat.classList.add('ko');
    } else if (annee === anneeActuelle) {
      resultat.textContent = 'C’est la première année du musée !';
    } else {
      const age = anneeActuelle - annee;
      resultat.innerHTML = 'Le musée a <strong>' + age + ' an' + (age > 1 ? 's' : '') + '</strong>.';
    }
  });
});
