import { NEGATIVE as negative, CONNECTIVES as connectives } from "./constants.js";

// Função que valida a expressão de entrada do usuário, removendo espaços e validando a presença de parênteses e conectivos.
export default function validateInput(input) {
  return validInput(input.replaceAll(" ", ""));
}

// Para verificar se a expressão é valida, são verificadao se dois aspectos são validos:
// 1. Se o uso de parenteses na expressão esta valido
// 2. Se o uso de conectivos e variaveis na expressão esta valido
function validInput(input) {
  return validParentheses(input) && validConnectives(input);
}

// Função verifica se o uso de parenteses na expressão é valido.
// Essa verificação se faz checando se para cada parentese aberto, existe um fechamento. Isso é feito atraves de um contador que é incrementado para cada parentese aberto e decrementado para cada parentese fechado.
// Se em algum momento o contador ficar negativo, significa que existe um parentese que não foi aberto, o que é invalido.
// E, ao final, se o contador não estiver em 0, significa que existe um parentese que não foi fechado, o que também é invalido.
function validParentheses(input) {
  let openParentheses = 0;
  [...input].forEach((char) => {
    if (openParentheses < 0) return false;

    if (char == "(") {
      openParentheses++;
    } else if (char == ")") {
      openParentheses--;
    }
  });
  return openParentheses == 0;
}

// Função verifica se o uso de conectivos e variaveis na expressão é valido.
// Se em algum momento for detectado que a expressão já não é valida, a função retorna false.
function validConnectives(input) {
  let valid = true;
  [...input].forEach((char, index) => {
    if (!valid) return false;

    // Se o caracter não é um conectivo ou um parentese, a função validVariable é chamada para verificar se a variavel é valida.
    if (!connectives.includes(char) && char != "(" && char != ")") {
      valid = validVariable(input, index);
    } else if (connectives.includes(char)) {
      // Se o caracter é o operador de negacao, a função validNegative é chamada para verificar se a negacao é valida.
      if (char == negative) {
        valid = validNegative(input, index);
      } else {
        // Por fim, caso o caracter não se aplique a nenhum dos casos anteriores, a função validConnective é chamada para verificar se o conectivo é valido.
        valid = validConnective(input, index);
      }
    }
  });
  return valid;
}

// Verifica se a variavel é valida checando os operadores ao seu lado esquerdo e direito.
// Para a direita, a variavel é valida se:
//   1. Ela é a ultima variavel da expressao, ou seja, não há nada a sua direita
//   2. Se a sua direita é um parentese de fechamento.
//   3. Se o caracter é o primeiro da expressao e a sua direita é qualquer um dos conectivos definidos.
//   4. Se o caracter a sua esquerda é um parentese de abertura e a sua direita é qualquer um dos conectivos definidos.
//
// De forma analoga, para a esquerda, a variavel é valida se:
//   1. Ela é a primeira variavel da expressao, ou seja, não há nada a sua esquerda
//   2. Se a sua esquerda é um parentese de abertura.
//   3. Se o caracter é o último da expressao e a sua esquerda é qualquer um dos conectivos definidos.
//   4. Se o caracter a sua direita é um parentese de fechamento e a sua esquerda é qualquer um dos conectivos definidos.
function validVariable(input, index) {
  const rightValid =
    input.length == index + 1 ||
    input[index + 1] == ")" ||
    (index == 0 && [...connectives].includes(input[index + 1])) ||
    (input[index - 1] == "(" && [...connectives].includes(input[index + 1]));
  const leftValid =
    index == 0 ||
    input[index - 1] == "(" ||
    (input.length == index + 1 &&
      [...connectives].includes(input[index - 1])) ||
    (input[index + 1] == ")" && [...connectives].includes(input[index - 1]));

  return rightValid && leftValid;
}

// Verifica se o uso da negação atual na expressão esta valido.
// Para isso, a função checa se:
//   1. Para a sua direita ser valida, é preciso que o caracter não seja um parentese de fechamento ou um conectivo.
//   2. Para a sua esquerda ser valida, é preciso que a negação seja o primeiro caracter da expressão ou que a sua esquerda seja um parentese abrindo
function validNegative(input, index) {
  const rightValid = ![")", ...connectives].includes(input[index + 1]);
  const leftValid = index == 0 || input[index - 1] == "(";

  return rightValid && leftValid;
}

// Verifica se o uso de um conectivo atual na expressão esta valido.
// Para isso, a função checa se:
//   1. Para a sua direita ser valida, é preciso que o conectivo não seja o ultimo caracter da expressao e que o proximo caracter não seja um parentese de fechamento ou um conectivo.
//   2. Para a sua esquerda ser valida, é preciso que o conectivo não seja o primeiro caracter da expressao e que o caracter anterior não seja um parentese abrindo ou um conectivo.
function validConnective(input, index) {
  const rightValid =
    input.length != index + 1 &&
    ![")", ...connectives].includes(input[index + 1]);
  const leftValid =
    index != 0 || !["(", ...connectives].includes(input[index - 1]);

  return rightValid && leftValid;
}
