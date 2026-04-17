## Chapter 1. Introduction
Resources: https://javascript.info/intro   |   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference

#### What is JavaScript
JavaScript ("JS" for short) is a cross-platform, Object-oriented scripting language, a full-fledged dynamic programming language that, when applied to an HTML document, can provide dynamic interactivity on websites. 
#### What can it do: 
In-browser JavaScript can do everything related to webpage manipulation, interaction with the user, and the webserver.
#### What can't it do: 
JavaScript's abilities in the browser are limited for the sake of a user's safety. The aim is to prevent an evil webpage from accessing private information or harming the user's data.
#### Dynamic code:
 The word dynamic is used to describe both client-side JavaScript and server-side languages — it refers to the ability to update the display of a web page/app to show different things in different circumstances, generating new content as required. 
#### Scripting Language: 
is only compiled when an interpreter (another program that can convert the script into something a computer can understand) reads it. In the case of JavaScript, the interpreter is built into the web browser. So when your web browser reads a web page with a JavaScript program in it, the web browser translates the JavaScript into something the computer understands. As a result, a scripting language operates more slowly than a compiled language, because every time it runs, the program must be translated for the computer. Scripting languages are great for web developers: Scripts are generally much smaller and less complex than desktop programs, so the lack of speed isn't as important. In addition, because they don't require compiling, creating and testing programs that use a scripting language is a much faster process.
#### Client side vs Server Side:
 JavaScript is a client-side language which means that it works inside a Web browser. Client side languages can react immediately and change what a visitor sees in his web browser without the need to download a new page. 
#### Node.js: 
Node.js lets developers use JavaScript for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. Consequently, Node.js represents a "JavaScript everywhere" paradigm unifying web application development.

---

## How to run JS Code in Browser
Resources: https://www.theodinproject.com/lessons/foundations-fundamentals-part-1

#### Developer Console
You can access the dev tools in a browser with keyboard shortcuts or with right-click and INSPECT.

<h4 style="background-color: yellow;"> Task 1.1: Find the bug. </h4>

Open [bug.html](bug.html) and use dev tools → console to find the bug.  

#### Internal JS
Wrap your JS code with a `<script>` element tag inside the HTML.

```html
<!-- Internal JS Example -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Page Title</title>
</head>
<body>
  <script>
    // Your JavaScript goes here!
    console.log("Hello, World!");
  </script>
</body>
</html>
```

#### External JS
Include a link to an external .js file. 

Note: A single `<script>` tag can't have both the src attribute and code inside.

```html
<!-- External JS Example -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Page Title</title>
</head>
<body>
    <script src="script.js"></script>
</body>
</html>
```

<h4 style="background-color: yellow;"> Task 1.2: Order of JS Calling between Internal and External JS </h4>

Open [Internal_External_Console.html](Internal_External_Console/Internal_External_Console.html)

1. Add a script in the index.html using `<script>` tag.
`console.log("Internal script!");`
1. Add a script to the [script.js](Internal_External_Console/external_script.js) file.
`console.log("External script!");`
1. Add a link to the external script in your index.html file.
`<script src="external_script.js"></script>`
View the website and observe the console output. 
1. Questions to discuss:   
   
    a. Which script runs first?

    b. Can you change the location of the script link in your HTML and see if/how that changes the order of the output? 

---

#### Comments
Use // for single line comments and /*   */ for multiple lines comments.

```javascript
// Comments in JavaScript
// console.log("This does not print.");
console.log("Hello, World!"); // Comments can follow code on same line.

/* Here is how
to have
multi-line
comments. */

console.log("Comments make your code more readable by others.");
```

<h4 style="background-color: yellow;"> Task 1.3: Try the following using console.log in the previous task. </h4>

1. Is there a difference between using a single or a double quote (' vs. ")?
2. Remove the semicolon ;     
(A semicolon may be omitted in most cases when a line break exists.  JavaScript interprets the line break as an "implicit" semicolon.)

3. Print a number. (Bonus: Print two numbers added together).

4. Compare the output of the following code. 
 * `console.log("What","do","commas","do?");`
* `console.log("Does", "adding",      "space", "matter?");`
* `console.log('Launch' + 'Code');`
* `console.log("LaunchCode was founded in", 2013);`
