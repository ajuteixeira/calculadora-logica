import { NEGATIVE as negative, CONNECTIVES as connectives } from "./constants.js";

export default function validateInput(input) {
  return validInput(input.replaceAll(" ", ""));
}

function validInput(input) {
  return validParentheses(input) && validConnectives(input);
}

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

function validConnectives(input) {
  let valid = true;
  [...input].forEach((char, index) => {
    if (!valid) return false;

    if (!connectives.includes(char) && char != "(" && char != ")") {
      valid = validVariable(input, index);
    } else if (connectives.includes(char)) {
      if (char == negative) {
        valid = validNegative(input, index);
      } else {
        valid = validConnective(input, index);
      }
    }
  });
  return valid;
}

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

function validNegative(input, index) {
  const rightValid = ![")", ...connectives].includes(input[index + 1]);
  const leftValid = index == 0 || input[index - 1] == "(";

  return rightValid && leftValid;
}

function validConnective(input, index) {
  const rightValid =
    input.length != index + 1 &&
    ![")", ...connectives].includes(input[index + 1]);
  const leftValid =
    index != 0 || !["(", ...connectives].includes(input[index - 1]);

  return rightValid && leftValid;
}
