/* Page Formulaire : vérification des champs avant l'inscription */

const regles = {
  txtUsername: {
    test: function (v) { return v.length >= 7 && v.length <= 12; },
    message: 'Entre 7 et 12 caractères.'
  },
  txtPassword: {
    test: function (v) { return v.length >= 7 && v.length <= 12; },
    message: 'Entre 7 et 12 caractères.'
  },
  txtFirstname: {
    test: function (v) { return /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(v); },
    message: 'Lettres uniquement.'
  },
  txtLastname: {
    test: function (v) { return /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(v); },
    message: 'Lettres uniquement.'
  },
  txtAddress: {
    test: function (v) { return /^[0-9A-Za-zÀ-ÖØ-öø-ÿ' ,.-]+$/.test(v); },
    message: 'Lettres, chiffres et espaces uniquement.'
  },
  txtCode: {
    test: function (v) { return /^[0-9]{5}$/.test(v); },
    message: '5 chiffres, par exemple 29200.'
  },
  txtEmail: {
    test: function (v) { return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v); },
    message: 'Adresse e-mail invalide, par exemple nom@exemple.fr.'
  }
};

function verifierChamp(id) {
  const champ = document.getElementById(id);
  const erreur = document.getElementById(id + '-erreur');
  const valeur = champ.value.trim();
  const ok = regles[id].test(valeur);
  champ.setAttribute('aria-invalid', ok ? 'false' : 'true');
  erreur.textContent = ok ? '' : (valeur === '' ? 'Ce champ est obligatoire. ' : '') + regles[id].message;
  return ok;
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form1');
  const resultat = document.getElementById('resultat-form');

  // vérifie un champ dès qu'on le quitte
  Object.keys(regles).forEach(function (id) {
    document.getElementById(id).addEventListener('blur', function () {
      if (this.value !== '') verifierChamp(id);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let premierFaux = null;
    Object.keys(regles).forEach(function (id) {
      if (!verifierChamp(id) && !premierFaux) premierFaux = id;
    });

    resultat.className = 'result';
    if (premierFaux) {
      resultat.textContent = 'Certains champs sont à corriger.';
      resultat.classList.add('ko');
      document.getElementById(premierFaux).focus();
    } else {
      const prenom = document.getElementById('txtFirstname').value.trim();
      resultat.textContent = 'Merci ' + prenom + ', votre compte est créé.';
      resultat.classList.add('ok');
    }
  });

  form.addEventListener('reset', function () {
    Object.keys(regles).forEach(function (id) {
      document.getElementById(id).removeAttribute('aria-invalid');
      document.getElementById(id + '-erreur').textContent = '';
    });
    resultat.textContent = '';
    resultat.className = 'result';
  });
});
