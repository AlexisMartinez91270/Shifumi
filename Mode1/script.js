"use strict";

// Data Jeu
const boutonsJouer = document.getElementsByClassName("jouer");
const textSignes = document.getElementsByClassName("textSigne");
let pointsRobot = 0;
let pointsJoueur = 0;
let essai = 0;
let joueur, robot;

// Data affichage
const resultatAffichage = document.getElementById("resultat");
const résumé = document.getElementsByClassName("résumé");
const vs = document.getElementById("vs");
const score = document.getElementById("score");
const img = document.getElementsByClassName("img");
const vsText = document.getElementById("vsText");

for (let i = 0; i < boutonsJouer.length; i++) {
  boutonsJouer[i].addEventListener("click", function () {
    essai++;
    joueur = textSignes[i].textContent;
    robot =
      textSignes[Math.floor(Math.random() * textSignes.length)].textContent;
    if (joueur === robot) {
      resultatAffichage.innerHTML =
        'Egalité ! <span class="far fa-meh"></span>';
      resultatAffichage.style.color = "orange";
    } else if (
      (joueur == "Pierre" && robot == "Ciseaux") ||
      (joueur == "Feuille" && robot == "Pierre") ||
      (joueur == "Ciseaux" && robot == "Feuille")
    ) {
      resultatAffichage.innerHTML =
        'Gagné ! <span class="far fa-grin-tongue-wink"></span>';
      resultatAffichage.style.color = "green";
      pointsJoueur++;
    } else {
      resultatAffichage.innerHTML =
        'Perdu ! <span class="far fa-sad-cry"></span>';
      resultatAffichage.style.color = "red";
      pointsRobot++;
    }

    vs.style.display = "flex";
    score.style.display = "block";

    img[0].innerHTML = `<img src="images/${joueur}.gif"></img>`;
    vsText.innerHTML = "<p>VS</p>";
    img[1].innerHTML = `<img src="images/${robot}.gif"></img>`;

    résumé[0].innerHTML = `<b>${essai}°</b>`;
    résumé[1].innerHTML = `<b>${pointsJoueur}</b>`;
    résumé[2].innerHTML = `<b>${pointsRobot}</b>`;
    if (pointsJoueur > pointsRobot) {
      résumé[1].style.backgroundColor = "green";
      résumé[2].style.backgroundColor = "red";
    } else if (pointsRobot > pointsJoueur) {
      résumé[1].style.backgroundColor = "red";
      résumé[2].style.backgroundColor = "green";
    } else {
      résumé[1].style.backgroundColor = "orange";
      résumé[2].style.backgroundColor = "orange";
    }
  });
}
