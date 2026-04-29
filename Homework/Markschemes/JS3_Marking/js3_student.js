function q1() {
  let list = [];
  let ans;
  for (let i = 1; i <= 5; i++) {
    ans = prompt(`What is your ${i}th name?`);
    list.push(ans);
  }
  list.sort();
  return list;
}
// console.log(q1()); // Get_Five

function q2(list) {
  let sum = 0;
  for (let i of list) {
    sum += i;
  }
  return sum / list.length;
} //Average_mark

// console.log(q2([80, 85, 87, 86, 88, 90]));

function q3(list, thresh) {
  counter = 1;
  for (let i of list) {
    console.log(counter, i);
    if (i >= thresh) {
      return counter;
    }
    counter += 1;
  }
} //Warm_Temps
// console.log(q3([13, 15, 13, 18, 20, 18, 22], 20)); // returns 5
