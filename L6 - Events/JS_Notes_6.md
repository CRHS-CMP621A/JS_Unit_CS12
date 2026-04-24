## Chapter 6. Events

Resources: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events | https://www.w3schools.com/js/js_events.asp

Events can be placed in the HTML file to trigger JavaScript.

<h4 style="background-color: yellow;"> Task 6.1: Examples of Events </h4>

Starter Code: [T6A_Event_Examples.html](T6A_Event_Examples.html)

#### Inline Event Handlers
You can attach event handlers directly in HTML attributes, such as `onload`, `onclick`, `onmouseover`, and `onmouseout`.

```html
<html>
<head>
  <title>Events - Button Event Example</title>
</head>

<body onload="alert('Welcome!');">

  <a href="#" onclick="alert('Welcome!');">Click Me!</a>
  <br>
  <br>
  <a href="#" onmouseover="alert('Hover Alert!');">Hover Over Me!</a>

  <h1 onmouseover="style.color='red';" onmouseout="style.color='black';">Mouse Over Example</h1>
  <br>
  <br>
  <h1 onmouseover="document.bgColor='blue';" onmouseout="document.bgColor='white';">Mouse Over Background Color Change</h1>
  <br>
  <br>
  <button type="button" name="button" onclick="alert('You clicked the button!');">Click Me Please!</button>
</body>
</html>
```

---

<h4 style="background-color: yellow;"> Task 6.2: Three images with background colour change </h4>

Starter Code: [T6B_Three_Images.html](T6B_Three_Images.html)

Choose three images and put them on your webpage. When you hover over each image, the background color of the page should change.