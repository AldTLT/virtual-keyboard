onload = function () {
    load();
};

let capsLock = false;
let shiftPressed = false;
let controlPressed = false;
let altPressed = false;
let languageChanged = false;
let selectorPosition = 0;
let keysPressed = [];

const keyRelisedStyleTransform = 'scale(1)';

const ACTIVE_BUTTON_STYLE = {
    backgroundColor: '#999999',
}

const WRAPPER_STYLE = {
    display: 'flex',
    width: '700px',
    flexWrap: 'wrap',
}

const MONITOR_STYLE = {
    width: '600px',
    height: '250px',
    margin: '10px auto',
    border: '2px solid #111111',
    backgroundColor: '#dddddd',
    resize: 'none',
}

const KEYBOARD_STYLE = {
    display: 'grid',
    gridTemplate: 'repeat(10, 20px) / repeat(31, 20px)',
    margin: '0 auto',
}

const SYMBOL_BUTTON_STYLE = {

}

const SPECIAL_BUTTON_STYLE = {
    backgroundColor: '#dfc9bd',
    border: '2px solid #234567',
    borderRadius: '6px',
    fontSize: '12px',

};

const BUTTON_STYLE = {
    gridColumn: 'span 2',
    gridRow: 'span 2',
    backgroundColor: '#d1c9bd',
    border: '2px solid #4d4d4d',
    borderRadius: '6px',
    fontSize: '20px',
    transition: '0.1s',
};

const LINE_1_BUTTONS = {
    Backquote: ['`', 'Ё'],
    Digit1: ['1', '1'],
    Digit2: ['2', '2'],
    Digit3: ['3', '3'],
    Digit4: ['4', '4'],
    Digit5: ['5', '5'],
    Digit6: ['6', '6'],
    Digit7: ['7', '7'],
    Digit8: ['8', '8'],
    Digit9: ['9', '9'],
    Digit0: ['0', '0'],
    Minus: ['-', '-'],
    Equal: ['+', '+'],
}

const LINE_2_BUTTONS = {
    KeyQ: ['Q', 'Й'],
    KeyW: ['W', 'Ц'],
    KeyE: ['E', 'У'],
    KeyR: ['R', 'К'],
    KeyT: ['T', 'Е'],
    KeyY: ['Y', 'Н'],
    KeyU: ['U', 'Г'],
    KeyI: ['I', 'Ш'],
    KeyO: ['O', 'Щ'],
    KeyP: ['P', 'З'],
    BracketLeft: ['[', 'Х'],
    BracketRight: [']', 'Ъ'],
    Backslash: ['\\', '\\'],
}

const LINE_3_BUTTONS = {
    KeyA: ['A', 'Ф'],
    KeyS: ['S', 'Ы'],
    KeyD: ['D', 'В'],
    KeyF: ['F', 'А'],
    KeyG: ['G', 'П'],
    KeyH: ['H', 'Р'],
    KeyJ: ['J', 'О'],
    KeyK: ['K', 'Л'],
    KeyL: ['L', 'Д'],
    Semicolon: [';', 'Ж'],
    Quote: ['\'', 'Э'],
}

const LINE_4_BUTTONS = {
    KeyZ: ['Z', 'Я'],
    KeyX: ['X', 'Ч'],
    KeyC: ['C', 'С'],
    KeyV: ['V', 'М'],
    KeyB: ['B', 'И'],
    KeyN: ['N', 'Т'],
    KeyM: ['M', 'Ь'],
    Comma: [',', 'Б'],
    Period: ['.', 'Ю'],
    Slash: ['/', '.'],
}

let textCursorPosition = 0;

function load() {
    //Set localstorage
    if (localStorage.language === undefined) {
        localStorage.setItem('language', 'en');
    }

    //Create style (not allowed)
    let activeButtonStyle = document.createElement('style');
    activeButtonStyle.type = 'text/css';
    let innerHtml = '.active-button {'
    for (let styleProperty in ACTIVE_BUTTON_STYLE) {
        innerHtml += `${styleProperty}: ${ACTIVE_BUTTON_STYLE[styleProperty]}`;
    }
    innerHtml += '}';
    activeButtonStyle.innerHTML = innerHtml;
    document.querySelector('head').appendChild(activeButtonStyle);

    //Create wrapper
    let wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    for (let styleProperty in WRAPPER_STYLE) {
        wrapper.style[styleProperty] = WRAPPER_STYLE[styleProperty];
    }
    document.body.append(wrapper);

    //Create monitor
    let monitor = document.createElement('textarea');
    monitor.className = 'monitor';
    for (let styleProperty in MONITOR_STYLE) {
        monitor.style[styleProperty] = MONITOR_STYLE[styleProperty];
    }
    wrapper.append(monitor);

    //Create keyboard
    let keyboard = document.createElement('div');
    keyboard.className = 'keyboard';
    for (let styleProperty in KEYBOARD_STYLE) {
        keyboard.style[styleProperty] = KEYBOARD_STYLE[styleProperty];
    }
    wrapper.append(keyboard);
    customElements.define('symbol-key-button', SymbolButton, { extends: 'button' });
    customElements.define('special-key-button', SpecialButton, { extends: 'button' });

    //Line buttons 1
    createKeys(LINE_1_BUTTONS, keyboard);
    createSpecialKey('Backspace', 'Backspace', keyboard, 5);
    //Line buttons 2
    createSpecialKey('Tab', 'Tab', keyboard, 3);
    createKeys(LINE_2_BUTTONS, keyboard);
    createSpecialKey('Delete', 'Delete', keyboard);
    //Line buttons 3
    createSpecialKey('CapsLock', 'Caps Lock', keyboard, 4);
    createKeys(LINE_3_BUTTONS, keyboard);
    createSpecialKey('Enter', 'Enter', keyboard, 5);
    //Line buttons 4
    createSpecialKey('ShiftLeft', 'Shift', keyboard, 5);
    createKeys(LINE_4_BUTTONS, keyboard);
    createSpecialKey('ArrowUp', '^', keyboard);
    createSpecialKey('ShiftRight', 'Shift', keyboard, 4);
    //Line buttons 5
    createSpecialKey('ControlLeft', 'Ctrl', keyboard, 3);
    createSpecialKey('MetaLeft', 'Meta', keyboard);
    createSpecialKey('AltLeft', 'Alt', keyboard);
    keyboard.append(getKey('Space', [' ', ' '], 11));
    createSpecialKey('AltRight', 'Alt', keyboard);
    createSpecialKey('ControlRight', 'Ctrl', keyboard, 3);
    createSpecialKey('ArrowLeft', '<', keyboard);
    createSpecialKey('ArrowDown', 'v', keyboard);
    createSpecialKey('ArrowRight', '>', keyboard);

    //Events
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('click', onClick);
}

//Function creates key-buttons from object and appends to page.
function createKeys(keys, domElement) {
    for (let key in keys) {
        let keyButton = getKey(key, keys[key]);
        domElement.append(keyButton);
    }
}

//Function creates a functional key-button and appends to page.
function createSpecialKey(key, text, domElement, length) {
    let keyButton = document.createElement('button', 'special-key-button');
    keyButton.id = key;
    keyButton.innerText = text;
    keyButton.style.gridColumn = length !== undefined ? `span ${length}` : 'span 2';
    // debugger;    
    domElement.append(keyButton);
}

//Function returns the key-button.
function getKey(id, keyText, length) {
    let text;
    let value;
    localStorage.getItem('language') == 'en' ? (
        text = keyText[0],
        value = keyText[1])
        : (
            text = keyText[1],
            value = keyText[0]
        );

    let keyButton = document.createElement('button', 'symbol-key-button');
    keyButton.id = id;
    keyButton.innerText = text.toLowerCase();
    keyButton.value = value.toLowerCase();
    keyButton.style.gridColumn = length !== undefined ? `span ${length}` : 'span 2';
    return keyButton;
}

//Event mouse button down
function onMouseDown(event) {
    let target = event.target;
    if (target.classList.contains('button')) {
        keyButtonPressed(target);
        let monitor = document.querySelector('.monitor');
        if (target.classList.contains('symbol-button')) {
            printSymbol(target, monitor);
        }

        if (target.classList.contains('special-button')) {
            getSpecialButtonFunction(target, monitor);
        }        
    }    
}

//Event mouse button up
function onMouseUp(event) {
    let monitor = document.querySelector('.monitor');
    let keyButton = event.target;
    keyButtonReleased(keyButton);
    specialKeyButtonUp(keyButton);
    monitor.focus();
}

//Event mouse click (not allowed)
function onClick(event) {
    let target = event.target;
    if (target.classList.contains('button')) {

    }
}

//Event key button down
function onKeyDown(event) {
    let keyButton = document.querySelector(`#${event.code}`);

    if (!keyButton) {
        return;
    }

    if (keyButton.classList.contains('button')) {
        keyButtonPressed(keyButton);
    }
}

//Event key button down
function onKeyUp(event) {
    let keyButton = document.querySelector(`#${event.code}`);

    if (!keyButton) {
        return;
    }

    if (keyButton.classList.contains('button')) {
        keyButtonReleased(keyButton);
    }
}

//Event mouse leave a target
function onMouseOut(event) {
    keyButtonReleased(event.target);
}

//The function applies the style to the pressed key-button
function keyButtonPressed(keyButton) {
    //Save key to array
    if (!keysPressed.includes(keyButton.id)) {
        keysPressed.push(keyButton.id);
    }
    makeKeysCombination();
    keyButton.style.backgroundColor = '#999999';
    //Compute scaleX to transform key button
    let width = window.getComputedStyle(keyButton).width;
    width = width.substring(0, width.length - 2) ;
    let scaleX = 1 - (4 / width).toFixed(3);
    keyButton.style.transform = `scale(${scaleX}, 0.9)`;
}

//The function applies the style to the released key-button
function keyButtonReleased(keyButton) {
    //Delete key button from array
    if (keysPressed.includes(keyButton.id)) {
        keysPressed = keysPressed.filter(keyId => keyId != keyButton.id);
    }

    if (keyButton.classList.contains('symbol-button')) {
        keyButton.style.backgroundColor = BUTTON_STYLE.backgroundColor;
    }
    if (keyButton.classList.contains('special-button')) {
        keyButton.style.backgroundColor = SPECIAL_BUTTON_STYLE.backgroundColor;
    }

    saveSelectorPosition();
    keyButton.style.transform = keyRelisedStyleTransform;
    languageChanged = false;
}

//The function registers pressed key buttons
function getPressedKeyButtons(keyButton) {
    keysPressed.push(keyButton.id);
}

//The function adds symbol to textarea
function printSymbol(keyButton, monitor) {
    saveSelectorPosition()
    let text = monitor.value;
    monitor.value = text.substring(0, selectorPosition) + keyButton.textContent + text.substring(selectorPosition);
    monitor.selectionStart = monitor.selectionEnd = selectorPosition + 1;
}

//The function implements special key buttons click
function getSpecialButtonFunction(keyButton, monitor) {
    let keyId = keyButton.id;
    let text = monitor.value.split('');
    let textCursorPosition = monitor.selectionStart;
    console.log(monitor.selectionStart);
    saveSelectorPosition();

    switch (keyId) {
        case 'Backspace': {            
            text.splice(textCursorPosition - 1, 1);
            selectorPosition = (selectorPosition - 1) < 0 ? 0 : selectorPosition - 1;
            break;
        }
        case 'Delete': {            
            text.splice(textCursorPosition, 1);
            break;
        }
        case 'Tab': {
            text.splice(textCursorPosition, 0, '\t');
            selectorPosition += 1;
            break;
        }
        case 'Enter': {
            text.splice(textCursorPosition, 0, '\n');
            selectorPosition += 1;
            break;
        }
        case 'CapsLock': {
            capsLock = !capsLock;
            capsLockChange();
            break;
        }
        case 'ShiftLeft': {
            shiftPressed = true;
            break;
        }
        case 'ShiftRight': {
            shiftPressed = true;
            break;
        }
        case 'ControlLeft': {
            controlPressed = true;
            break;
        }
        case 'ControlRight': {
            controlPressed = true;
            break;
        }
        case 'MetaLeft': {
            break;
        }
        case 'AltLeft': {
            altPressed = true;
            break;
        }
        case 'AltRight': {
            altPressed = true;
            break;
        }
        case 'ArrowUp': {
            break;
        }
        case 'ArrowLeft': {
            break;
        }
        case 'ArrowDown': {
            break;
        }
        case 'ArrowRight': {
            break;
        }
        default: {
            break;
        }
    }

    monitor.value = text.join('');
    monitor.selectionStart = monitor.selectionEnd = selectorPosition;
}

//Function change symbol register to upper or to lower case according caps lock button
function capsLockChange() {
    let keyButtons = document.querySelectorAll('.symbol-button');
    keyButtons.forEach(keyButton => {
        if (capsLock) {
            keyButton.innerText = keyButton.innerText.toUpperCase();
            keyButton.value = keyButton.value.toUpperCase();
        } 
        else {
            keyButton.innerText = keyButton.innerText.toLowerCase();
            keyButton.value = keyButton.value.toLowerCase();
        }
    });
}

//Unpress special key buttons
function specialKeyButtonUp(keyButton) {
    let keyId = keyButton.id;

    switch (keyId) {
        case 'ShiftLeft': {
            shiftPressed = false;
            break;
        }
        case 'ShiftRight': {
            shiftPressed = false;
            break;
        }
        case 'ControlLeft': {
            controlPressed = false;
            break;
        }
        case 'ControlRight': {
            controlPressed = false;
            break;
        }
        case 'AltLeft': {
            altPressed = false;
            break;
        }
        case 'AltRight': {
            altPressed = false;
            break;
        }
        default: {
            break;
        }
    }
}

//Function changes the language
function changeLanguage() {
    let keyButtons = document.querySelectorAll('.symbol-button');
    keyButtons.forEach(keyButton => {
        let text = keyButton.innerText;
        keyButton.innerText = keyButton.value;
        keyButton.value = text;
    })

}

//Functions handels key combination
function makeKeysCombination() {
    if (keysPressed.length == 2) {
        if (languageChanged) {
            return;
        }

        if (keysPressed.includes('ShiftLeft') || keysPressed.includes('ShiftRight')) {
            if (keysPressed.includes('ControlLeft') || keysPressed.includes('ControlRight')) {
                languageChanged = true;
                let language = localStorage.getItem('language') == 'en' ? 'ru' : 'en';
                localStorage.setItem('language', language);
                changeLanguage(language);
            }
        }
    }
}

//Function saved start selection of the textarea
function saveSelectorPosition() {
    selectorPosition = document.querySelector('.monitor').selectionStart;
}

//The class represents key-button.
class KeyButton extends HTMLButtonElement {
    constructor() {
        super();
        for (let styleProperty in BUTTON_STYLE) {
            this.style[styleProperty] = this.style[styleProperty] == '' ? BUTTON_STYLE[styleProperty] : this.style[styleProperty];
        }
        this.classList.add('button');
    }
}

//The class represents special key-button.
class SpecialButton extends KeyButton {
    constructor() {
        super();
        for (let styleProperty in SPECIAL_BUTTON_STYLE) {
            this.style[styleProperty] = SPECIAL_BUTTON_STYLE[styleProperty];
        }
        this.classList.add('special-button');
    }
}

//The class represents alpha-numeric key-button.
class SymbolButton extends KeyButton {
    constructor() {
        super();
        for (let styleProperty in SYMBOL_BUTTON_STYLE) {
            this.style[styleProperty] = SYMBOL_BUTTON_STYLE[styleProperty];
        }
        this.classList.add('symbol-button');
    }
}