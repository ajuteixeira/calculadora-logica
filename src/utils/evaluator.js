const negative = "∼";
const connectives = [negative, "∧", "∨", "→", "↔", "⊻"];
const formattedConnectives = ["(", ")", "!", "&&", "||", "^"];

export default function call(input) {
  return buildTruthTable(reformatInput(input), input);
}

function reformatInput(input) {
  let newInput = [];

  [...input].forEach((char, index) => {
    if (!connectives.includes(char)) {
      newInput[index] = char;
    } else {
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
          parseXor(input, index);
          break;
        // case "→":
        //   parseConditional(input, index);
        //   break;
        // case "↔":
        //   parseBiconditional(input, index);
        //   break;
      }
    }
  });

  return newInput.join("");
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
      keyString = keyString.replaceAll("1", "T");

      let valString = val.toString();
      valString = valString.replaceAll("0", "F");
      valString = valString.replaceAll("1", "T");

      readableTruthTable[keyString] = valString;
    });
  }

  return readableTruthTable;
}
