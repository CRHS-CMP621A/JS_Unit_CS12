## Chapter 2. Data and Variables
Resources: https://javascript.info/variables

#### Using *let* to declare variables
Use *let* as the keyword to declare variables.  Assign a variable with a single equal sign.

`let message;`

`message = 'Hello'; // store the string 'Hello' in the variable named message`

Or

`let message = 'Hello!'; // declaire the variable and assign the value`

#### Variable naming 
There are two rules when choosing legal variable names in JavaScript.   
1. The name must contain only letters, digits, or the symbols $ and _.
2. The first character must not be a digit.

Also, as a convention camelCase is often used when naming variables.
**(1)** words are joined together to omit spaces    **(2)** start with a lowercase letter, and     **(3)** capitalized each internal word.

#### Constants
Use *const* instead of *let*. These can **not** be reassigned. Any attempt to do so will result in an **error**.

`const pageLoadTime = /* time taken by a webpage to load */;`

#### Calculated Constants
Use all-caps for variables that are known prior to execution. These are hard-coded.

`const COLOR_RED = "#F00";  // hard coded in advance`

`const screenSize = device.screen-width();  //calculated upon page load`

---

<h4 style="background-color: yellow;"> Task 2.1: Simple Variable Practice </h4>

Open [Task2_1.js](Lesson_Files/Task2_1.js)

##### Part 1 Working with Variables
1. Declare two variables: admin and firstName.
2. Assign the value "John" to name.
3. Copy the value from name to admin.
4. Show the value of admin using alert (must output "John").

#### Part 2 Giving the Right Name
1. Create a variable with the name of our planet. How would you name such a variable?
2. Create a variable to store the name of a current visitor to a website. How would you name that variable?

#### Part 3 Uppercase const?
Examine the following code:

`const birthday = '18.04.1982';`

`const age = someCode(birthday);`

Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.

Would it be right to use uppercase for `birthday`? For `age`? Or even for both?

`const BIRTHDAY = '18.04.1982'; // make birthday uppercase?`

`const AGE = someCode(BIRTHDAY); // make age uppercase?`

---

## Data Types
Resources: https://javascript.info/types

Try the following code to determine the type for each of these examples.

```javascript
console.log(typeof "Hello, World!");  //string
console.log(typeof 17);               //number
console.log(typeof 3.14);             //number
console.log(typeof true);            //boolean
```

## Type Coercion 
Javascript will automatically try and convert data into the type that it thinks will best suit the situation.

Example:
```javascript
console.log("3" * 2);     //6
console.log(3  + "2");    //32
```

Another example showing how left-to-right order of operations affects the type coercion:
```javascript
console.log(4 + 5 + "px") // output: 9px // (4+5) +"px" ==> 9 + "px" ==> 9px
console.log("$" + 4 + 5)  // output: "$45"  // ("$" + 4) + 5 ==> $4 + 5 ==> "$45"
```

## Type Conversions (Number and String)
Resource: https://javascript.info/type-conversions

Use `Number( )` to convert string values into number data type.
- For example: `console.log(Number("12.2"))` // 12.2
- For example: `let age = Number(prompt("What is your age?"))` // 16

Use `String( )` to convert numerical values into the string data type.
- For example: `console.log("$" + String(9))` // $9

#### **String Data Type**

Use single or double quotes. You can use a mix of quote types in order to display quotes in your final string.  

For example, the string `"Bruce's beard"` will have an apostrophe.

**The string operators to concatenate**

You can use the + operator to join two strings. Or you can use the following backticks (found to the top left corner of the keyboard). The expression inside ${...} is evaluated and the result becomes a part of the string. 

``` javascript
 **let** name = "John " + " " + "Smith";  // use + to concatenate 
  
 // embed a variable 
 alert( `Hello, ${name}!` ); // Hello, John Smith! 
  
 // embed an expression 
 alert( `the result is ${1 + 2}` ); // the result is 3 
```


<h4 style="background-color: yellow;"> Task 2.2: Using backticks for string concatenation </h4>

What is the output of the script?  (Source: <https://javascript.info/task/string-quotes>)

```javascript
 **let** name = "Carl";
alert( `hello ${1}` ); // ? 
alert( `hello ${"name"}` ); // ? 
alert( `hello ${name}` ); // ? 
```

#### **Number Data Type**

The _number_ type represents both integer and floating point numbers.

Besides regular numbers, there are so-called “special numeric values” which also belong to this data type: Infinity, -Infinity and NaN. 

NaN occurs if a calculated result is an error.  If a calculation uses a NaN value part-way through, every calculation afterwards will also be NaN.


#### **null and unknown**

_Null_ is its own special type. It represents value unknown or empty.

_Undefined_ is its own special type. It means “value is not assigned”.

```javascript
**let** age; 
alert(age); // shows "undefined"
```




### **Operators**

Resources: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators>


#### **Arithmetic Operators**

`+` Addition operator.   Use `++` to increment by 1 or `+= number` to increment by another value.

`-` Subtraction operator. Use `--` to decrement by 1 or `-= number`  to decrement by another value.

 `/`    Division operator.

 `*`    Multiplication operator.

 `%`    Remainder operator.

 `**`  Exponentiation operator.

Order of operations for mathematical expressions is BEDMAS.


<h4 style="background-color: yellow;"> Task 2.3: Simple Calculations with Math </h4>

Fork and Solve → [lets do some math - Replit](https://replit.com/@I3uckwheat/lets-do-some-math#math.js)\
Remember: Use _number(  )_   to convert a string to a number data type.
