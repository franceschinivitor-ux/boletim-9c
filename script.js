/* =========================================================
   BOLETIM DIGITAL — 9º ANO (TURMA 9C - NÚMERO 31)
   ========================================================= */

const CONFIG_ALUNO = {
  turma: "9C",
  numeroChamada: 31,
  apiUrl: "https://boletim-api.profbt.com.br"
};

// Armazena o PIN apenas em memória durante a sessão
let pinSessao = "";

// Array de objetos: cada objeto é uma disciplina (Dados Fictícios Iniciais)
let disciplinas = [
  { disciplina: "Língua Portuguesa", tri1: 78, tri2: "8,2", tri3: 8.6, faltas: [2, 2, 1] },
  { disciplina: "Matemática", tri1: 55, tri2: "5,4", tri3: null, faltas: [3, 2, 2] },
  { disciplina: "Ciências", tri1: 84, tri2: 7.9, tri3: "8,3", faltas: [1, 1, 1] },
  { disciplina: "História", tri1: "7,1", tri2: 82, tri3: null, faltas: [1, 2, 1] },
  { disciplina: "Geografia", tri1: 69, tri2: "7,5", tri3: 7.8, faltas: [0, 1, 1] },
  { disciplina: "Língua Inglesa", tri1: 88, tri2: 8.4, tri3: null, faltas: [1, 0, 1] },
  { disciplina: "Arte", tri1: "9,2", tri2: 87, tri3: 9.0, faltas: [1, 1, 0] },
  { disciplina: "Educação Física", tri1: 96, tri2: "9,3", tri3: null, faltas: [0, 1, 0] },
  { disciplina: "Educação Digital", tri1: 91, tri2: 8.9, tri3: "9,4", faltas: [1, 1, 0] },
  { disciplina: "Educação Financeira", tri1: 76, tri2: "7,2", tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Rec. Aprend. Matemática", tri1: 58, tri2: "5,9", tri3: 6.2, faltas: [2, 2, 1] },
  { disciplina: "Leitura Rec. Aprend. Lingua Portuguesa", tri1: 72, tri2: "7,6", tri3: null, faltas: [2, 1, 1] },
  { disciplina: "Pensamento Lógico", tri1: 49, tri2: 5.5, tri3: "5,8", faltas: [2, 2, 2] },
  { disciplina: "Literatura Arte e Movimento", tri1: "8,0", tri2: 84, tri3: null, faltas: [1, 1, 0] },
  { disciplina: "Práticas Experimentais", tri1: 64, tri2: "6,6", tri3: 7.0, faltas: [1, 1, 1] }
];

// Média mínima de referência
const MEDIA_MINIMA = 6.0;

// Frequência geral FICTÍCIA
const FREQUENCIA_DEMONSTRATIVA = 92;

/* ---------------------------------------------------------
   NORMALIZAÇÃO E FORMATAÇÃO DE NOTAS E FALTAS
   --------------------------------------------------------- */

// Normaliza a nota vinda dos dados antigos/API (0-10 ou 0-100)
function normalizarNota(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }

  let numero;
  if (typeof valor === "string") {
    numero = parseFloat(valor.replace(",", "."));
  } else {
    numero = Number(valor);
  }

  if (isNaN(numero)) {
    return null;
  }

  if (numero >= 0 && numero <= 10) {
    return numero;
  }

  if (numero > 10 && numero <= 100) {
    return numero / 10;
  }

  return null;
}

// Formata para exibição (ex: 8,5)
function formatarNota(numero) {
  if (numero === null || numero === undefined) {
    return "—";
  }
  return Number(numero).toFixed(1).replace(".", ",");
}

// Calcula média com notas válidas
function calcularMedia(notas) {
  const validas = notas.filter(function (n) {
    return n !== null && n !== undefined;
  });

  if (validas.length === 0) {
    return null;
  }

  let soma = 0;
  validas.forEach(function (n) {
    soma = soma + n;
  });

  return soma / validas.length;
}

// Soma faltas
function somarFaltas(listaFaltas) {
  if (!Array.isArray(listaFaltas)) return 0;
  let total = 0;
  listaFaltas.forEach(function (f) {
    const num = Number(f);
    if (!isNaN(num)) total += num;
  });
  return total;
}

// Define situação
function definirSituacao(media) {
  if (media === null) {
    return "Nota ainda não disponível";
  }
  if (media >= MEDIA_MINIMA) {
    return "Bom desempenho";
  }
  return "Atenção";
}

function classeSituacao(situacao) {
  if (situacao === "Bom desempenho") return "bom";
  if (situacao === "Atenção") return "atencao";
  return "sem-nota";
}

/* ---------------------------------------------------------
   RENDERIZAÇÃO DA TABELA E CARDS
   --------------------------------------------------------- */

function montarTabela() {
  const corpo = document.getElementById("corpoTabela");
  corpo.innerHTML = "";

  disciplinas.forEach(function (d) {
    const n1 = normalizarNota(d.tri1);
    const n2 = normalizarNota(d.tri2);
    const n3 = normalizarNota(d.tri3);

    const media = calcularMedia([n1, n2, n3]);
    const faltas = somarFaltas(d.faltas);
    const situacao = definirSituacao(media);

    const linha = document.createElement("tr");

    const tdNome = document.createElement("td");
    tdNome.textContent = d.disciplina;

    const td1 = document.createElement("td");
    td1.textContent = n1 !== null ? formatarNota(n1) : "Ainda não lançada";

    const td2 = document.createElement("td");
    td2.textContent = n2 !== null ? formatarNota(n2) : "Ainda não lançada";

    const td3 = document.createElement("td");
    td3.textContent = n3 !== null ? formatarNota(n3) : "Ainda não lançada";

    const tdMedia = document.createElement("td");
    tdMedia.textContent = media !== null ? formatarNota(media) : "—";

    const tdFaltas = document.createElement("td");
    tdFaltas.textContent = faltas;

    const tdSituacao = document.createElement("td");
    const spanSit = document.createElement("span");
    spanSit.className = "situacao " + classeSituacao(situacao);
    spanSit.textContent = situacao;
    tdSituacao.appendChild(spanSit);

    linha.appendChild(tdNome);
    linha.appendChild(td1);
    linha.appendChild(td2);
    linha.appendChild(td3);
    linha.appendChild(tdMedia);
    linha.appendChild(tdFaltas);
    linha.appendChild(tdSituacao);

    corpo.appendChild(linha);
  });
}

function montarCards() {
  const area = document.getElementById("cardsResumo");
  area.innerHTML = "";

  let somaMedias = 0;
  let totalMedias = 0;
  let totalFaltas = 0;
  let bons = 0;
  let atencao = 0;

  disciplinas.forEach(function (d) {
    const n1 = normalizarNota(d.tri1);
    const n2 = normalizarNota(d.tri2);
    const n3 = normalizarNota(d.tri3);

    const media = calcularMedia([n1, n2, n3]);
    const faltas = somarFaltas(d.faltas);

    totalFaltas += faltas;

    if (media !== null) {
      somaMedias += media;
      totalMedias += 1;

      if (media >= MEDIA_MINIMA) {
        bons += 1;
      } else {
        atencao += 1;
      }
    }
  });

  const mediaGeral = totalMedias > 0 ? somaMedias / totalMedias : null;

  function criarCard(titulo, valor, descricao, cor) {
    const card = document.createElement("div");
    card.className = "card " + (cor || "");

    const h3 = document.createElement("h3");
    h3.textContent = titulo;

    const pValor = document.createElement("p");
    pValor.className = "valor";
    pValor.textContent = valor;

    const pDesc = document.createElement("p");
    pDesc.className = "descricao";
    pDesc.textContent = descricao;

    card.appendChild(h3);
    card.appendChild(pValor);
    card.appendChild(pDesc);

    area.appendChild(card);
  }

  criarCard("Média geral", mediaGeral !== null ? formatarNota(mediaGeral) : "—", "Média das disciplinas com nota", "");
  criarCard("Total de faltas", totalFaltas, "Soma das faltas de todos os trimestres", "cinza");
  criarCard("Bom desempenho", bons, "Disciplinas com média ≥ 6,0", "verde");
  criarCard("Precisam de atenção", atencao, "Disciplinas com média < 6,0", "amarelo");
  criarCard("Frequência", FREQUENCIA_DEMONSTRATIVA + "%", "Frequência adequada (demonstrativa)", "cinza");
}

/* ---------------------------------------------------------
   INTEGRAÇÃO COM A API (ABRIR / SALVAR)
   --------------------------------------------------------- */

async function abrirBoletim(pin) {
  const msgLogin = document.getElementById("mensagemLogin");
  msgLogin.className = "mensagem-status info";
  msgLogin.textContent = "Conectando...";

  try {
    const resposta = await fetch(CONFIG_ALUNO.apiUrl + "/api/v1/boletins/abrir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        turma: CONFIG_ALUNO.turma,
        numero_chamada: CONFIG_ALUNO.numeroChamada,
        pin: pin
      })
    });

    if (resposta.status === 401) {
      msgLogin.className = "mensagem-status erro";
      msgLogin.textContent = "Turma, chamada ou PIN inválidos.";
      return;
    }

    if (resposta.status === 429) {
      msgLogin.className = "mensagem-status erro";
      msgLogin.textContent = "Muitas tentativas. Aguarde um minuto e tente novamente.";
      return;
    }

    if (!resposta.ok) {
      msgLogin.className = "mensagem-status erro";
      msgLogin.textContent = "Não foi possível conectar ao servidor. Tente novamente.";
      return;
    }

    const json = await resposta.json();

    // Regra: DADOS DA API > DADOS LOCAIS
    if (json.dados && Array.isArray(json.dados.disciplinas) && json.dados.disciplinas.length > 0) {
      disciplinas = json.dados.disciplinas;
    }

    // Sucesso no Login
    pinSessao = pin;
    document.getElementById("campoPin").value = "";
    document.getElementById("areaLogin").style.display = "none";
    document.getElementById("conteudoBoletim").style.display = "block";

    montarCards();
    montarTabela();
  } catch (erro) {
    msgLogin.className = "mensagem-status erro";
    msgLogin.textContent = "Não foi possível conectar ao servidor. Tente novamente.";
  }
}

/* ---------------------------------------------------------
   EDIÇÃO E VALIDAÇÃO DE NOTAS E FALTAS
   --------------------------------------------------------- */

function validarNotaInput(valorStr) {
  const str = valorStr.trim();
  if (str === "") return { valido: true, valor: null };

  const normalizadaStr = str.replace(",", ".");
  if (!/^\d+(\.\d+)?$/.test(normalizadaStr)) {
    return { valido: false };
  }

  const num = parseFloat(normalizadaStr);
  if (isNaN(num) || num < 0 || num > 10) {
    return { valido: false };
  }

  return { valido: true, valor: num };
}

function validarFaltaInput(valorStr) {
  const str = valorStr.trim();
  if (str === "") return { valido: false };

  if (!/^\d+$/.test(str)) {
    return { valido: false };
  }

  const num = parseInt(str, 10);
  if (isNaN(num) || num < 0) {
    return { valido: false };
  }

  return { valido: true, valor: num };
}

function abrirEdicao() {
  const corpo = document.getElementById("corpoTabelaEdicao");
  corpo.innerHTML = "";

  disciplinas.forEach(function (d, idx) {
    const linha = document.createElement("tr");

    const tdNome = document.createElement("td");
    tdNome.textContent = d.disciplina;

    const n1 = normalizarNota(d.tri1);
    const n2 = normalizarNota(d.tri2);
    const n3 = normalizarNota(d.tri3);

    const f1 = Array.isArray(d.faltas) ? d.faltas[0] : 0;
    const f2 = Array.isArray(d.faltas) ? d.faltas[1] : 0;
    const f3 = Array.isArray(d.faltas) ? d.faltas[2] : 0;

    linha.innerHTML =
      "<td>" + d.disciplina + "</td>" +
      "<td><input type='text' id='edit-n1-" + idx + "' value='" + (n1 !== null ? n1 : "") + "' /></td>" +
      "<td><input type='text' id='edit-n2-" + idx + "' value='" + (n2 !== null ? n2 : "") + "' /></td>" +
      "<td><input type='text' id='edit-n3-" + idx + "' value='" + (n3 !== null ? n3 : "") + "' /></td>" +
      "<td><input type='text' id='edit-f1-" + idx + "' value='" + (f1 !== undefined ? f1 : 0) + "' /></td>" +
      "<td><input type='text' id='edit-f2-" + idx + "' value='" + (f2 !== undefined ? f2 : 0) + "' /></td>" +
      "<td><input type='text' id='edit-f3-" + idx + "' value='" + (f3 !== undefined ? f3 : 0) + "' /></td>";

    corpo.appendChild(linha);
  });

  document.getElementById("mensagemEdicao").textContent = "";
  document.getElementById("areaEdicao").style.display = "block";
}

async function salvarEdicao() {
  const msgEdicao = document.getElementById("mensagemEdicao");
  msgEdicao.className = "mensagem-status info";
  msgEdicao.textContent = "Validando dados...";

  let temErro = false;
  const novasDisciplinas = [];

  // Remove marcação de erros anteriores
  document.querySelectorAll(".tabela-edicao input").forEach(function (inp) {
    inp.classList.remove("campo-invalido");
  });

  for (let i = 0; i < disciplinas.length; i++) {
    const inputN1 = document.getElementById("edit-n1-" + i);
    const inputN2 = document.getElementById("edit-n2-" + i);
    const inputN3 = document.getElementById("edit-n3-" + i);

    const inputF1 = document.getElementById("edit-f1-" + i);
    const inputF2 = document.getElementById("edit-f2-" + i);
    const inputF3 = document.getElementById("edit-f3-" + i);

    const resN1 = validarNotaInput(inputN1.value);
    const resN2 = validarNotaInput(inputN2.value);
    const resN3 = validarNotaInput(inputN3.value);

    const resF1 = validarFaltaInput(inputF1.value);
    const resF2 = validarFaltaInput(inputF2.value);
    const resF3 = validarFaltaInput(inputF3.value);

    if (!resN1.valido) { inputN1.classList.add("campo-invalido"); temErro = true; }
    if (!resN2.valido) { inputN2.classList.add("campo-invalido"); temErro = true; }
    if (!resN3.valido) { inputN3.classList.add("campo-invalido"); temErro = true; }

    if (!resF1.valido) { inputF1.classList.add("campo-invalido"); temErro = true; }
    if (!resF2.valido) { inputF2.classList.add("campo-invalido"); temErro = true; }
    if (!resF3.valido) { inputF3.classList.add("campo-invalido"); temErro = true; }

    if (!temErro) {
      novasDisciplinas.push({
        disciplina: disciplinas[i].disciplina,
        tri1: resN1.valor,
        tri2: resN2.valor,
        tri3: resN3.valor,
        faltas: [resF1.valor, resF2.valor, resF3.valor]
      });
    }
  }

  if (temErro) {
    msgEdicao.className = "mensagem-status erro";
    msgEdicao.textContent = "Por favor, corrija os campos destacados em vermelho. Notas devem ser de 0 a 10 (ou vazias) e faltas devem ser inteiros ≥ 0.";
    return;
  }

  msgEdicao.className = "mensagem-status info";
  msgEdicao.textContent = "Salvando...";

  try {
    const resposta = await fetch(CONFIG_ALUNO.apiUrl + "/api/v1/boletins/salvar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        turma: CONFIG_ALUNO.turma,
        numero_chamada: CONFIG_ALUNO.numeroChamada,
        pin: pinSessao,
        dados: {
          disciplinas: novasDisciplinas
        }
      })
    });

    if (!resposta.ok) {
      msgEdicao.className = "mensagem-status erro";
      msgEdicao.textContent = "Erro ao salvar as alterações no servidor. Tente novamente.";
      return;
    }

    // Sucesso
    disciplinas = novasDisciplinas;
    msgEdicao.className = "mensagem-status sucesso";
    msgEdicao.textContent = "Dados salvos com sucesso.";

    montarCards();
    montarTabela();

    setTimeout(function () {
      document.getElementById("areaEdicao").style.display = "none";
      msgEdicao.textContent = "";
    }, 1500);

  } catch (e) {
    msgEdicao.className = "mensagem-status erro";
    msgEdicao.textContent = "Não foi possível conectar ao servidor para salvar.";
  }
}

/* ---------------------------------------------------------
   INICIALIZAÇÃO E EVENTOS
   --------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  const formLogin = document.getElementById("formLogin");
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    const pin = document.getElementById("campoPin").value;
    if (pin) {
      abrirBoletim(pin);
    }
  });

  document.getElementById("btnAlterarDados").addEventListener("click", abrirEdicao);
  document.getElementById("btnSalvar").addEventListener("click", salvarEdicao);
  document.getElementById("btnCancelar").addEventListener("click", function () {
    document.getElementById("areaEdicao").style.display = "none";
  });
});