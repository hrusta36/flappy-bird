let scoreZ = new Audio(
  "../media/audio/score-mixkit-retro-game-notification-212.wav",
);
let goZ = new Audio(
  "../media/audio/gameover-mixkit-little-piano-game-over-1944.wav",
);
let zScore = 0;
//polje
let polje;
let poljeWidth = 360;
let poljeHeight = 640;
let kontekst;

//ptica
let pticaWidth = 34;
let pticaHeight = 24;
let pticaX = poljeWidth / 8;
let pticaY = poljeHeight / 2;
let pticaImg;

let ptica = {
  x: pticaX,
  y: pticaY,
  width: pticaWidth,
  height: pticaHeight,
};

//cijevi
let cijevArray = [];
let cijevWidth = 64;
let cijevHeight = 512;
let cijevX = poljeWidth;
let cijevY = 0;

let gornjaCijevImg;
let donjaCijevImg;

//fizika
let brzinaX = -2; //pomjeranje cijevi u ljevo
let brzinaY = 0; //brzina skoka ptice
let gravitacija = 0.4;

let gameOver = false;
let score = 0;

window.onclick = function () {
  polje = document.getElementById("polje");
  polje.height = poljeHeight;
  polje.width = poljeWidth;
  kontekst = polje.getContext("2d"); //crtanje na polju

  pticaImg = new Image();
  pticaImg.src = "../media/images/flappybird.png";
  pticaImg.onload = function () {
    kontekst.drawImage(pticaImg, ptica.x, ptica.y, ptica.width, ptica.height);
  };

  gornjaCijevImg = new Image();
  gornjaCijevImg.src = "../media/images/toppipe.png";

  donjaCijevImg = new Image();
  donjaCijevImg.src = "../media/images/bottompipe.png";

  requestAnimationFrame(update);
  setInterval(postaviCijevi, 1500); //every 1.5 seconds
  document.addEventListener("keydown", pomjeriPticu);
};

function update() {
  requestAnimationFrame(update);
  if (gameOver) {
    return;
  }
  kontekst.clearRect(0, 0, polje.width, polje.height);

  //ptica
  brzinaY += gravitacija;
  ptica.y = Math.max(ptica.y + brzinaY, 0);
  kontekst.drawImage(pticaImg, ptica.x, ptica.y, ptica.width, ptica.height);

  if (ptica.y > polje.height) {
    gameOver = true;
  }

  //cijevi
  for (let i = 0; i < cijevArray.length; i++) {
    let cijev = cijevArray[i];
    cijev.x += brzinaX;
    kontekst.drawImage(cijev.img, cijev.x, cijev.y, cijev.width, cijev.height);

    if (!cijev.passed && ptica.x > cijev.x + cijev.width) {
      score += 0.5;
      cijev.passed = true;
      if (score - zScore >= 10) {
        pustiScoreZ();
        zScore = score;
      }
    }

    if (ucitajSudar(ptica, cijev)) {
      gameOver = true;
    }
  }

  //ciscenje cijevi
  while (cijevArray.length > 0 && cijevArray[0].x < -cijevWidth) {
    cijevArray.shift();
  }

  //score
  kontekst.fillStyle = "#B80000";
  kontekst.font = "45px sans-serif";
  kontekst.fillText(score, 5, 45);
  if (gameOver) {
    pustiGOZ();
    kontekst.fillText("GAME OVER", 5, 90);
  }
}

function postaviCijevi() {
  if (gameOver) {
    return;
  }

  let randomCijevY =
    cijevY - cijevHeight / 4 - Math.random() * (cijevHeight / 2);
  let razmak = polje.height / 4;

  let gornjaCijev = {
    img: gornjaCijevImg,
    x: cijevX,
    y: randomCijevY,
    width: cijevWidth,
    height: cijevHeight,
    passed: false,
  };
  cijevArray.push(gornjaCijev);

  let donjaCijev = {
    img: donjaCijevImg,
    x: cijevX,
    y: randomCijevY + cijevHeight + razmak,
    width: cijevWidth,
    height: cijevHeight,
    passed: false,
  };
  cijevArray.push(donjaCijev);
}

function pomjeriPticu(a) {
  if (a.code == "Space" || a.code == "ArrowUp" || a.code == "KeyX") {
    //skok
    brzinaY = -6;

    if (gameOver) {
      ptica.y = pticaY;
      cijevArray = [];
      score = 0;
      gameOver = false;
    }
  }
}

function ucitajSudar(a, b) {
  return (
    a.x < b.x + b.width && //a gornji lijevi ugao ne doseze b gornji desni ugao
    a.x + a.width > b.x && //a gornji desni ugao prolazi b gornji lijevi ugao
    a.y < b.y + b.height && //a gornji lijevi ugao ne doseze b donji lijevi ugao
    a.y + a.height > b.y
  ); //a donji lijevi ugao prolazi b gornji lijevi ugao
}
function pustiScoreZ() {
  scoreZ.currentTime = 0;
  scoreZ.play();
}
function pustiGOZ() {
  goZ.currentTime = 0;
  goZ.play();
}
function nazad() {
  window.location.href = "login.html";
}
