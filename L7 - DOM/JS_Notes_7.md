## Chapter 7. DOM - Document Object Model

Resources: https://javascript.info/searching-elements-dom

The DOM is a tree of HTML elements, organized in the nested way they are written in the HTML file.

DOM navigation properties are great when elements are close to each other. When they are not, we can use additional searching methods.

#### document.getElementById(id)
If an element has an `id` attribute, we can get that element using `document.getElementById(id)`, no matter where it is.

Do not forget: each `id` must be unique.

```html
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // get the element
  let elem = document.getElementById('elem');

  // make its background red
  elem.style.background = 'red';
</script>
```

#### document.querySelector(css)
The call to `document.querySelector(css)` returns the first element that matches the given CSS selector.

```html
<h1 class="score">Score is 0</h1>
<h2 class="score">High Score is 10</h2>

<script>
  let scoreH = document.querySelector('.score');
  scoreH.innerHTML = 'Score is 5'; // changes h1 score to Score is 5
</script>
```

---

<h4 style="background-color: yellow;"> Task 7.1: Functions and DOM </h4>

Starter Code: [T7A_Functions_DOM.html](T7A_Functions_DOM/T7A_Functions_DOM.html) 

Edit the following HTML so that the button click calls a function that:
1. Selects `paragraph1` and changes the text to "Hi there".
2. Selects `paragraph2` and changes the text to "Goodbye".
3. Shows an alert with the `textContent` of the `h1` element.

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <title>First Functions For CMP621</title>

    <script>
      function myFunction() {
        alert("I want to change the para1 text to 'Hi there'");
        alert("I want to add an additional line of text to para2. 'Goodbye'");
      }
    </script>
  </head>
  <body>
    <h1>Sample Web Page - Functions and DOM</h1>
    <br />
    <button type="button" name="button" onclick="alert('Need to call Function');">
      Click Me!
    </button>

    <p class="para1">This is para1</p>
    <p class="para2">This is para2</p>
  </body>
</html>
```

## The DOM Tree

<h4 style="background-color: yellow;"> Task 7.2: DOM Manipulation </h4>

Starter Code: [T7B_DOM_Manipulation.html](T7B_DOM_Manipulation/T7B_DOM_Manipulation.html) and [T7B_DOM_Manipulation.js](T7B_DOM_Manipulation/T7B_DOM_Manipulation.js) 

DOM methods and properties are part of Web APIs (libraries provided by the browser). JavaScript can interact with these APIs to access HTML elements and styles. Every element on a webpage can be represented as a node in the DOM Tree.

![DOM Tree Structure](assets/DOM_Tree_Structure.jpg)

#### Getting Values
Through the DOM, we can access different properties of HTML elements.

To access an element property on a webpage:

```javascript
document.querySelector('element').property;
```

#### The `.textContent` property
You can access the text content of an element like an `h2` header.

```javascript
let headingText = document.querySelector('h2').textContent;
console.log(headingText);
```

In this example, `querySelector()` is used to select the `textContent` property of an HTML `h2` element.

You can also target elements by id or class.

```javascript
let highNumberText = document.querySelector('.highNumber').textContent;
console.log(highNumberText);
```

Just like in CSS, a period is used to indicate a class selector.

#### The `.value` property
For input elements (such as number or text inputs), use `.value` instead of `.textContent`.

```javascript
let userInput = document.querySelector('input').value;
console.log(userInput);
```

Note: values from inputs are returned as strings.

#### Using Variables
Instead of outputting values directly to the console each time, assign them to variables first.

```javascript
let headingText = document.querySelector('h2').textContent;
console.log(headingText);
```

#### Setting Values
`querySelector()` can also be used to set or change properties.

```javascript
document.querySelector('h2').textContent = 'This heading has changed!';
```

This does not permanently change the HTML file itself. It changes what is displayed in the page while the script runs.

#### Changing CSS Styles
You can also use `querySelector()` to manipulate CSS styles.

```javascript
document.querySelector('h2').style.color = 'green';
```

#### Reacting to Events

The guess my number game above has 2 different buttons that the user will click to play the game. Clicking a button is an example of an event, or something that happens to an html element. There are lots of different types of events and the table below shows just a few.

| Event     | Description                                              |
| --------- | -------------------------------------------------------- |
| click     | Event occurs when user clicks on an element              |
| keypress  | Event occurs when user presses a key                     |
| input     | Event occurs when an element gets user input             |
| mouseover | Event occurs when mouse pointer is moved onto an element |


JavaScript can react to events, and execute code when events are detected!
To react to events we can use the addEventListener( ) method. 

#### addEventListener( )
In the example below, an event listener has been added to a button  element with the class name “again”. The .addEventListener method effectively listens or waits for an event, in this case a “click” indicating the user has clicked the button.

Notice the .addEventListener method has 2 arguments: the ‘event’, and the function  (‘click’ , function( )  {}  )


```javascript
document.querySelector(".again").addEventListener("click", again);
```

#### Remove event listeners
```javascript
document.querySelector("selector").removeEventListener( "event" , function_name ) 
```

Only events that have been ADDED with addEventListener can be removed using removeEventListener.