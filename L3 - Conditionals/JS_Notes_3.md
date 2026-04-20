## Chapter 3. Conditionals

Resources: https://www.theodinproject.com/lessons/foundations-fundamentals-part-2#conditionals | https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics#conditionals | https://javascript.info/ifelse

When using conditional statements, do not forget the Operators we looked at earlier, in particular the relational, equality, and logical operators.

#### If
You can write a simple if statement:

```javascript
if (year == 2024) alert('You are right!');
```

Or an if statement with multiple statements. When doing more than one statement inside the condition, you need to wrap with curly braces.

```javascript
if (year == 2022) {
	alert("That's correct!");
	alert("You're so smart!");
}
```

#### Else
An else statement is optional.

```javascript
if (year == 2022) {
	alert('You guessed it right!');
} else {  // any value except 2022
	alert('How can you be so wrong?');
}
```

#### Else if
If you want to test several variants of a condition, use else if.

```javascript
if (year < 2024) {
	alert('Too early...');
} else if (year > 2024) {
	alert('Too late');
} else {
	alert('Exactly!');
}
```

#### Logical And `&&`
When checking more than one condition, you can join with AND.

Note: This operator evaluates from left to right. If it ever finds a false condition, it will stop and not check any further conditions.

```javascript
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
	alert('The time is 12:30');
}
```

#### Logical Or `||`
When checking more than one condition, you can join with OR.

Note: Like the AND operator, this operator evaluates from left to right. If it ever finds a true condition, it will stop and not check any further conditions.

```javascript
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
	alert('The office is closed.'); // it is the weekend
}
```

#### Logical Not `!`
You can use the not operator to either convert booleans (`!true === false` and `!false === true`).

You can also use the not operator to invert a value.

---

<h4 style="background-color: yellow;"> Task 3.1: Conditions to determine the sign of a number </h4>

Question Source: https://javascript.info/task/sign

Starter Code: [T3_Conditions.html](T3_Conditions.html) and [T3_Conditions.js](T3_Conditions.js)

Using if..else, write code that gets a number via prompt and then shows in alert:
1. `1`, if the value is greater than zero.
2. `-1`, if the value is less than zero.
3. `0`, if the value equals zero.

<h4 style="background-color: yellow;"> Task 3.2: Check the Login (nested ifs) </h4>

Question Source: https://javascript.info/task/check-login

Note: How will empty strings and null be dealt with?

<h4 style="background-color: yellow;"> Task 3.3: Check Range Between </h4>

Source: https://javascript.info/task/check-if-in-range


Write an if condition to check that age is between 14 and 90 inclusively.

"Inclusively" means that age can reach the edges 14 or 90.

<h4 style="background-color: yellow;"> Task 3.4: Check Range Outside </h4>

Source: https://javascript.info/task/check-if-out-range

Write an if condition to check that age is NOT between 14 and 90 inclusively.

Create two variants: the first one using NOT `!`, the second one without it.

---

## JS2 Assignment: Conditionals


## Extra Practice
JavaScript conditional statements and loops - [Exercises, Practice, Solution - w3resource](https://www.w3resource.com/javascript-exercises/javascript-conditional-statements-and-loops-exercises.php)


