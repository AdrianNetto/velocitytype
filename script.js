const texto = document.querySelector("#texto");
const entrada = document.querySelector("#entrada");
const reiniciar = document.querySelector("#reiniciar");
const resultado = document.querySelector(".resultado");
const historico = document.querySelector("#historico");
const alternarTemaBtn = document.querySelector("#alternarTema");

const textos = [
  "o ceu esta azul",
  "as flores sao coloridas",
  "o vento sopra suave",
  "a chuva cai devagar",
  "o sol brilha forte",
  "os passaros cantam alto",
  "a noite esta escura",
  "as estrelas piscam",
  "a lua ilumina tudo",
  "o mar faz barulho",
  "a terra gira rapido",
  "as montanhas sao altas",
  "os rios correm rapido",
  "as nuvens se movem",
  "os animais sao diversos",
  "o homem pensa muito",
  "a mulher trabalha muito",
  "as criancas brincam alegres",
  "a vida e curta",
  "o tempo passa rapido",
  "o dinheiro e importante",
  "o amor e essencial",
  "a saude e preciosa",
  "a amizade e valiosa",
  "a felicidade vem de dentro",
  "a tristeza passa logo",
  "a esperanca nunca morre",
  "a natureza e sabia",
  "o conhecimento e poder",
  "a paciencia e virtude",
  "a pressa e inimiga",
  "a mentira machuca",
  "a verdade liberta",
  "o trabalho dignifica",
  "a preguica prejudica",
  "a educacao transforma",
  "a cultura enriquece",
  "a humildade engrandece",
  "a arrogancia diminui",
  "a justica e cega",
  "a injustica revolta",
  "a igualdade e ideal",
  "a liberdade e preciousa",
  "a paz e desejavel",
  "a guerra e destrutiva",
  "a solidariedade fortalece",
  "a compaixao acalma",
  "a generosidade alegra",
  "a bondade ilumina",
  "a vida continua",
];

function novoTexto() {
  const index = Math.floor(Math.random() * textos.length);
  texto.textContent = textos[index];
  console.log(textos);
}

function atualizarTeste() {
  iniciar();

  if (entrada.value === texto.textContent) {
    verificar();
  }
}

function iniciar() {
  const statusDoTeste = JSON.parse(localStorage.getItem("testeEmAndamento"));

  if (!statusDoTeste) {
    localStorage.setItem("tempoInicial", new Date().getTime());
    localStorage.setItem("testeEmAndamento", true);
  }
}

function verificar() {
  const tempoFinal = new Date().getTime();
  const tempoInicial = parseInt(localStorage.getItem("tempoInicial"));
  const tempoGasto = (tempoFinal - tempoInicial) / 1000;

  const textoDigitado = entrada.value.trim();
  const palavrasDigitadas = textoDigitado.split(/\s+/).length;

  const palavrasPorMinuto = Math.round((palavrasDigitadas / tempoGasto) * 60);

  resultado.textContent = `Seu tempo foi equivalente a ${tempoGasto.toFixed(
    2
  )} segundos. Você digitou a uma taxa de ${palavrasPorMinuto} palavras por minuto.`;

  adicionarAoHistorico(texto.textContent, tempoGasto, palavrasPorMinuto);

  localStorage.setItem("testeEmAndamento", false);
  entrada.value = "";
  novoTexto();
}

function adicionarAoHistorico(textoDigitado, tempoGasto, palavrasPorMinuto) {
  const itemHistorico = document.createElement("p");

  itemHistorico.textContent = `Texto: "${textoDigitado}" -- Tempo: ${tempoGasto.toFixed(
    2
  )} segundos -- WPM: ${palavrasPorMinuto} palavras por minuto`;

  historico.appendChild(itemHistorico);
}

function reiniciarTeste() {
  entrada.value = "";
  resultado.textContent = "";
  novoTexto();
  localStorage.setItem("testeEmAndamento", false);
  historico.innerHTML = "";
}

function alternarTema() {
  const body = document.body;

  body.classList.toggle("claro");
  body.classList.toggle("escuro");
}

entrada.addEventListener("keyup", atualizarTeste);
reiniciar.addEventListener("click", reiniciarTeste);
alternarTemaBtn.addEventListener("click", alternarTema);

novoTexto();
