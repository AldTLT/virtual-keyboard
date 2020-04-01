onload = function () {
    load();
};

const ACTIVE_BUTTON_STYLE = {
    backgroundColor: '#999999',
}

const WRAPPER_STYLE = {
    display: 'flex',
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
};

const LINE_1_BUTTONS = {
    Backquote: '`',
    Digit1: '1',
    Digit2: '2',
    Digit3: '3',
    Digit4: '4',
    Digit5: '5',
    Digit6: '6',
    Digit7: '7',
    Digit8: '8',
    Digit9: '9',
    Digit0: '0',
    Minus: '-',
    Equal: '+'
}

const LINE_2_BUTTONS = {
    KeyQ: 'Q',
    KeyW: 'W',
    KeyE: 'E',
    KeyR: 'R',
    KeyT: 'T',
    KeyY: 'Y',
    KeyU: 'U',
    KeyI: 'I',
    KeyO: 'O',
    KeyP: 'P',
    BracketLeft: '[',
    BracketRight: ']',
    Backslash: '\\'
}

const LINE_3_BUTTONS = {
    KeyA: 'A',
    KeyS: 'S',
    KeyD: 'D',
    KeyF: 'F',
    KeyG: 'G',
    KeyH: 'H',
    KeyJ: 'J',
    KeyK: 'K',
    KeyL: 'L',
    Semicolon: ';',
    Quote: '\''
}

const LINE_4_BUTTONS = {
    KeyZ: 'Z',
    KeyX: 'X',
    KeyC: 'C',
    KeyV: 'V',
    KeyB: 'B',
    KeyN: 'N',
    KeyM: 'M',
    Comma: ',',
    Period: '.',
    Slash: '/'
}

let textCursorPosition = 0;

function load() {
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
    keyboard.append(getKey('Space', ' ', 11));
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
function getKey(id, text, length) {
    let key = document.createElement('button', 'symbol-key-button');
    key.id = id;
    key.innerText = text;
    key.style.gridColumn = length !== undefined ? `span ${length}` : 'span 2';
    return key;
}

//Event mouse button down
function onMouseDown(event) {
    let target = event.target;
    if (target.classList.contains('button')) {
        keyButtonPressed(target);
        //     let newEvent = new KeyboardEvent('keydown', {code: target.id, key: target.innerText });
        //    let monitor = document.querySelector('.monitor');
        //     monitor.dispatchEvent(newEvent);
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
        // printSymbol(keyButton);
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
    keyButton.style.backgroundColor = '#999999';
}

//The function applies the style to the released key-button
function keyButtonReleased(keyButton) {
    if (keyButton.classList.contains('symbol-button')) {
        keyButton.style.backgroundColor = BUTTON_STYLE.backgroundColor;
    }
    if (keyButton.classList.contains('special-button')) {
        keyButton.style.backgroundColor = SPECIAL_BUTTON_STYLE.backgroundColor;
    }
}

//Function adds symbol to textarea
function printSymbol(keyButton, monitor) {    
    let text = monitor.value;
    let textCursorPosition = monitor.selectionStart;

    monitor.value = addSymbol(keyButton.textContent, text);
}

//Function implements special key buttons click
function getSpecialButtonFunction(keyButton, monitor) {
    let keyId = keyButton.id;
    let text = monitor.value.split('');
    let textCursorPosition = monitor.selectionStart;

    switch(keyId) {
        case 'Backspace': {
            text.splice(textCursorPosition - 1, 1);
            break;
        }
        case 'Delete': {
            text.splice(textCursorPosition, 1);
            break;
        }
        case 'Tab': {
            text.splice(textCursorPosition, 0, '\t');
            break;
        }
        case 'Enter': {
            text.splice(textCursorPosition, 0, '\n');
            break;
        }
        case 'CapsLock': {
            break;
        }
        case 'ShiftLeft': {
            break;
        }
        case 'ShiftRight': {
            break;
        }
        case 'ControlLeft': {
            break;
        }
        case 'ControlRight': {
            break;
        }
        case 'MetaLeft': {
            break;
        }
        case 'AltLeft': {
            break;
        }
        case 'AltRight': {
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
}

//Function adds symbol to text
function addSymbol(symbol, text) {
    return text += symbol;
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