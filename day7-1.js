const input = [3,8,1001,8,10,8,105,1,0,0,21,46,55,68,89,110,191,272,353,434,99999,3,9,1002,9,3,9,1001,9,3,9,102,4,9,9,101,4,9,9,1002,9,5,9,4,9,99,3,9,102,3,9,9,4,9,99,3,9,1001,9,5,9,102,4,9,9,4,9,99,3,9,1001,9,5,9,1002,9,2,9,1001,9,5,9,1002,9,3,9,4,9,99,3,9,101,3,9,9,102,3,9,9,101,3,9,9,1002,9,4,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99];
const intCode = (phaseValue, inputValue) => {
  let outputSignal;
  let firstInput = true;
  for (let idx = 0; idx < input.length; idx++) {
    let cur = input[idx];
    let instruction = {};
    let curArr = cur
      .toString()
      .padStart(5, "0")
      .split("");
    instruction.opCode = Number(curArr[3] + curArr[4]);
    instruction.c = Number(curArr[2]);
    instruction.b = Number(curArr[1]);
    let param1 = instruction.c == 1 ? input[idx + 1] : input[input[idx + 1]];
    let param2 = instruction.b == 1 ? input[idx + 2] : input[input[idx + 2]];
    switch (instruction.opCode) {
      case 1:
        input[input[idx + 3]] = param1 + param2;
        idx += 3;
        break;
      case 2:
        input[input[idx + 3]] = param1 * param2;
        idx += 3;
        break;
      case 3:
        firstInput
          ? (input[input[idx + 1]] = phaseValue)
          : (input[input[idx + 1]] = inputValue);
        firstInput = false;
        idx += 1;
        break;
      case 4:
        outputSignal = input[input[idx + 1]];
        idx += 1;
        break;
      case 5:
        param1 != 0 ? (idx = param2 - 1) : (idx += 2);

        break;
      case 6:
        param1 == 0 ? (idx = param2 - 1) : (idx += 2);
        break;
      case 7:
        param1 < param2
          ? (input[input[idx + 3]] = 1)
          : (input[input[idx + 3]] = 0);
        idx += 3;
        break;
      case 8:
        param1 == param2
          ? (input[input[idx + 3]] = 1)
          : (input[input[idx + 3]] = 0);
        idx += 3;
        break;
      case 99:
        idx = input.length;
        break;
    }
  }
  return outputSignal;
};
const permutator = inputArr => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};
let phaseSettings = permutator([0, 1, 2, 3, 4]);

const maxOutput = phaseSettings
    .map(phaseSet =>
      phaseSet.reduce(
        (finalOutput, currentPhase) => intCode(currentPhase, finalOutput),
        0
      )
    )
    .sort((a, b) => b - a)[0];
console.log(maxOutput);