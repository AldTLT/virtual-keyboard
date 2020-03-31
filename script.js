onload = function () {
    load();
};

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

function load() {
    //Create container
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
    customElements.define('key-button', KeyButton, { extends: 'button' });
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
    createSpecialKey('Space', ' ', keyboard, 11);
    createSpecialKey('AltRight', 'Alt', keyboard);
    createSpecialKey('ControlRight', 'Ctrl', keyboard, 3);
    createSpecialKey('ArrowLeft', '<', keyboard);
    createSpecialKey('ArrowDown', 'v', keyboard);
    createSpecialKey('ArrowRight', '>', keyboard);
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
    let key = document.createElement('button', 'key-button');
    key.id = id;
    key.innerText = text;
    key.style.gridColumn = length !== undefined ? `span ${length}` : 'span 2';
    return key;
}



//The class represents key-button.
class KeyButton extends HTMLButtonElement {
    constructor(width) {
        super();
        for (let styleProperty in BUTTON_STYLE) {
            // debugger;
            this.style[styleProperty] = this.style[styleProperty] == '' ? BUTTON_STYLE[styleProperty] : this.style[styleProperty];
        }
        this.className = 'button';
    }
}

//The class represents special key-button.
class SpecialButton extends KeyButton {
    constructor() {
        super();
        for (let styleProperty in SPECIAL_BUTTON_STYLE) {
            this.style[styleProperty] = SPECIAL_BUTTON_STYLE[styleProperty];
        }
        this.className = 'special-button';
    }
}

class SymbolButton extends KeyButton {

}