const listaImagens = [
    "./src/imgs/trabalhador-sol.jpg",
    "./src/imgs/hidratacao-agua.jpg",
    "./src/imgs/equipe-obra.jpg"
];

const listaLegendas = [
    {
        titulo: "Proteção contra o Calor Extremo",
        texto: "Monitoramento inteligente e focado na segurança dos trabalhadores expostos ao sol nas ruas."
    },
    {
        titulo: "Hidratação e Prevenção",
        texto: "Incentivo constante ao consumo de água e pontos de apoio para evitar a desidratação severa."
    },
    {
        titulo: "Tecnologia nos Canteiros de Obras",
        texto: "Sensores IoT de borda para alertar equipes sobre riscos térmicos em tempo real."
    }
];

let indiceAtual = 0;

const imagemCarrossel = document.getElementById("imagemCarrossel");
const tituloLegenda = document.getElementById("tituloLegenda");
const textoLegenda = document.getElementById("textoLegenda");
const btnAnterior = document.getElementById("btnAnterior");
const btnProximo = document.getElementById("btnProximo");
const indicadores = document.querySelectorAll(".indicador");
const contadorSlide = document.getElementById("contadorSlide");

function atualizarCarrossel() {
    imagemCarrossel.src = listaImagens[indiceAtual];
    tituloLegenda.textContent = listaLegendas[indiceAtual].titulo;
    textoLegenda.textContent = listaLegendas[indiceAtual].texto;

    if (contadorSlide) {
        const numeroFormatado = String(indiceAtual + 1).padStart(2, "0");
        const totalFormatado = String(listaImagens.length).padStart(2, "0");
        contadorSlide.textContent = `${numeroFormatado} / ${totalFormatado}`;
    }

    indicadores.forEach((bolinha, idx) => {
        bolinha.classList.toggle("ativo", idx === indiceAtual);
    });
}

if (btnProximo) {
    btnProximo.addEventListener("click", function () {
        indiceAtual++;
        if (indiceAtual >= listaImagens.length) {
            indiceAtual = 0;
        }
        atualizarCarrossel();
    });
}

if (btnAnterior) {
    btnAnterior.addEventListener("click", function () {
        indiceAtual--;
        if (indiceAtual < 0) {
            indiceAtual = listaImagens.length - 1;
        }
        atualizarCarrossel();
    });
}

indicadores.forEach((bolinha) => {
    bolinha.addEventListener("click", function () {
        const novoIndice = Number(bolinha.dataset.indice);
        if (!Number.isNaN(novoIndice)) {
            indiceAtual = novoIndice;
            atualizarCarrossel();
        }
    });
});

atualizarCarrossel();