"use strict";

// Data Jeu
const boutonsJouer = document.getElementsByClassName("jouer");
const signes = ["Pierre", "Feuille", "Ciseaux"];
let pointsRobot = 0;
let pointsJoueur = 0;
let résultat = "";
let essai = 0;

// Data affichage
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

// Evénement "click" du bouton (fonction play)
function play(choixJoueur) {
  choixJoueur = signes[choixJoueur];
  const choixRobot = signes[Math.floor(Math.random() * signes.length)];
  affichageRésultat(choixJoueur, choixRobot);

  containerAffichage.className = "active-flex";
  affichageImages(choixJoueur, choixRobot);
  affichageGraph();
  affichageHistorique();

  if (pointsJoueur == 5 || pointsRobot == 5) {
    finale();
  }

  essai++;
}

// Fonctions nécessaire au jeu
function affichageRésultat(choixJoueur, choixRobot) {
  if (choixJoueur === choixRobot) {
    résultat =
      '<span style="color: orange">Egalité ! <span class="far fa-meh"></span></span>';
  } else if (
    (choixJoueur == "Pierre" && choixRobot == "Ciseaux") ||
    (choixJoueur == "Feuille" && choixRobot == "Pierre") ||
    (choixJoueur == "Ciseaux" && choixRobot == "Feuille")
  ) {
    résultat =
      '<span style="color: green">Gagné ! <span class="far fa-grin-tongue-wink"></span></span>';
    pointsJoueur++;
    resultatAffichage.className = "green";
  } else {
    résultat =
      '<span style="color: red">Perdu ! <span class="far fa-sad-cry"></span></span>';
    resultatAffichage.className = "red";
    pointsRobot++;
  }
  resultatAffichage.innerHTML = résultat;
}

function affichageImages(choixJoueur, choixRobot) {
  img[0].innerHTML = `<img src="images/${choixJoueur}.gif"></img>`;
  img[1].innerHTML = `<img src="images/${choixRobot}.gif"></img>`;
}

function affichageGraph() {
  ctx.clearRect(0, 0, 250, 380);
  if ((pointsJoueur == 0) & (pointsRobot == 0)) {
    ctx.fillStyle = "rgb( 0, 255, 0)";
    ctx.fillRect(50, 190, 50, 190);
    ctx.fillStyle = "rgb( 255, 0, 0)";
    ctx.fillRect(200, 190, 50, 190);
  } else {
    ctx.fillStyle = "rgb( 0, 255, 0)";
    let winSquareMath = Math.floor(
      (pointsJoueur / (pointsRobot + pointsJoueur)) * 380
    );
    ctx.fillRect(50, 380 - winSquareMath, 50, winSquareMath);
    ctx.fillStyle = "rgb( 255, 0, 0)";
    let lossSquareMath = Math.floor(
      (pointsRobot / (pointsRobot + pointsJoueur)) * 380
    );
    ctx.fillRect(200, 380 - lossSquareMath, 50, lossSquareMath);
  }

  divPointsJoueur.innerHTML = `<b>${pointsJoueur}</b>`;
  divPointsRobot.innerHTML = `<b>${pointsRobot}</b>`;
}

function affichageHistorique() {
  historique.innerHTML += `Partie ${essai} : ${résultat}<br>`;
}

function finale() {
  boutonRejouer.className = "active";

  for (let i = 0; i < boutonsJouer.length; i++) {
    boutonsJouer[i].disabled = true;
  }

  if (pointsJoueur > pointsRobot) {
    fin.innerHTML =
      '<b style="color: green">Bravo, vous avez gagné ! <span class="far fa-grin-tongue-wink"></span></b>';
  } else if (pointsRobot > pointsJoueur) {
    fin.innerHTML =
      '<b style="color: red">Dommage, vous avez perdu ! <span class="far fa-sad-cry"></span></b>';
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
  resultatAffichage.innerHTML = "";
  historique.innerHTML = "";

  pointsJoueur = 0;
  pointsRobot = 0;
  essai = 0;
}
