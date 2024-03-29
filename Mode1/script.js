"use strict";

// Data Jeu
const boutonsJouer = document.getElementsByClassName("jouer");
const signes = ["Pierre", "Feuille", "Ciseaux"];
let pointsRobot = 0;
let pointsJoueur = 0;
let essai = 0;

// Data affichage
const resultatAffichage = document.getElementById("resultat");
const résumé = document.getElementsByClassName("résumé");
const vs = document.getElementById("vs");
const score = document.getElementById("score");
const img = document.getElementsByClassName("img");
const fin = document.getElementById("fin");
const boutonRejouer = document.getElementById("boutonRejouer");

// Evénement "click" du bouton (fonction play)
function play(choixJoueur) {
  choixJoueur = signes[choixJoueur];
  const choixRobot = signes[Math.floor(Math.random() * signes.length)];
  résultat(choixJoueur, choixRobot);
  affichage(choixJoueur, choixRobot);

  if (pointsJoueur == 3 || pointsRobot == 3) {
    finale();
  }

  essai++;
}

// Fonctions nécessaire au jeu
function résultat(choixJoueur, choixRobot) {
  if (choixJoueur === choixRobot) {
    resultatAffichage.innerHTML = 'Egalité ! <span class="far fa-meh"></span>';
    resultatAffichage.className = "orange";
  } else if (
    (choixJoueur == "Pierre" && choixRobot == "Ciseaux") ||
    (choixJoueur == "Feuille" && choixRobot == "Pierre") ||
    (choixJoueur == "Ciseaux" && choixRobot == "Feuille")
  ) {
    resultatAffichage.innerHTML =
      'Gagné ! <span class="far fa-grin-tongue-wink"></span>';
    resultatAffichage.className = "green";
    pointsJoueur++;
  } else {
    resultatAffichage.innerHTML =
      'Perdu ! <span class="far fa-sad-cry"></span>';
    resultatAffichage.className = "red";
    pointsRobot++;
  }
}

function affichage(choixJoueur, choixRobot) {
  vs.className = "active-flex";
  score.className = "active";

  img[0].innerHTML = `<img src="images/${choixJoueur}.gif"></img>`;
  img[1].innerHTML = `<img src="images/${choixRobot}.gif"></img>`;

  résumé[0].innerHTML = `<b>${essai}°</b>`;
  résumé[1].innerHTML = `<b>${pointsJoueur}</b>`;
  résumé[2].innerHTML = `<b>${pointsRobot}</b>`;

  résumé[1].className = "résumé";
  résumé[2].className = "résumé";
  if (pointsJoueur > pointsRobot) {
    résumé[1].classList.add("win");
    résumé[2].classList.add("win");
  } else if (pointsRobot > pointsJoueur) {
    résumé[1].classList.add("lose");
    résumé[2].classList.add("lose");
  } else {
    résumé[1].classList.add("tie");
    résumé[2].classList.add("tie");
  }
}

function finale() {
  boutonRejouer.className = "active";

  for (let i = 0; i < boutonsJouer.length; i++) {
    boutonsJouer[i].disabled = true;
  }

  if (pointsJoueur > pointsRobot) {
    fin.innerHTML =
      '<b>Bravo, vous avez gagné ! <span class="far fa-grin-tongue-wink"></span></b>';
    fin.classList.add("green");
  } else if (pointsRobot > pointsJoueur) {
    fin.innerHTML =
      'Dommage, vous avez perdu ! <span class="far fa-sad-cry"></span>';
    fin.classList.add("red");
  }
}

function rejouer() {
  for (let i = 0; i < boutonsJouer.length; i++) {
    boutonsJouer[i].disabled = false;
  }

  boutonRejouer.className = "inactive";
  score.className = "inactive";
  vs.className = "inactive";
  fin.innerHTML = "";
  fin.className = "";
  resultatAffichage.innerHTML = "";

  pointsJoueur = 0;
  pointsRobot = 0;
  essai = 0;
}
