const html = document.querySelector("html");
const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBtn = document.querySelector("#start-pause");
const musicaFrocoInput = document.querySelector('#alterar-musica')
const iniciarOuPausarBtn = document.querySelector('#start-pause span')
const iniciarOuPausarIcon = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')

const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("sons/luna-rise-part-one.mp3");
const audioPlay = new Audio("sons/play.wav");
const audioPause = new Audio("sons/pause.mp3");
const audioTempoFinalizado = new Audio("sons/beep.mp3");

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
musica.loop = true;

// audioElement.play(); // Inicia a reprodução
// audioElement.pause(); // Pausa a reprodução
// audioElement.currentTime = 10; // Move para 10 segundos no áudio
// audioElement.volume = 0.5; // Define o volume para metade (50%)

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBtn.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500
  alterarContexto("foco");
  focoBtn.classList.add("active");
});

curtoBtn.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300
  alterarContexto("descanso-curto");
  curtoBtn.classList.add("active");
});

longoBtn.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900
  alterarContexto("descanso-longo");
  longoBtn.classList.add("active");
});

function alterarContexto(contexto) {
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
        Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
        `;
      break;
    case "descanso-curto":
      titulo.innerHTML = `
       Que tal dar uma respirada?<br>
            <strong class="app__title-strong"> Faça uma pausa curta!</strong>
        `;
      break;

    case "descanso-longo":
      titulo.innerHTML = `
        Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
        `;
      break;

    default:
      break;
  }
}


const contagemRegressiva = () => {
  mostrarTempo()
  if (tempoDecorridoEmSegundos <= 0) {
    // audioTempoFinalizado.play()
    alert("Tempo finalizado!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
};

startPauseBtn.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    audioPause.play();
    zerar();
    return;
  }
  audioPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarIcon.setAttribute("src", `/imagens/pause.png`);
  iniciarOuPausarBtn.textContent = "Pausar"
}

function zerar() {
  clearInterval(intervaloId);
  iniciarOuPausarIcon.setAttribute("src", `/imagens/play_arrow.png`);
  iniciarOuPausarBtn.textContent = "Começar"
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000)
  const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
  tempoNaTela.innerHTML = `${tempoFormatado}`
}

function alterarContexto(contexto) {
  mostrarTempo()
  botoes.forEach(function (contexto) {
    contexto.classList.remove('active')
  })
}

mostrarTempo()