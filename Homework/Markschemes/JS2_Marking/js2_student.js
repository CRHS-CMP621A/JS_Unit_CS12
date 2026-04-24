function q1() {
  /* Create a grading program that prompts a student to enter their grade on an assignment. Depending on the grade, the console should display a message according to the grade boundaries.*/
  let grade = parseFloat(prompt("Q1: Enter the first grade:"));
  if (90 <= grade && grade <= 100) {
    greeting = "Excellent!";
  } else if (80 <= grade && grade <= 89) {
    greeting = "Great work!";
  } else if (70 <= grade && grade <= 79) {
    greeting = "welldone!";
  }

  if (60 <= grade && grade <= 69) {
    greeting = "pass!";
  } else {
    greeting = "fail!";
  }
  console.log(greeting);
} // Grade_Boundaries

function q2() {
  let modelNumber = parseInt(prompt("Enter your car's model number:"));

  if (
    modelNumber === 119 ||
    modelNumber === 179 ||
    (modelNumber >= 189 && modelNumber <= 203) ||
    (modelNumber >= 235 && modelNumber <= 252)
  ) {
    alert("Recalled");
  } else {
    alert("Not recalled");
  }
} //Recall_Number

function q3() {
  let employeeName = prompt("Enter employee name:");
  let rateOfPay = parseFloat(prompt("Enter hourly rate of pay:"));
  let hoursWorked = parseFloat(prompt("Enter number of hours worked:"));

  let totalPay = 0;

  if (hoursWorked > 40) {
    // Overtime
    let regularPay = 40 * rateOfPay;
    let overtimeHours = hoursWorked - 40;
    let overtimePay = overtimeHours * (rateOfPay * 1.5);
    totalPay = regularPay + overtimePay;
  } else {
    // normal
    totalPay = hoursWorked * rateOfPay;
  }
}
