import { PARSED_CONNECTIVES as formattedConnectives } from "./constants.js";

export default function call(input) {
  return buildTruthTable(reformatInput(input), input);
}

function reformatInput(input) {
  let newInput = [];

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

  console.log(initialParse);

  while (initialParse.indexOf("→") > 0) {
    initialParse = parseConditional(initialParse, initialParse.indexOf("→"));
    console.log(initialParse);
  }

  while (initialParse.indexOf("↔") > 0) {
    initialParse = parseBiconditional(initialParse, initialParse.indexOf("↔"));
    console.log(initialParse);
  }

  return initialParse;
}

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

function buildTruthTable(input, originalInput) {
  let inputWithoutConnectives = input;
  const truthTable = {};
  const readableTruthTable = {};

  formattedConnectives.forEach((cc) => {
    inputWithoutConnectives = inputWithoutConnectives.replaceAll(cc, "");
  });

  const uniqueVariables = [...new Set(inputWithoutConnectives.split(""))];

  readableTruthTable[uniqueVariables] = originalInput;

  for (let i = 0; i < 2 ** uniqueVariables.length; i++) {
    const currentValues = i.toString(2);
    let evaluatedInput = input;
    const currentInputValues = [];

    uniqueVariables.forEach((variable, index) => {
      const currentInput = currentValues.split("").reverse()[index] ?? "0";
      currentInputValues.push(currentInput);

      evaluatedInput = evaluatedInput.replaceAll(variable, currentInput);
    });

    truthTable[currentInputValues] = eval(evaluatedInput);

    Object.keys(truthTable).forEach((key) => {
      const val = truthTable[key];

      let keyString = key;
      keyString = keyString.replaceAll("0", "F");
      keyString = keyString.replaceAll("false", "F");
      keyString = keyString.replaceAll("1", "T");
      keyString = keyString.replaceAll("true", "T");

      let valString = val.toString();
      valString = valString.replaceAll("0", "F");
      valString = valString.replaceAll("false", "F");
      valString = valString.replaceAll("1", "T");
      valString = valString.replaceAll("true", "T");

      readableTruthTable[keyString] = valString;
    });
  }

  return readableTruthTable;
}
