// Initialize Ace Editor
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/html");

// Live Preview
editor.getSession().on('change', function() {
    var code = editor.getValue();
    document.getElementById('preview').srcdoc = code;
});

// Create HTML buttons dynamically
var openLivePreviewButton = document.getElementById('openLivePreview');
var increaseTextSizeButton = document.getElementById('increaseTextSize');
var toggleThemeButton = document.getElementById('toggleTheme');
var newFileButton = document.getElementById('newFile');
var openFileButton = document.getElementById('openFile');
var saveFileButton = document.getElementById('saveFile');


// Auto-Save with Visual Indicator
var saveIndicator = document.createElement('div');
saveIndicator.id = 'save-indicator';
document.body.appendChild(saveIndicator);

editor.getSession().on('change', function() {
    // Save the changes
    var codeContent = editor.getValue();
    localStorage.setItem('savedCode', codeContent);

    // Update the save indicator
    saveIndicator.textContent = 'Changes Saved';
    saveIndicator.style.color = 'green';
    saveIndicator.classList.add('active'); // Add the 'active' class to trigger the animation

    // Clear the indicator after 2 seconds
    setTimeout(function() {
        saveIndicator.textContent = '';
        saveIndicator.style.color = '';
        saveIndicator.classList.remove('active'); // Remove the 'active' class
    }, 2000);
});

// Listen for Ctrl+S key combination
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // Prevent the default browser save behavior
        saveCode();
    }
});

// Save Code Function
function saveCode() {
    var codeContent = editor.getValue();
    localStorage.setItem('savedCode', codeContent);

    // Update save indicator with animation
    saveIndicator.textContent = 'Code Saved';
    saveIndicator.style.color = 'green';
    saveIndicator.classList.add('active'); // Add the 'active' class to trigger the animation

    // Clear the indicator and remove 'active' class after 2 seconds
    setTimeout(function() {
        saveIndicator.textContent = '';
        saveIndicator.style.color = '';
        saveIndicator.classList.remove('active'); // Remove the 'active' class
    }, 2000);
}

// Check for saved code on page load
var savedCode = localStorage.getItem('savedCode');
if (savedCode) {
    saveIndicator.textContent = 'Code Loaded';
    saveIndicator.style.color = 'green';
    saveIndicator.classList.add('active'); // Add the 'active' class to trigger the animation
    setTimeout(function() {
        saveIndicator.textContent = '';
        saveIndicator.style.color = '';
        saveIndicator.classList.remove('active'); // Remove the 'active' class
    }, 2000);
}

// Code Auto Save
editor.getSession().on('change', function() {
    localStorage.setItem('savedCode', editor.getValue());
});

var savedCode = localStorage.getItem('savedCode');
if (savedCode) {
    editor.setValue(savedCode, 1);
}

// Dark/Light Theme Toggle
var darkMode = false;

function toggleTheme() {
    darkMode = !darkMode;
    var theme = darkMode ? "ace/theme/twilight" : "ace/theme/dawn";
    editor.setTheme(theme);
}

// Word Wrap Toggle
var wordWrapEnabled = false;

function toggleWordWrap() {
    wordWrapEnabled = !wordWrapEnabled;
    editor.getSession().setUseWrapMode(wordWrapEnabled);

    var wordWrapIndicator = document.getElementById('word-wrap-indicator');
    wordWrapIndicator.textContent = wordWrapEnabled ? 'Word Wrap: On' : 'Word Wrap: Off';
}

// Theme Selection
function changeTheme() {
    var themeSelect = document.getElementById('theme-select');
    var selectedTheme = themeSelect.options[themeSelect.selectedIndex].value;
    editor.setTheme(`ace/theme/${selectedTheme}`);
}

// Font Size Slider
var fontSizeSliderContainer = document.getElementById('font-size-slider-container');
var fontSizeSlider = document.getElementById('font-size-slider');
var fontSizeValue = document.getElementById('font-size-value');

function toggleFontSizeSlider() {
    fontSizeSliderContainer.style.display = fontSizeSliderContainer.style.display === 'none' ? 'block' : 'none';
}

function changeFontSizeSliderValue() {
    var selectedFontSize = fontSizeSlider.value;
    fontSizeValue.textContent = `${selectedFontSize}px`;
    editor.setFontSize(`${selectedFontSize}px`);
}

// Language Mode Selection
function changeLanguageMode() {
    var languageSelect = document.getElementById('language-select');
    var selectedLanguage = languageSelect.options[languageSelect.selectedIndex].value;
    editor.getSession().setMode(`ace/mode/${selectedLanguage}`);
}

// Gutter Toggle
function toggleGutter() {
    editor.renderer.setShowGutter(!editor.renderer.getShowGutter());
}

// Font Family Selection
function changeFontFamily() {
    var fontFamilySelect = document.getElementById('font-family-select');
    var selectedFontFamily = fontFamilySelect.options[fontFamilySelect.selectedIndex].value;
    document.getElementById('editor').style.fontFamily = selectedFontFamily;
}

// Reset Editor Settings
function resetEditorSettings() {
    // Reset theme
    editor.setTheme("ace/theme/twilight");

    // Reset font size
    editor.setFontSize("14px");

    // Reset language mode
    editor.getSession().setMode("ace/mode/html");

    // Reset tab size
    editor.getSession().setTabSize(4);

    // Reset line numbers
    editor.renderer.setOption('showLineNumbers', true);

    // Reset gutter
    editor.renderer.setShowGutter(true);

    // Reset soft wrap
    editor.getSession().setUseWrapMode(false);

    // Reset font family
    document.getElementById('editor').style.fontFamily = 'monospace';
}

// Download Code as File
function downloadCodeAsFile() {
    var codeContent = editor.getValue();
    var languageSelect = document.getElementById('language-select');
    var selectedLanguage = languageSelect.options[languageSelect.selectedIndex].value;
    var filename = getLanguageFilename(selectedLanguage);  // Get language-specific filename
    var fileExtension = getLanguageFileExtension(selectedLanguage);  // Get language-specific file extension

    var blob = new Blob([codeContent], { type: 'text/plain' });

    // Use the language-specific filename with the language-specific file extension
    var downloadLink = document.createElement('a');
    downloadLink.download = `${filename}.${fileExtension}`;
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.click();
}

// Function to get language-specific filename
function getLanguageFilename(language) {
    // Mapping of language to filename
    var languageToFileMapping = {
        'html': 'index',
        'css': 'styles',
        'javascript': 'script',
        'text': 'text' // Add the mapping for the 'text' option
        // Add more languages as needed
    };

    // Get the corresponding filename based on the selected language
    return languageToFileMapping[language] || 'code';  // Default to 'code' if no mapping found
}

// Function to get language-specific file extension
function getLanguageFileExtension(language) {
    // Mapping of language to file extension
    var languageToFileExtensionMapping = {
        'html': 'html',
        'css': 'css',
        'javascript': 'js',
        'text': 'txt' // Add the mapping for the 'text' option
        // Add more languages as needed
    };

    // Get the corresponding file extension based on the selected language
    return languageToFileExtensionMapping[language] || 'txt';  // Default to 'txt' if no mapping found
}

// Upload File
function triggerFileInput() {
    document.getElementById('file-input').click();
}

function loadFile() {
    var fileInput = document.getElementById('file-input');
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var fileContent = e.target.result;
            editor.setValue(fileContent);
        };
        reader.readAsText(file);
    }
}

// Share Code as Link
function generateShareableLink() {
    var codeContent = editor.getValue();
    var encodedCode = encodeURIComponent(codeContent);

    var shareableLink = `${window.location.href.split('?')[0]}?code=${encodedCode}`;

    alert('Copy and share the following link:\n\n' + shareableLink);
}

// Background Color Selection
function changeBackgroundColor() {
    var backgroundColorPicker = document.getElementById('background-color-picker');
    var selectedBackgroundColor = backgroundColorPicker.value;
    document.getElementById('editor').style.backgroundColor = selectedBackgroundColor;
}

// Insert Template Code
function insertTemplateCode() {
    var templateSelect = document.getElementById('template-select');
    var selectedTemplate = templateSelect.options[templateSelect.selectedIndex].value;

    var templateCode = getTemplateCode(selectedTemplate);
    editor.setValue(templateCode);
}

// Function to get template code based on the selected template
function getTemplateCode(template) {
    switch (template) {
        case 'html':
            return '<!DOCTYPE html>\n<html>\n<head>\n  <title>Your Title</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>';
        case 'javascript':
            return '// Your JavaScript code here\nconsole.log("Hello, World!");';
        default:
            return '';
    }
}

// Enable autocompletion
editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
});

// Wait for Ace to be fully loaded before using language_tools
editor.on("init", function () {
    console.log("Ace Editor is fully loaded.");

    // Get the language tools module
    var langTools = ace.require("ace/ext/language_tools");

    // Sample autocompletion data
    var completions = [
        { value: "h1", caption: "Heading 1", meta: "tag" },
        { value: "h2", caption: "Heading 2", meta: "tag" },
        { value: "h3", caption: "Heading 3", meta: "tag" },
        // Add more completions as needed
    ];

    // Set completions directly using Ace's langTools
    langTools.setCompleters([{
        getCompletions: function (editor, session, pos, prefix, callback) {
            callback(null, completions);
        }
    }]);

});

// Initialize autocompletion
editor.getSession().setMode("ace/mode/html");

// Cursor position indicator
function updateCursorPosition() {
    var cursorPosition = editor.getCursorPosition();
    document.getElementById('position').innerText = `Row: ${cursorPosition.row + 1}, Column: ${cursorPosition.column + 1}`;
}

// Live Preview
editor.getSession().on('change', function() {
    var code = editor.getValue();
    document.getElementById('preview').srcdoc = code;

    // Update cursor position
    updateCursorPosition();
});

// Additional event listener for cursor position update
editor.selection.on('changeCursor', function () {
    updateCursorPosition();
});

// Help panel
document.getElementById('help-button').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('page1').style.display = 'block';
});

document.getElementById('close-button').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
    var pages = document.getElementsByClassName('page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
});

function changePage(pageId) {
    var pages = document.getElementsByClassName('page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    document.getElementById(pageId).style.display = 'block';
}

