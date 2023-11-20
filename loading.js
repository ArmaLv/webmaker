document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.querySelector('.loading-screen');
  const htmlCodeElement = document.getElementById("html-code");
  const htmlCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Loading</title>
</head>
<body>
  <h1>Loaded</h1>
  <script src="loading.js"></script>
</body>
</html>`;

  // Simulate writing code
  writeCode(htmlCodeElement, htmlCode, 0, function () {
    fadeOutLoadingScreen(loadingScreen);
  });
});

function writeCode(element, code, index, callback) {
  if (index < code.length) {
    element.textContent += code.charAt(index);
    index++;
    setTimeout(function () {
      writeCode(element, code, index, callback);
    }, 10); // Text speed 
  } else {
    callback();
  }
}

function fadeOutLoadingScreen(element) {
  element.style.animation = 'fadeOut 1s forwards';
  setTimeout(function() {
    element.remove();
  }, 1000);
}

