import { PARSED_CONNECTIVES as formattedConnectives } from "./constants.js";

// Função principal que recebe a expressão lógica e retorna a tabela verdade
export default function call(input) {
  return buildTruthTable(reformatInput(input), input);
}

// Função que recebe a expressão lógica em forma de string e faz o processamento para que seja algo computável pelo proprio Javascript
function reformatInput(input) {
  let newInput = [];

  // Loop percorre por cada caracter do input e faz a substituição dos operadores da calculadora por operadores do Javascript
  // Essa primeira substituição se aplica para os operadores simples, ou seja, aqueles que basta trocar um operador por outro, sem maiores alterações no resto do input.
  // Exemplo: ~(AVB) = !(A||B)
  [...input].forEach((char, index) => {
    switch (char) {
      case "∼":
        parseNegative(newInput, index);
        break;
      case "∧":
        parseAnd(newInput, index);
        break;
      case "∨":
        parseOr(newInput, index);
        break;
      case "⊻":
        parseXor(newInput, index);
        break;
      default:
        newInput[index] = char;
    }
  });

  let initialParse = newInput.join("");

  // Os dois loops seguintes realizam a tradução dos operadores mais complexos, a condicional e a bicondicional.
  // Para esses operadores, é necessario re-escrever pelo menos parcialmente a expressão, então não são apenas simples substituições.
  // Ambos os loops funcionam da seguinte forma:
  // 1. Verifica se existe alguma instancia desse operador na expressão.
  // 2. Se sim, reescreve a expressão removendo a instancia em questão.
  // 3. Repete o processo até que não exista nenhuma instancia do operador na expressão.

  while (initialParse.indexOf("→") > 0) {
    initialParse = parseConditional(initialParse, initialParse.indexOf("→"));
  }

  while (initialParse.indexOf("↔") > 0) {
    initialParse = parseBiconditional(initialParse, initialParse.indexOf("↔"));
  }

  return initialParse;
}

///////
// Funções que realizam a tradução de operadores simples dentro da expressão
function parseNegative(input, index) {
  input[index] = "!";
}

function parseAnd(input, index) {
  input[index] = "&&";
}

function parseOr(input, index) {
  input[index] = "||";
}

function parseXor(input, index) {
  input[index] = "^";
}
///////


///////
// Funções que realizam a tradução de operadores mais complexos dentro da expressão.
// Funcionam da seguinte forma, partindo da posição do operador dentro da expressão:
// 1. Utiliza duas funções para capturar o lado esquerdo e direto da expressão com relação ao operador.
// 2. Com as sub-expressões definidas, aplica-se a formula de equivalencia do operador utilizando as sub-expressões.
// 3. Substitui na expressão original o trecho que continha o operador com a nova versão que se utiliza da respectiva formula de equivalencia.
// Exemplo: (AVB)→C = !(AVB)||B
function parseConditional(input, index) {
  let [leftSide, startingIndex] = fetchLeftSide(input, index);
  let [rightSide, endingIndex] = fetchRightSide(input, index);

  if (leftSide[0] == "(") leftSide = leftSide.substring(1);
  if (leftSide[leftSide.length - 1] == ")")
    leftSide = leftSide.substring(0, leftSide.length - 1);

  if (rightSide[0] == "(") rightSide = rightSide.substring(1);
  if (rightSide[rightSide.length - 1] == ")")
    rightSide = rightSide.substring(0, rightSide.length - 1);

  const newExpression = `(!(${leftSide})||(${rightSide}))`;

  return (
    input.substring(0, startingIndex) +
    newExpression +
    input.substring(endingIndex + 1)
  );
}

function parseBiconditional(input, index) {
  let [leftSide, startingIndex] = fetchLeftSide(input, index);
  let [rightSide, endingIndex] = fetchRightSide(input, index);

  if (leftSide[0] == "(") leftSide = leftSide.substring(1);
  if (leftSide[leftSide.length - 1] == ")")
    leftSide = leftSide.substring(0, leftSide.length - 1);

  if (rightSide[0] == "(") rightSide = rightSide.substring(1);
  if (rightSide[rightSide.length - 1] == ")")
    rightSide = rightSide.substring(0, rightSide.length - 1);

  const newExpression = `(!((${leftSide})^(${rightSide})))`;

  return (
    input.substring(0, startingIndex) +
    newExpression +
    input.substring(endingIndex + 1)
  );
}
///////


///////
// Funções que realizam a busca por partes da expressão lógica

// Função vai andar a esquerda da expressão até chegar ao inicio da expressão ou chegar a um ponto em que o segmento de parenteses atual termine.
// Isso é feito realizando uma contagem de parenteses, atribuindo -1 para cada parentese aberto e +1 para cada parentese fechado.
// Caso o contador fique negativo, significa que o segmento referente a expressão terminou, parando ai.
function fetchLeftSide(input, index) {
  let currentIndex = index;
  let parenthesesCount = 0;

  while (currentIndex > 0 && parenthesesCount >= 0) {
    currentIndex--;

    if (input[currentIndex] == "(") parenthesesCount--;
    if (input[currentIndex] == ")") parenthesesCount++;
  }

  return [input.slice(currentIndex, index), currentIndex];
}

// Função vai andar a direita da expressão até chegar ao fim da expressão ou chegar a um ponto em que o segmento de parenteses atual termine.
// Isso é feito realizando uma contagem de parenteses, atribuindo +1 para cada parentese aberto e -1 para cada parentese fechado.
// Caso o contador fique negativo, significa que o segmento referente a expressão terminou, parando ai.
function fetchRightSide(input, index) {
  let currentIndex = index;
  let parenthesesCount = 0;

  while (currentIndex < input.length && parenthesesCount >= 0) {
    currentIndex++;

    if (input[currentIndex] == "(") parenthesesCount++;
    if (input[currentIndex] == ")") parenthesesCount--;
  }

  return [input.slice(index + 1, currentIndex), currentIndex];
}
//////


// Função que realiza a construção do objeto que será utilizado na exibição da tabela verdade.
// Esse objeto é basicamente um objeto do Javascript onde as chaves são os valores separados por virgula e o valor é o resultado da expressão lógica para aquela linha.
function buildTruthTable(input, originalInput) {
  let inputWithoutConnectives = input;
  const truthTable = {};
  const readableTruthTable = {};

  formattedConnectives.forEach((cc) => {
    inputWithoutConnectives = inputWithoutConnectives.replaceAll(cc, "");
  });

  // Remove os conectivos e verifica quantas variaveis unicas existem na expressão.
  const uniqueVariables = [...new Set(inputWithoutConnectives.split(""))];

  // Adiciona a primeira linha da tabela verdade, é basicamente as diferentes variaveis e a expressão original
  // Exemplo: "A,B,C": "AVBVC"
  readableTruthTable[uniqueVariables] = originalInput;

  // Itera sobre todas as possiveis combinações de valores para as variaveis unicas.
  for (let i = 0; i < 2 ** uniqueVariables.length; i++) {
    // Transforma o numero do index em binario
    const currentValues = i.toString(2);
    let evaluatedInput = input;
    const currentInputValues = [];

    // Itera sobre cada variavel unica e atribui o valor de sua posição no binario atual na expressão logica.
    // Exemplo: "A,B,C": "AVBVC"
    // Se o binario atual for "101", então:
    // A = 1, B = 0, C = 1, = 1V0V1
    uniqueVariables.forEach((variable, index) => {
      const currentInput = currentValues.split("").reverse()[index] ?? "0";
      currentInputValues.push(currentInput);

      evaluatedInput = evaluatedInput.replaceAll(variable, currentInput);
    });

    // Avalia a expressão logica com os valores atuais e armazena no objeto que será retornado
    truthTable[currentInputValues] = eval(evaluatedInput);

    // Transforma os valores da tabela verdade para o formato legivel
    // De 1s e 0s para V e F
    Object.keys(truthTable).forEach((key) => {
      const val = truthTable[key];

      let keyString = key;
      keyString = keyString.replaceAll("0", "F");
      keyString = keyString.replaceAll("false", "F");
      keyString = keyString.replaceAll("1", "V");
      keyString = keyString.replaceAll("true", "V");

      let valString = val.toString();
      valString = valString.replaceAll("0", "F");
      valString = valString.replaceAll("false", "F");
      valString = valString.replaceAll("1", "V");
      valString = valString.replaceAll("true", "V");

      readableTruthTable[keyString] = valString;
    });
  }

  return readableTruthTable;
}
