// 248345-746315
let passwords = 0;
for (let i = 248345; i <= 746315; i++) {
  let digit = i.toString().split('');
  let sorted = false;
  let doubleDigit = false;
  let sortedDigit = [...digit].sort((a, b) => a - b);
  sorted = digit.every((dig,i) => {
    return sortedDigit[i] == dig;
  });
  
  digit.forEach((curr, i, arr) => {
    if (curr == arr[i+1]) {
      doubleDigit = true;
    }
  });
  if (sorted && doubleDigit)
   {
    passwords++;
    console.log(digit);
  }
}
console.log(passwords);