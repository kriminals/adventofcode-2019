// 248345-746315
let passwords = 0;
for (let i = 248345; i <= 746315; i++) {
  let digit = i.toString().split('');
  let sorted = false;
  let doubleDigitOnly = false;
  let sortedDigit = [...digit].sort((a, b) => a - b);
  sorted = digit.every((dig, i) => {
    return sortedDigit[i] == dig;
  });
  let counts = {};
  digit.forEach((curr) => {
    counts[curr] = counts[curr] ? counts[curr] + 1 : 1;
  });
  doubleDigitOnly = Object.values(counts).includes(2);
  if (sorted && doubleDigitOnly) {
    passwords++;
  }
}
console.log(passwords);