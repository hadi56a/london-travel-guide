/* =========================================================
   Diaporama commun à toutes les pages.
   Utilisation dans le HTML :
     <div class="carousel" data-autoplay="4000" data-thumbs>
       <div class="carousel-frame"> <img ...> <img ...> </div>
     </div>
   - data-autoplay : défile tout seul (en millisecondes)
   - data-thumbs   : affiche les miniatures cliquables
   - data-fit="contain" : n'est pas recadré (pour les graphiques)
   ========================================================= */

function initCarousel(carousel) {
  const frame = carousel.querySelector('.carousel-frame');
  const slides = Array.from(frame.querySelectorAll('img'));
  if (slides.length === 0) return;

  let index = 0;
  let timer = null;

  // Barre : Précédente / compteur / Suivante
  const bar = document.createElement('div');
  bar.className = 'carousel-bar';
  bar.innerHTML =
    '<button type="button" class="btn ghost" data-dir="-1">Précédente</button>' +
    '<span class="carousel-count" aria-live="polite"></span>' +
    '<button type="button" class="btn ghost" data-dir="1">Suivante</button>';
  carousel.appendChild(bar);
  const count = bar.querySelector('.carousel-count');

  // Miniatures
  let thumbs = [];
  if (carousel.hasAttribute('data-thumbs')) {
    const list = document.createElement('div');
    list.className = 'carousel-thumbs';
    slides.forEach(function (img, i) {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Afficher l’image ' + (i + 1));
      b.innerHTML = '<img src="' + img.getAttribute('src') + '" alt="">';
      b.addEventListener('click', function () { show(i); restart(); });
      list.appendChild(b);
    });
    carousel.appendChild(list);
    thumbs = Array.from(list.children);
  }

  function show(n) {
    // on revient au début après la dernière image, et inversement
    index = (n + slides.length) % slides.length;
    slides.forEach(function (img, i) {
      img.classList.toggle('is-active', i === index);
    });
    thumbs.forEach(function (t, i) {
      t.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
    count.textContent = (index + 1) + ' / ' + slides.length;
  }

  bar.addEventListener('click', function (e) {
    const btn = e.target.closest('button[data-dir]');
    if (!btn) return;
    show(index + Number(btn.dataset.dir));
    restart();
  });

  // Défilement automatique (désactivé si l'utilisateur préfère moins d'animations)
  const delay = Number(carousel.dataset.autoplay);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function start() {
    if (delay && !reduce) timer = setInterval(function () { show(index + 1); }, delay);
  }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);

  show(0);
  start();
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.carousel').forEach(initCarousel);

  // Sur téléphone, le menu défile : on centre la page en cours
  const actuel = document.querySelector('.line [aria-current="page"]');
  const ligne = document.querySelector('.line');
  if (actuel && ligne && ligne.scrollWidth > ligne.clientWidth) {
    const station = actuel.parentElement;
    ligne.scrollLeft = station.offsetLeft - ligne.clientWidth / 2 + station.offsetWidth / 2;
  }
});
