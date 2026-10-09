/* Page Traces : quiz, jeu du bus et prix des tickets */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Quiz : le monument le plus célèbre ---------- */
  const quiz = document.getElementById('quiz-monument');
  const resultatQuiz = document.getElementById('resultat-monument');
  quiz.addEventListener('click', function (e) {
    const btn = e.target.closest('button[data-reponse]');
    if (!btn) return;
    resultatQuiz.className = 'result';
    if (btn.dataset.reponse === 'oui') {
      resultatQuiz.textContent = 'C’est vrai ! Le Tower Bridge est le pont le plus photographié de Londres.';
      resultatQuiz.classList.add('ok');
    } else {
      resultatQuiz.textContent = 'Eh si : le Tower Bridge est bien la structure la plus célèbre de Londres.';
      resultatQuiz.classList.add('ko');
    }
  });

  /* ---------- 2. Jeu : amener le bus jusqu'à l'arrêt ---------- */
  const plateau = document.getElementById('chemin');
  const carre = document.getElementById('carre');
  const message = document.getElementById('message-jeu');
  const boutonRejouer = document.getElementById('rejouer');
  let posx = 0;
  let posy = 0;
  let arrive = false;

  // les flèches du clavier marchent aussi
  const touches = { ArrowDown: 's', ArrowUp: 'z', ArrowLeft: 'q', ArrowRight: 'd' };

  function deplacer(key) {
    if (arrive) return;
    // Le bus ne peut avancer que sur la route (positions en pixels)
    if (key === 's') {
      if (posy >= 0 && posy <= 135) posy += 5;
      else if (posy >= 120 && posy <= 325 && posx <= -50) posy += 5;
      else if (posx === 10 && posy >= 330 && posy <= 450) posy += 5;
    }
    if (key === 'z' && posy > 0 && posy <= 120) posy -= 5;
    if (key === 'd' && posy === 330 && posx >= -55 && posx <= 5) posx += 5;
    if (key === 'q' && posx <= 0 && posx >= -50 && posy === 140) posx -= 5;

    carre.style.left = posx + 'px';
    carre.style.top = posy + 'px';

    if (posy >= 450) {
      arrive = true;
      message.textContent = 'Bravo, le bus est arrivé à l’arrêt !';
      message.className = 'result ok';
    }
  }

  // Le jeu ne réagit que quand on a cliqué sur le plateau
  // (sinon taper « s » dans un champ ferait bouger le bus)
  plateau.addEventListener('keydown', function (event) {
    const key = touches[event.key] || event.key.toLowerCase();
    if (['z', 'q', 's', 'd'].includes(key)) {
      event.preventDefault();
      deplacer(key);
    }
  });
  plateau.addEventListener('click', function () { plateau.focus(); });

  // boutons de direction (pour les écrans tactiles)
  document.querySelectorAll('.pad button').forEach(function (btn) {
    btn.addEventListener('click', function () { deplacer(btn.dataset.touche); });
  });

  boutonRejouer.addEventListener('click', function () {
    posx = 0;
    posy = 0;
    arrive = false;
    carre.style.left = '0px';
    carre.style.top = '0px';
    message.textContent = '';
    message.className = 'result';
    plateau.focus();
  });

  /* ---------- 3. Prix des tickets (Warner Bros Studios) ---------- */
  const formTicket = document.getElementById('form-ticket');
  const resultatTicket = document.getElementById('resultat-ticket');

  function prix(n) {
    return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' £';
  }

  formTicket.addEventListener('submit', function (e) {
    e.preventDefault();
    const age = Number(document.getElementById('age').value);
    const nombre = Number(document.getElementById('nombre').value);
    resultatTicket.className = 'result';

    if (!Number.isInteger(age) || age < 0 || age > 120 || document.getElementById('age').value === '') {
      resultatTicket.textContent = 'Entrez un âge valide (un nombre entier).';
      resultatTicket.classList.add('ko');
      return;
    }
    if (!Number.isInteger(nombre) || nombre < 1) {
      resultatTicket.textContent = 'Entrez un nombre de personnes (au moins 1).';
      resultatTicket.classList.add('ko');
      return;
    }

    let tarif, nom;
    if (age > 15) { tarif = 49.95; nom = 'Tarif adulte'; }
    else if (age > 4) { tarif = 39.95; nom = 'Tarif enfant'; }
    else { tarif = 0; nom = 'Gratuit pour les 4 ans et moins'; }

    if (tarif === 0) {
      resultatTicket.innerHTML = nom + ' : <strong>0,00 £</strong>';
    } else {
      resultatTicket.innerHTML = nom + ' : ' + prix(tarif) + ' par personne. Total pour ' +
        nombre + ' personne' + (nombre > 1 ? 's' : '') + ' : <strong>' + prix(tarif * nombre) + '</strong>';
    }
  });
});
