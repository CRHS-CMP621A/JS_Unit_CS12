/*For each function, complete the question. Make sure to notice the OUTPUT requirement.
  !!! You will CALL your functions in the prompt.  !!!  */

function q1() {
  /* Create a grading program that prompts a student to enter their grade on an assignment. Depending on the grade, the console should display a message according to the grade boundaries.*/
  let grade = Number(prompt("What is your grade?"));
  const display = [
    ["Fail", 60],
    ["Pass", 70],
    ["Well Done!", 80],
    ["Great work!", 90],
    ["Excellent!", 101],
  ];

  for (const arr of display) {
    if (grade < arr[1]) {
      alert(arr[0]);
      break;
    }
  }
} // Grade_Boundaries

function q2() {
  /* There have been some safety recalls on a number of cars at your dealership.
  Cars with model numbers 119, 179, 189 through 203, and 235-252 are all found to be defective. Create a program to enable the user to check the model number. Prompt for model number, print “Recalled” or “Not recalled”.*/
  const num = Number(prompt("What is your car number?")) || -1;
  let recalled = false;

  if (num == 119) recalled = true;
  if (num == 179) recalled = true;
  if (num >= 189 && num <= 203) recalled = true;
  if (num >= 235 && num <= 252) recalled = true;

  if (recalled) {
    alert("Recalled.");
  } else if (num == -1) {
    alert("Canceled");
  } else {
    alert("Not recalled.");
  }
} //Recall_Number

function q3() {
  /* Create a wages program for your employees to calculate weekly pay.
Prompt for the employee name, rate of pay, and number of hours.
If the employee works more than 40 hours, they will be paid an overtime rate of 1.5 x normal hourly rate for any hours over 40.  Print the total pay in a nice sentence.*/

  const name = prompt("Employee name?");
  const rate = Number(prompt("Rate of pay?"));
  const hours = Number(prompt("Hours worked?"));

  const normalHrs = Math.min(hours, 40);
  const otHrs = Math.max(hours - 40, 0);

  const total = normalHrs * rate + otHrs * rate * 1.5;

  alert(`$${total}`);
} //Weekly_Pay
