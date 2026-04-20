## Chapter 4. Arrays

Resources: [Launch Code - Arrays](https://education.launchcode.org/intro-to-professional-web-dev/chapters/arrays/index.html) | [JavaScript Info - Arrays](https://javascript.info/array)

#### Declaration
Create an empty array, or start with an array containing elements.

```javascript
/* Empty */
let arr = new Array(5); // Avoid: creates array length 5 with no items
let arr = []; // Empty array of unspecified size

/* not empty */
let names = ['Alex', 'Bob', 'Carl'];
```

#### Access an array element by index
Array elements are numbered, starting at zero.

```javascript
let fruits = ["Apple", "Orange", "Plum"];
alert(fruits[0]); // Apple
alert(fruits[1]); // Orange
alert(fruits[2]); // Plum

// Replace an element:
fruits[2] = 'Pear'; // now ["Apple", "Orange", "Pear"]

// Array Length
alert(fruits.length); // 3
```

#### Undefined elements in arrays
If you try to access a part of the array that has not been defined, or is out of range (beyond the length of the array), you will get `undefined`.

```javascript
alert(fruits[3]); // undefined // there is no item at index 3
```

## Common Array Methods
Resources: 8.3. Array Methods - [Introduction to Professional Web Development in JavaScript (Independent Track) documentation](https://education.launchcode.org/intro-to-professional-web-dev/chapters/arrays/array-methods.html#common-array-methods) | [W3 Schools Array Methods](https://www.w3schools.com/js/js_array_methods.asp) | [MDN Web Docs - Arrays](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Arrays)

| Method     | Syntax                                 | Description                                                                                                                       |
| ---------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `includes` | `arrayName.includes(item)`             | Checks if an array contains the specified item.                                                                                   |
| `indexOf`  | `arrayName.indexOf(item)`              | Returns the index of the first occurrence of an item in the array. If the item is not in the array, `-1` is returned.             |
| `sort`     | `arrayName.sort()`                     | Arranges the elements of an array into increasing order (kinda).                                                                  |
| `reverse`  | `arrayName.reverse()`                  | Reverses the order of the elements in an array.                                                                                   |
| `pop`      | `arrayName.pop()`                      | Removes and returns the last element in an array.                                                                                 |
| `push`     | `arrayName.push(item1, item2, ...)`    | Adds one or more items to the end of an array and returns the new length.                                                         |
| `shift`    | `arrayName.shift()`                    | Removes and returns the first element in an array.                                                                                |
| `unshift`  | `arrayName.unshift(item1, item2, ...)` | Adds one or more items to the start of an array and returns the new length.                                                       |
| `slice`    | `arr.slice(start index, end index)`    | Copies selected entries of an array into a new array.                                                                             |
| `split`    | `stringName.split('delimiter')`        | Divides a string into smaller pieces, which are stored in a new array.                                                            |
| `join`     | `arrayName.join('char')`               | Takes each element in an array and returns a string with the elements joined together. The `char` is placed between each element. |


---

<h4 style="background-color: yellow;"> Task 4.1: Array Operations </h4>

Source: https://javascript.info/task/create-array

Starter Code: [T4_arrays.html](T4_Arrays.html) and [T4_Arrays.js](T4_Arrays.js)


For each step below, display the array in the console.
1. Create an array `styles` with items `Jazz` and `Blues`.
2. Append `Rock-n-Roll` to the end.
3. Replace the value in the middle with `Classics`. Your code for finding the middle value should work for any arrays with odd length.
4. Strip off the first value of the array and show it.
5. Prepend `Rap` and `Reggae` to the array. (Prepend means add to the beginning.)

<h4 style="background-color: yellow;"> Task 4.2: Using split and join </h4>

Source: https://education.launchcode.org/intro-to-professional-web-dev/chapters/arrays/exercises.html

1. Start with the string `water,space suits,food,plasma sword,batteries`.
2. Use `split` to create an array, alphabetize the list, and remake it into a string again.

