const botaoAtivar = document.getElementById("HomeButton");
const conteudo = document.getElementById("Home");

window.addEventListener("scroll", function () {
  const posicao = conteudo.getBoundingClientRect();
  const span = botaoAtivar.getElementsByTagName("span");

  if (
    posicao.top <= window.innerHeight / 2 &&
    posicao.bottom >= window.innerHeight / 5
  ) {
    botaoAtivar.classList.add("nav-bar__button--status--actived");
    botaoAtivar.classList.remove("nav-bar__button");

    span[0].classList.add("nav-bar__text-container--font-size--active"); // Ativa o botão
    span[0].classList.remove("nav-bar__text-container"); // Ativa o botão
  } else {
    botaoAtivar.classList.add("nav-bar__button");
    botaoAtivar.classList.remove("nav-bar__button--status--actived");

    span[0].classList.remove("nav-bar__text-container--font-size--active"); // Desativa o botão
    span[0].classList.add("nav-bar__text-container");
  }
});

const botaoInstruction = document.getElementById("InstructionButton");
const conteudo2 = document.getElementById("Intructions");

window.addEventListener("scroll", function () {
  const posicao = conteudo2.getBoundingClientRect();
  const span = botaoInstruction.getElementsByTagName("span");

  if (
    posicao.top <= window.innerHeight / 5 &&
    posicao.bottom >= window.innerHeight / 5
  ) {
    botaoInstruction.classList.add("nav-bar__button--status--actived");
    botaoInstruction.classList.remove("nav-bar__button");

    span[0].classList.add("nav-bar__text-container--font-size--active"); // Ativa o botão
    span[0].classList.remove("nav-bar__text-container"); // Ativa o botão
  } else {
    botaoInstruction.classList.add("nav-bar__button");
    botaoInstruction.classList.remove("nav-bar__button--status--actived");

    span[0].classList.remove("nav-bar__text-container--font-size--active"); // Desativa o botão
    span[0].classList.add("nav-bar__text-container");
  }
});

const botaoForm = document.getElementById("FormButton");
const conteudo3 = document.getElementById("form-section");

window.addEventListener("scroll", function () {
  const posicao = conteudo3.getBoundingClientRect();
  const span = botaoForm.getElementsByTagName("span");

  if (
    posicao.top <= window.innerHeight / 5 &&
    posicao.bottom >= window.innerHeight / 5
  ) {
    botaoForm.classList.add("nav-bar__button--status--actived");
    botaoForm.classList.remove("nav-bar__button");

    span[0].classList.add("nav-bar__text-container--font-size--active"); // Ativa o botão
    span[0].classList.remove("nav-bar__text-container"); // Ativa o botão
  } else {
    botaoForm.classList.add("nav-bar__button");
    botaoForm.classList.remove("nav-bar__button--status--actived");

    span[0].classList.remove("nav-bar__text-container--font-size--active"); // Desativa o botão
    span[0].classList.add("nav-bar__text-container");
  }
});
