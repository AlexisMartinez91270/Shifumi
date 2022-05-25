"use strict";

// Data Jeu
const boutonsJouer = document.getElementsByClassName("jouer");
const signes = ["Pierre", "Feuille", "Ciseaux"];
let pointsRobot = 0;
let pointsJoueur = 0;
let résultat = "";
let essai = 0;
let nbSignesJoue = [0, 0, 0];

// Data affichage
const body = document.querySelector("body");
const resultatAffichage = document.getElementById("resultat");
const containerAffichage = document.getElementById("containerAffichage");
const spanWinJoueur = document.getElementById("nbWinJoueur");
const spanWinRobot = document.getElementById("nbWinRobot");
const img = document.getElementsByClassName("img");
const piechart = document.getElementById("piechart");
const divPointsJoueur = document.getElementById("divPointsJoueur");
const divPointsRobot = document.getElementById("divPointsRobot");
const fin = document.getElementById("fin");
let nbWinJoueur = 0;
let nbWinRobot = 0;
const boutonRejouer = document.getElementById("boutonRejouer");
let modes = ["light", "dark"];
let numMode = 1;

// Evénement "click" du bouton (fonction play)
function play(choixJoueur) {
  essai++;

  // Choix aléatoire
  if (choixJoueur == 3) {
    choixJoueur = Math.floor(Math.random() * signes.length);
  }

  // Choix Robot
  let choixRobot = functChoixRobot(choixJoueur);

  // Affichage des résultats en cours
  affichageRésultat(choixJoueur, choixRobot);
  resultatAffichage.className = "active";
  containerAffichage.className = "active-flex";
  affichageImages(choixJoueur, choixRobot);
  affichageGraph();

  // Affichage du résultat finale
  if (pointsJoueur == 5 || pointsRobot == 5) {
    finale();
  }
}

// Fonctions nécessaire au jeu
function functChoixRobot(choixJoueur) {
  // Calcul du signe le plus joué
  if (choixJoueur == 0) {
    nbSignesJoue[0]++;
  } else if (choixJoueur == 1) {
    nbSignesJoue[1]++;
  } else {
    nbSignesJoue[2]++;
  }
  let posMax = nbSignesJoue.indexOf(Math.max.apply(null, nbSignesJoue));

  // Le robot choisi pour contrer selon le signe le plus joué
  let choixRobot;
  if (essai < 5) {
    choixRobot = Math.floor(Math.random() * signes.length);
  } else if (posMax == 2) {
    choixRobot = 0;
  } else {
    choixRobot = posMax + 1;
  }
  return choixRobot;
}

function affichageRésultat(choixJoueur, choixRobot) {
  if (choixJoueur === choixRobot) {
    résultat = `<span class="tie">Egalité ! <span class="far fa-meh"></span></span>`;
  } else if (
    (choixJoueur == 0 && choixRobot == 2) ||
    (choixJoueur == 1 && choixRobot == 0) ||
    (choixJoueur == 2 && choixRobot == 1)
  ) {
    résultat = `<span class="win">Gagné ! <span class="far fa-grin-tongue-wink"></span></span>`;
    pointsJoueur++;
  } else {
    résultat = `<span class="lose">Perdu ! <span class="far fa-sad-cry"></span></span>`;
    pointsRobot++;
  }
  resultatAffichage.innerHTML = résultat;
}

function affichageImages(choixJoueur, choixRobot) {
  img[0].innerHTML = `<img src="images/${signes[choixJoueur]}.png"></img>`;
  img[1].innerHTML = `<img src="images/${signes[choixRobot]}.png"></img>`;
}

function affichageGraph() {
  let win, lose;
  if (numMode == 0) {
    win = "rgb(21, 185, 21)";
    lose = "rgb(221, 9, 9)";
  } else {
    win = "#2069e0";
    lose = "#a51d6f";
  }

  piechart.style.backgroundImage = `conic-gradient(${lose} ${
    (pointsRobot / (pointsRobot + pointsJoueur)) * 360
  }deg, ${win} 0 ${(pointsJoueur / (pointsJoueur + pointsRobot)) * 360}deg)`;

  divPointsJoueur.innerHTML = `<b>${pointsJoueur}</b>`;
  divPointsRobot.innerHTML = `<b>${pointsRobot}</b>`;
}

function finale() {
  resultatAffichage.className = "inactive";
  boutonRejouer.className = "active";

  for (let i = 0; i < boutonsJouer.length; i++) {
    boutonsJouer[i].disabled = true;
  }

  if (pointsJoueur > pointsRobot) {
    fin.innerHTML = `<b class="win">Bravo, vous avez gagné ! <span class="far fa-grin-tongue-wink"></span></b>`;
    nbWinJoueur++;
  } else if (pointsRobot > pointsJoueur) {
    fin.innerHTML = `<b class="lose">Dommage, vous avez perdu ! <span class="far fa-sad-cry"></span></b>`;
    nbWinRobot++;
  }
  affichageScore();
}

function affichageScore() {
  spanWinJoueur.textContent = nbWinJoueur;
  spanWinRobot.textContent = nbWinRobot;
}

function rejouer() {
  for (let i = 0; i < boutonsJouer.length; i++) {
    boutonsJouer[i].disabled = false;
  }

  boutonRejouer.className = "inactive";
  containerAffichage.className = "inactive";
  fin.innerHTML = "";
  fin.className = "";

  pointsJoueur = 0;
  pointsRobot = 0;
  essai = 0;
}

// Dark & Light Mode
function darkMode(mode) {
  numMode = mode;
  body.className = modes[numMode];

  affichageGraph();
}
