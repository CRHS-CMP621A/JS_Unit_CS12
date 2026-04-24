/*For each function, complete the question. Make sure to notice the OUTPUT requirement.
  !!! You will CALL your functions in the console.  !!!  */

function ex() {
  /* Create a script that will PROMPT the user for two numbers
   Then it will add them together and place it in the console.   */
  let num1 = prompt("What is your first number?");
  let num2 = prompt("What is your second number?");
  let result = num1 + num2;
  console.log(result);
  // Run your function by typing ex() in the console //
  // You can use the ex() function as the start of your solution to q1() //
} //Example Script

function q1() {
  /* Create a program that will prompt the user to enter 2 numbers.
        In the console: Your program  will then display these 2 numbers
        and the sum of these 2 numbers.*/

  let num1 = prompt("What is your first number?");
  let num2 = prompt("What is your second number?");

  let sum = Number(num1) + Number(num2);

  console.log(`The sum is ${sum}.`);
} //Sum of Two

function q2() {
  /* Write a program that will prompt the user to input their first name,
        last name and year they were born.
        In the console: The program will then print the person’s full name and their age.*/

  let fname = prompt("What is your first name?");
  let lname = prompt("What is your last name?");
  let year = prompt("What year were u born?");

  let fullname = fname + " " + lname;
  let date = Number(year);
  let now = 2026;
  let time = now - date;

  console.log(
    `Your full name is ${fullname}, and you are roughly ${time} years old.`,
  );
} //Name and Age

function q3() {
  /* Create a program that will prompt a user to enter the radius of a circle.
        In the console: Your program will then display the circumference of that circle and it’s area.*/

  let rad = Number(prompt("What is the radius of the circle?"));

  let circ = 2 * rad * Math.PI;

  let area = Math.PI * rad ** 2;

  console.log(
    `The area is ${area.toFixed(2)} and the circumference is ${circ.toFixed(
      2,
    )}.`,
  );
} //Circle Circumference and Area

function q4() {
  /* Create a program for calculating price of a food order.
        User should enter number of fries orders and drinks.
        In the console: Program will show food ordered and total cost, including tax.*/

  let fries = Number(prompt("How many $4.00 fries do you want?"));
  let pops = Number(prompt("How many $1.00 pops would you like?"));

  console.log("Order: " + fries + " fries and " + pops + " pop.");

  let ftotal = fries * 4;
  let ptotal = pops;

  let stotal = ftotal + ptotal;
  let taxtotal = stotal * 1.15;

  console.log(
    `Subtotal: $${ftotal.toFixed(2)} + $${ptotal.toFixed(2)} $${stotal.toFixed(
      2,
    )} + tax = $${taxtotal.toFixed(2)}`,
  );
} //Food Order
