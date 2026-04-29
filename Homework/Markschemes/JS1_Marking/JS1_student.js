function q1() {
  /* Create a program that will prompt the user to enter 2 numbers.
        In the console: Your program  will then display these 2 numbers
        and the sum of these 2 numbers.*/
  let num1 = prompt("Enter your first number");
  let num2 = prompt("Enter your second number");
  let result = num1 + num2;
  console.log(result);
} //Sum of Two

function q2() {
  /* Write a program that will prompt the user to input their first name,
        last name and year they were born.
        In the console: The program will then print the person’s full name and their age.*/
  let name1 = prompt("Enter your First Name");
  let name2 = prompt("Enter your Last Name");
  let age = Number(prompt("Enter the day you were born"));
  let year = 2026 - age;
  let result = name1 + " " + name2 + " " + year;
  console.log(result + " " + "is years old");
} //Name and Age

function q3() {
  /* Create a program that will prompt a user to enter the radius of a circle.
        In the console: Your program will then display the circumference of that circle and it’s area.*/
  let radius = Number(prompt("Enter the raidus of a circle"));
  let π = 3.14;
  let circumference = 2 * π * radius;
  let area = π * radius * radius;
  console.log(`circumference ${circumference} and area ${area} respectively`);
} //Circle Circumference and Area

function q4() {
  /* Create a program for calculating price of a food order.
        User should enter number of fries orders and drinks.
        In the console: Program will show food ordered and total cost, including tax.*/
  let fries = Number(prompt("Enter the number of fries you want"));
  let drinks = Number(prompt("Enter the number of drinks you want"));
  let friesPrice = 2.5;
  let drinksPrice = 1.5;
  let tax = 0.15;
  let totalCost = (fries * friesPrice + drinks * drinksPrice) * (1 + tax);
  console.log(
    `You ordered ${fries} fries and ${drinks} drinks. Your total cost is ${totalCost}`,
  );
} //Food Order
