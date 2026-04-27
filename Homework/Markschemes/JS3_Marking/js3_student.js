function q1() {
  let array = [];
  for (i = 0; i < 5; i++) {
    array.push(prompt("Name"));
  }
  array.sort();
  alert(array);
} // Get_Five
//console.log( q1 () )

function q2(array) {
  let total = 0;
  for (let i of array) {
    total += i;
  }
  average = total / array.length;
  alert(average);
} //Average_mark
//console.log( q2(  [80, 85, 87, 86, 88, 90]  )   )

function q3(array, target) {
  let num = 1;
  for (let i of array) {
    if (i != target) {
      console.log(`${num} --> ${i}`);
      num += 1;
    } else {
      console.log(`${num} --> ${i}`);
      break;
    }
  }
  console.log(num);
} //Warm_Temps
//console.log(q3([13, 15, 13, 18, 20, 18, 22], 20)); // returns 5
