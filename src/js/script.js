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

const formAlerta = document.getElementById("formAlerta");
const nomeAlerta = document.getElementById("nomeAlerta");
const emailAlerta = document.getElementById("emailAlerta");
const regiaoAlerta = document.getElementById("regiaoAlerta");
const feedbackAlerta = document.getElementById("feedbackAlerta");

function exibirErroFormulario(input, mensagem) {
    input.classList.add("campo-invalido");
    feedbackAlerta.textContent = mensagem;
    feedbackAlerta.classList.remove("sucesso");
    feedbackAlerta.classList.add("erro");
    input.focus();
}

function limparEstadoInputs(inputs) {
    inputs.forEach(function (input) {
        input.classList.remove("campo-invalido");
    });
}

if (formAlerta) {
    const listaInputs = [nomeAlerta, emailAlerta, regiaoAlerta];

    formAlerta.addEventListener("submit", function (evento) {
        evento.preventDefault();
        limparEstadoInputs(listaInputs);

        const nomeValor = nomeAlerta.value.trim();
        const emailValor = emailAlerta.value.trim();
        const regiaoValor = regiaoAlerta.value.trim();

        // 1. Verifica campos vazios
        if (nomeValor === "") {
            exibirErroFormulario(nomeAlerta, "Preencha o campo \"Nome completo\" antes de enviar.");
            return;
        }

        if (emailValor === "") {
            exibirErroFormulario(emailAlerta, "Preencha o campo \"E-mail\" antes de enviar.");
            return;
        }

        if (regiaoValor === "") {
            exibirErroFormulario(regiaoAlerta, "Preencha o campo \"Bairro ou região\" antes de enviar.");
            return;
        }

        // 2. Valida tamanho mínimo do nome
        if (nomeValor.length < 2) {
            exibirErroFormulario(nomeAlerta, "Digite um nome válido com pelo menos 2 caracteres.");
            return;
        }

        // 3. Valida formato do e-mail
        const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!padraoEmail.test(emailValor)) {
            exibirErroFormulario(emailAlerta, "Digite um endereço de e-mail válido (ex.: nome@email.com).");
            return;
        }

        // 4. Sucesso
        feedbackAlerta.textContent = `Alerta ativado com sucesso para ${nomeValor} na região de ${regiaoValor}!`;
        feedbackAlerta.classList.remove("erro");
        feedbackAlerta.classList.add("sucesso");
        formAlerta.reset();
    });

    // Remove o destaque vermelho em tempo real enquanto o usuário corrige
    listaInputs.forEach(function (input) {
        input.addEventListener("input", function () {
            if (input.value.trim() !== "") {
                input.classList.remove("campo-invalido");
            }
        });
    });
}