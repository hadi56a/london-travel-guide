/* Page Démographie : petit quiz sur la population */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('quiz-population');
  const champ = document.getElementById('population');
  const resultat = document.getElementById('resultat-quiz');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const reponse = parseFloat(champ.value.replace(',', '.'));
    resultat.className = 'result';

    if (isNaN(reponse)) {
      resultat.textContent = 'Entrez un nombre (en millions).';
      resultat.classList.add('ko');
    } else if (reponse >= 8 && reponse <= 10) {
      resultat.textContent = 'Bravo ! Le Grand Londres compte un peu moins de 9 millions d’habitants.';
      resultat.classList.add('ok');
    } else if (reponse < 8) {
      resultat.textContent = 'C’est plus : Londres compte plus de 8 millions d’habitants.';
      resultat.classList.add('ko');
    } else {
      resultat.textContent = 'C’est moins : la ville compte un peu moins de 9 millions d’habitants (environ 15 millions avec toute l’aire métropolitaine).';
      resultat.classList.add('ko');
    }
  });
});
