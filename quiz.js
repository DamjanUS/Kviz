let prasanja = [
  {
    prasanje: "Prvo prasanje",
    odgovori: ["Odgovor1", "Odgovor2", "Odgovor3", "Odgovor4"],
    tocenOdgovor: 0,
    dobivka: "100 000 $",
  },
  {
    prasanje: "Vtoro prasanje",
    odgovori: ["Odgovor5", "Odgovor6", "Odgovor7", "Odgovor8"],
    tocenOdgovor: 2,
    dobivka: "250 000 $",
  },
  {
    prasanje: "Treto prasanje",
    odgovori: ["Odgovor9", "Odgovor10", "Odgovor11", "Odgovor12"],
    tocenOdgovor: 1,
    dobivka: "500 000 $",
  },
  {
    prasanje: "Cetvrto prasanje",
    odgovori: ["Odgovor13", "Odgovor14", "Odgovor15", "Odgovor16"],
    tocenOdgovor: 2,
    dobivka: "750 000 $",
  },
  {
    prasanje: "Petto prasanje",
    odgovori: ["Odgovor17", "Odgovor18", "Odgovor19", "Odgovor20"],
    tocenOdgovor: 0,
    dobivka: "1 000 000 $",
  },
];

let currentQuestionIndex = null;

function prikaziPrasanje(index) {
  currentQuestionIndex = index;

  const question = prasanja[currentQuestionIndex];

  const que = document.getElementById("prasanjeTekst");
  que.innerHTML = question.prasanje;

  const ans1 = document.getElementById("label1");
  ans1.innerHTML = question.odgovori[0];

  const ans2 = document.getElementById("label2");
  ans2.innerHTML = question.odgovori[1];

  const ans3 = document.getElementById("label3");
  ans3.innerHTML = question.odgovori[2];

  const ans4 = document.getElementById("label4");
  ans4.innerHTML = question.odgovori[3];

  obeleziPrasanje(currentQuestionIndex, "momentalno");
}

function bukvaVoIndex(bukva) {
  let index = bukva.charCodeAt(0);
  return index - 65;
}

function indexVoBukva(index) {
  let bukva = String.fromCharCode(index + 65);
  return bukva;
}

function odberiPrasanje(odgovorB) {
  let userAnswer = bukvaVoIndex(odgovorB);

  let currentQuestion = prasanja[currentQuestionIndex];
  let correctAnswer = currentQuestion.tocenOdgovor;

  let isCorrect = userAnswer == correctAnswer;
  if (isCorrect) {
    console.info("Tocno");
    obeleziPrasanje(currentQuestionIndex, "tocno");
    const isWinner = currentQuestionIndex == prasanja.length - 1;
    if (isWinner) {
      alert("Cestitki, ti si noviot milioner!");
      restart();
    } else {
      prikaziPrasanje(currentQuestionIndex + 1);
    }
  } else {
    alert("Greshen odgovor, povekje srekja sleden pat!");
    restart();
  }
}

function obeleziPrasanje(index, boja) {
  let id = "pr" + index;
  document.getElementById(id).classList.add(boja);
}

function restart() {
  let ime = prompt("Vnesi ime");
  document.getElementById("imeIgrac").innerText = ime;

  let pr1 = document.getElementById("pr0");
  pr1.classList.remove("momentalno", "tocno");

  let pr2 = document.getElementById("pr1");
  pr2.classList.remove("momentalno", "tocno");

  let pr3 = document.getElementById("pr2");
  pr3.classList.remove("momentalno", "tocno");

  let pr4 = document.getElementById("pr3");
  pr4.classList.remove("momentalno", "tocno");

  let pr5 = document.getElementById("pr4");
  pr5.classList.remove("momentalno", "tocno");

  iskoristi50x50 = false;
  iskoristiPrijatel = false;
  iskoristenoPublika = false;

  prikaziPrasanje(0);
}

function generateRandom(doBroj) {
  return Math.floor(Math.random() * (doBroj - 1));
}

let iskoristenoPublika = false;

function glasanjePublika() {
  if (iskoristenoPublika === true) {
    return;
  }
  iskoristenoPublika = true;

  document.getElementById("glasanjePublika").style.display = "block";

  let pro1 = generateRandom(100);
  document.getElementById("pro1").style.width = pro1 + "%";

  let pro2 = generateRandom(100);
  document.getElementById("pro2").style.width = pro2 + "%";

  let pro3 = generateRandom(100);
  document.getElementById("pro3").style.width = pro3 + "%";

  let pro4 = generateRandom(100);
  document.getElementById("pro4").style.width = pro4 + "%";

  setTimeout(function () {
    document.getElementById("glasanjePublika").style.display = "none";
  }, 7500);
}

let iskoristiPrijatel = false;

function povikajPrijatel() {
  if (iskoristiPrijatel === true) {
    return;
  }
  iskoristiPrijatel = true;

  let prijatelotVeli = indexVoBukva(generateRandom(3));
  alert("Prijatelot veli: " + prijatelotVeli);
}

let iskoristi50x50 = false;

function odberi50x50() {
  if (iskoristi50x50) return;

  iskoristi50x50 = true;

  const currentQuestion = prasanja[currentQuestionIndex];
  const correctAnswer = currentQuestion.tocenOdgovor;

  let removedAnswersCount = 0;
  while (removedAnswersCount < 2) {
    const randomIndex = generateRandom(4);
    if (
      randomIndex !== correctAnswer &&
      currentQuestion.odgovori[randomIndex] !== null
    ) {
      currentQuestion.odgovori[randomIndex] = null;

      const answerLabels = document.querySelectorAll(".odgovori button");
      answerLabels.forEach((button, index) => {
        if (currentQuestion.odgovori[index] === null) {
          button.style.padding = "15px";
          button.innerText = "/";
        }
      });
      removedAnswersCount++;
    }
  }
}

setTimeout(function () {
  restart();
}, 100);
