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
const historique = document.getElementById("historique");
const img = document.getElementsByClassName("img");
const divPointsJoueur = document.getElementById("divPointsJoueur");
const divPointsRobot = document.getElementById("divPointsRobot");
let canvas = document.getElementById("WLgraph");
let ctx = canvas.getContext("2d");
const fin = document.getElementById("fin");
const boutonRejouer = document.getElementById("boutonRejouer");
let modes = ["light", "dark"];
let numMode = 1;

// Evénement "click" du bouton (fonction play)
function play(choixJoueur) {
  essai++;

  // Choix Robot
  let choixRobot = functChoixRobot(choixJoueur);

  // Affichage des résultats en cours
  affichageRésultat(choixJoueur, choixRobot);
  resultatAffichage.className = "active";
  containerAffichage.className = "active-flex";
  affichageImages(choixJoueur, choixRobot);
  affichageGraph();
  affichageHistorique();

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
  img[0].innerHTML = `<img src="images/${signes[choixJoueur]}.gif"></img>`;
  img[1].innerHTML = `<img src="images/${signes[choixRobot]}.gif"></img>`;
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

  ctx.clearRect(0, 0, 250, 380);
  if ((pointsJoueur == 0) & (pointsRobot == 0)) {
    ctx.fillStyle = win;
    ctx.fillRect(50, 190, 50, 190);
    ctx.fillStyle = lose;
    ctx.fillRect(200, 190, 50, 190);
  } else {
    ctx.fillStyle = win;
    let winSquareMath = Math.floor(
      (pointsJoueur / (pointsRobot + pointsJoueur)) * 380
    );
    ctx.fillRect(50, 380 - winSquareMath, 50, winSquareMath);
    ctx.fillStyle = lose;
    let lossSquareMath = Math.floor(
      (pointsRobot / (pointsRobot + pointsJoueur)) * 380
    );
    ctx.fillRect(200, 380 - lossSquareMath, 50, lossSquareMath);
  }

  divPointsJoueur.innerHTML = `<b>${pointsJoueur}</b>`;
  divPointsRobot.innerHTML = `<b>${pointsRobot}</b>`;
}

function affichageHistorique() {
  historique.innerHTML += `<div>Partie ${essai} : ${résultat}     </div>`;
}

function finale() {
  resultatAffichage.className = "inactive";
  boutonRejouer.className = "active";

  for (let i = 0; i < boutonsJouer.length; i++) {
    boutonsJouer[i].disabled = true;
  }

  if (pointsJoueur > pointsRobot) {
    fin.innerHTML = `<b class="win">Bravo, vous avez gagné ! <span class="far fa-grin-tongue-wink"></span></b>`;
  } else if (pointsRobot > pointsJoueur) {
    fin.innerHTML = `<b class="lose">Dommage, vous avez perdu ! <span class="far fa-sad-cry"></span></b>`;
  }
}

function rejouer() {
  for (let i = 0; i < boutonsJouer.length; i++) {
    boutonsJouer[i].disabled = false;
  }

  boutonRejouer.className = "inactive";
  containerAffichage.className = "inactive";
  fin.innerHTML = "";
  fin.className = "";
  historique.innerHTML = "";

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
