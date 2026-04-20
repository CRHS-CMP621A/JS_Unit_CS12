## Chapter 5. Loops

Resources: https://education.launchcode.org/intro-to-professional-web-dev/chapters/loops/index.html

#### For loops
Basic syntax:

```javascript
for (initial expression; loop condition; update expression) {
  loop body
}
```

Example:

```javascript
for (let i = 0; i < 51; i++) {  // prints from 0 up to 50
  console.log(i);
}
```

#### Arrays and loops
Access array elements by index:

```javascript
let languages = ["JS", "Java", "C#", "Python"];
for (let i = 0; i < languages.length; i++) {
  console.log(languages[i]);
}
```

Access array elements by element (`for...of` loops):

The `for...of` loop does not give access to the index of the current element, just its value, but in most cases that is enough.

```javascript
let fruits = ["Apple", "Orange", "Plum"];

// iterates over array elements
for (let fruit of fruits) {
  alert(fruit);
}
```

---

<h4 style="background-color: yellow;"> Task 5.1: For Loop Practice </h4>

Source: https://education.launchcode.org/intro-to-professional-web-dev/chapters/loops/exercises.html

Starter Code: [T5A For Loops.html](t5a_for_loops/T5A_For_Loops.html) and  [T5A For Loops.js](t5a_for_loops/T5A_For_Loops.js) 
Construct for loops that accomplish the following tasks.

Exercise 1:
1. Print the numbers 0 - 20, one number per line.
2. Print only the odd values from 3 - 29, one number per line.
3. Print the even numbers 12 down to -14 in descending order, one number per line.
4. Print the numbers 50 down to 20 in descending order, but only if the numbers are multiples of 3. Code should work for starting and ending numbers other than 50 and 20.

Exercise 2:
1. Construct a for loop that sorts the array `[2, 3, 13, 18, -5, 38, -10, 11, 0, 104]` into two new arrays.
2. Define an empty `evens` array to hold the even numbers and an `odds` array for the odd numbers.
3. In the loop, determine if each number is even or odd, then put that number into `evens` or `odds`, as appropriate.
4. Print the arrays to confirm the results. Print `evens` first. Example: `console.log(evens);`

## While loops
Resources: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while

While loop basic syntax:

```javascript
while (condition) {
  statement
}
```

Example of while loop:

```javascript
let num = 0;
while (num <= 10) {
  alert(num);
  num++;
}
```

Get user input into an array using a while loop:

```javascript
let numList = []; // empty list
let num = Number(prompt('Give me a number. 0 to stop.'));

while (num !== 0) { // loop until user gives STOP condition
  numList.push(num); // put user input in list
  num = Number(prompt('Give me a number. 0 to stop.'));
}

console.log(numList);
```

#### Break
You can use the keyword `break` to break out of a loop.

<h4 style="background-color: yellow;"> Task 5.2: While Loop Launch Task </h4>

Source: https://education.launchcode.org/intro-to-professional-web-dev/chapters/loops/exercises.html

Starter Code: [T5B While Loops.html](t5b_while_loops/T5B_While_Loops.html) and  [T5B While Loops.js](t5b_while_loops/T5B_While_Loops.js) 

Start:
Define three variables for a spaceship shuttle:
1. One for the starting fuel level.
2. One for the number of astronauts aboard.
3. One for the altitude the shuttle reaches.

Construct while loops to do the following:
1. Query the user for the starting fuel level. Validate that the user enters a positive integer value greater than 5000 but less than or equal to 30000.
2. Use a second loop to query the user for the number of astronauts (up to a maximum of 7). Validate the entry.
3. Use a final loop to monitor the fuel status and altitude of the shuttle. Each iteration, decrease the fuel level by 100 units for each astronaut aboard. Also, increase the altitude by 50 kilometers.
4. Output the resulting altitude with the phrase, "The shuttle gained an altitude of ___ km."
5. If the altitude is 2000 km or higher, add "Orbit achieved!" Otherwise add, "Failed to reach orbit."

<h4 style="background-color: yellow;"> Task 5.3: Sum of User Input </h4>

Source: https://javascript.info/task/array-input-sum

Starter Code: [T5C Sum Input.html](T5c_sum_input/T5C_Sum_Input.html) and  [T5C_Sum_Input.js](t5c_sum_input/T5C_Sum_Input.js) 

1. Ask the user for values using prompt and store the values in an array.
2. Finish asking when the user enters an empty string.
3. Calculate and return the sum of array items.

P.S. A zero (`0`) is a valid number, so do not stop input on zero.

## Functions and random
Example with functions and random:

```javascript
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min); // maximum and minimum are inclusive
}

let newNum = getRandomIntInclusive(5, 10);
```

#### Parameters
In the example, the parameters are `min` and `max`. They are variables that hold the data sent by the function call.

#### Function vs function call
Using the function name returns the function object: `getRandomIntInclusive`

Using brackets calls the function to run: `getRandomIntInclusive(5, 10)`

#### Arguments
Arguments are the data values given in the function call and sent to the function to use. In the example, the arguments are `5` and `10`.

#### Return value
A function can have no return value (fruitless or void) or can return data back to the place in the code where it was called. In the example above, the generated number is returned to where the function was called.

```javascript
function calc_add(num1, num2) {
  let total = num1 + num2;
  return total;
}

console.log("Total is: " + calc_add(2, 3)); // prints Total is: 5
```

<h4 style="background-color: yellow;"> Task 5.4: Number Generator </h4>

Starter Code: [T5D_Number_Generator.html](T5D_Number_Generator/T5D_Number_Generator.html) and  [T5D Number Generator.hs](t5D_number_generator/T5D_Number_Generator.js) 

Function: `number_generator`

In:
1. `n` - how many numbers to generate.
2. `L` - lowest number.
3. `H` - highest number.

Do:
Randomly generate `n` numbers in the range `L` to `H` that are all unique. Return a sorted list.

Out:
Sorted unique number list.

Random number generation: [Link to Random Number in JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

Function notation: [Link to Functions in JS](https://www.w3schools.com/js/js_functions.asp)

Use an array to keep track of the list. [Check if an item is already in the list](https://docs.google.com/document/d/1EFUwOwokMSez8p2fz9c9EfhRGY9ya2UIARta77acs1I/edit#heading=h.gv8vg0sxrwj3)

---

## Variable Scope
If a variable is created outside a function, it is considered global and can be used inside the function.

```javascript
let score = 0;

function checkScore() {
  alert(`Score is ${score}!`); // score variable recognizes global score
}
```

If a variable is created inside a function or in the parameters, it is considered local. Local variables are only accessible from within the function where they were declared.

Since local variables are only recognized inside their functions, variables with the same name can be used in different functions.

Local variables are created when a function starts and deleted when the function is completed.

```javascript
function greeting1(name) {
  let words = "Hello!"; // local variable words
  alert(words + name); // displays Hello and the value of the name variable
}

function greeting2(name) {
  let words = "Welcome!"; // local variable words
  alert(words + name); // displays Welcome and the value of the name variable
}

alert(words); // Undefined, because words was a local variable
```




