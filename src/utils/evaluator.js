const negative = "∼";
const connectives = [negative, "∧", "∨", "→", "↔", "⊻"];

export default function call(input) {
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
        // case "→":
        //   parseConditional(input, index);
        //   break;
        // case "↔":
        //   parseBiconditional(input, index);
        //   break;
        // case "⊻":
        //   parseXor(input, index);
        //   break;
      }
    }
  });
  console.log(newInput);
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
