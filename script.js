/* =========================================================
   BOLETIM DIGITAL — 9º ANO
   Dados fictícios, apenas para demonstração.
   ========================================================= */

/* ---------------------------------------------------------
   VARIÁVEL: é uma "caixinha" onde guardamos um valor.
   ARRAY: é uma lista de valores, entre colchetes [ ].
   OBJETO: é um conjunto de informações com nomes, entre { }.
   --------------------------------------------------------- */

// Array de objetos: cada objeto é uma disciplina.
const disciplinas = [
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

// Frequência geral FICTÍCIA, apenas para demonstração nesta primeira versão.
// No futuro, esse valor será tratado de outra forma (não vem das faltas).
const FREQUENCIA_DEMONSTRATIVA = 92;

/* ---------------------------------------------------------
   FUNÇÃO: é um bloco de código que faz uma tarefa e pode
   ser chamado várias vezes pelo nome.
   --------------------------------------------------------- */

// Normaliza a nota para a escala 0 a 10.
// Retorna null quando a nota não existe ou é inválida.
function normalizarNota(valor) {
  // Vazio, null ou undefined = nota ainda não lançada
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }

  // Se for texto, troca vírgula por ponto para poder converter em número
  let numero;
  if (typeof valor === "string") {
    numero = parseFloat(valor.replace(",", "."));
  } else {
    numero = Number(valor);
  }

  // Se não virou um número válido, tratamos como inválido
  if (isNaN(numero)) {
    return null;
  }

  // Valores entre 0 e 10 permanecem iguais
  if (numero >= 0 && numero <= 10) {
    return numero;
  }

  // Valores maiores que 10 e até 100 são divididos por 10
  // Ex.: 89 -> 8.9 | 82 -> 8.2 | 100 -> 10
  if (numero > 10 && numero <= 100) {
    return numero / 10;
  }

  // Valores fora das regras são inválidos
  return null;
}

// Formata o número para exibir com 1 casa decimal e vírgula (padrão brasileiro)
function formatarNota(numero) {
  if (numero === null) {
    return "—";
  }
  return numero.toFixed(1).replace(".", ",");
}

// Calcula a média usando SOMENTE as notas disponíveis (não transforma ausente em zero).
function calcularMedia(notas) {
  // Filtra apenas as notas válidas (não nulas)
  const validas = notas.filter(function (n) {
    return n !== null;
  });

  // Se não há nenhuma nota válida, não existe média
  if (validas.length === 0) {
    return null;
  }

  // Soma todas as notas válidas
  let soma = 0;
  validas.forEach(function (n) {
    soma = soma + n;
  });

  // Divide pela quantidade de notas válidas
  return soma / validas.length;
}

// Soma as faltas dos trimestres
function somarFaltas(listaFaltas) {
  let total = 0;
  listaFaltas.forEach(function (f) {
    total = total + f;
  });
  return total;
}

// Define a situação da disciplina conforme a média
function definirSituacao(media) {
  // IF: verifica uma condição e escolhe um caminho
  if (media === null) {
    return "Nota ainda não disponível";
  }
  if (media >= MEDIA_MINIMA) {
    return "Bom desempenho";
  }
  return "Atenção";
}

// Devolve a classe CSS de acordo com a situação
function classeSituacao(situacao) {
  if (situacao === "Bom desempenho") return "bom";
  if (situacao === "Atenção") return "atencao";
  return "sem-nota";
}

/* ---------------------------------------------------------
   MONTAGEM DA TABELA
   --------------------------------------------------------- */

// forEach: percorre cada item do array, um por um.
function montarTabela() {
  // DOM: é a representação da página no JavaScript.
  // Aqui pegamos o <tbody id="corpoTabela"> para inserir as linhas.
  const corpo = document.getElementById("corpoTabela");

  // Limpa o conteúdo antes de montar
  corpo.innerHTML = "";

  disciplinas.forEach(function (d) {
    // Normaliza as três notas
    const n1 = normalizarNota(d.tri1);
    const n2 = normalizarNota(d.tri2);
    const n3 = normalizarNota(d.tri3);

    // Calcula a média apenas com as notas disponíveis
    const media = calcularMedia([n1, n2, n3]);

    // Soma as faltas
    const faltas = somarFaltas(d.faltas);

    // Define a situação
    const situacao = definirSituacao(media);

    // Cria uma linha da tabela
    const linha = document.createElement("tr");

    linha.innerHTML =
      "<td>" + d.disciplina + "</td>" +
      "<td>" + (n1 !== null ? formatarNota(n1) : "Ainda não lançada") + "</td>" +
      "<td>" + (n2 !== null ? formatarNota(n2) : "Ainda não lançada") + "</td>" +
      "<td>" + (n3 !== null ? formatarNota(n3) : "Ainda não lançada") + "</td>" +
      "<td>" + (media !== null ? formatarNota(media) : "—") + "</td>" +
      "<td>" + faltas + "</td>" +
      "<td><span class='situacao " + classeSituacao(situacao) + "'>" + situacao + "</span></td>";

    corpo.appendChild(linha);
  });
}

/* ---------------------------------------------------------
   MONTAGEM DOS CARDS DE RESUMO
   --------------------------------------------------------- */

function montarCards() {
  const area = document.getElementById("cardsResumo");
  area.innerHTML = "";

  // Vamos acumular dados para os cards
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

    totalFaltas = totalFaltas + faltas;

    if (media !== null) {
      somaMedias = somaMedias + media;
      totalMedias = totalMedias + 1;

      if (media >= MEDIA_MINIMA) {
        bons = bons + 1;
      } else {
        atencao = atencao + 1;
      }
    }
  });

  // Média geral (apenas das disciplinas que já têm nota)
  const mediaGeral = totalMedias > 0 ? somaMedias / totalMedias : null;

  // Cria um card de forma reaproveitável
  function criarCard(titulo, valor, descricao, cor) {
    const card = document.createElement("div");
    card.className = "card " + (cor || "");
    card.innerHTML =
      "<h3>" + titulo + "</h3>" +
      "<p class='valor'>" + valor + "</p>" +
      "<p class='descricao'>" + descricao + "</p>";
    area.appendChild(card);
  }

  criarCard(
    "Média geral",
    mediaGeral !== null ? formatarNota(mediaGeral) : "—",
    "Média das disciplinas com nota",
    ""
  );

  criarCard(
    "Total de faltas",
    totalFaltas,
    "Soma das faltas de todos os trimestres",
    "cinza"
  );

  criarCard(
    "Bom desempenho",
    bons,
    "Disciplinas com média ≥ 6,0",
    "verde"
  );

  criarCard(
    "Precisam de atenção",
    atencao,
    "Disciplinas com média < 6,0",
    "amarelo"
  );

  criarCard(
    "Frequência",
    FREQUENCIA_DEMONSTRATIVA + "%",
    "Frequência adequada (demonstrativa)",
    "cinza"
  );
}

/* ---------------------------------------------------------
   INÍCIO
   Quando a página terminar de carregar, montamos tudo.
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  montarCards();
  montarTabela();
});