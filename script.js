const texto = document.querySelector("#texto");
const entrada = document.querySelector("#entrada");
const reiniciar = document.querySelector("#reiniciar");
const resultado = document.querySelector(".resultado");
const historico = document.querySelector("#historico");
const alternarTemaBtn = document.querySelector("#alternarTema");

const textos = [
    "Exemplo de texto para digitar.",
    "Outro exemplo de texto para digitar.",
    "Mais um exemplo de texto para digitar.",
    "Digite isso.",
    "Você pode digitar isso aqui.",
];

function novoTexto() {
    const index = Math.floor(Math.random() * textos.length);
    texto.textContent = textos[index];
    console.log(textos);
}

function atualizarTeste() {
    iniciar();

    if(entrada.value === texto.textContent) {
        verificar()
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

    resultado.textContent = `Seu tempo foi equivalente a ${tempoGasto.toFixed(2)} segundos. Você digitou a uma taxa de ${palavrasPorMinuto} palavras por minuto.`;

    adicionarAoHistorico(texto.textContent, tempoGasto, palavrasPorMinuto);

    localStorage.setItem("testeEmAndamento", false);
    entrada.value = "";
    novoTexto();
}

function adicionarAoHistorico(textoDigitado, tempoGasto, palavrasPorMinuto) {
    const itemHistorico = document.createElement("p");

    itemHistorico.textContent = `Texto: "${textoDigitado}" -- Tempo: ${tempoGasto.toFixed(2)} segundos -- WPM: ${palavrasPorMinuto} palavras por minuto`;

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
