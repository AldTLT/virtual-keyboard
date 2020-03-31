onload = function () {
    load();
};

const KEYBOARD_STYLE = {
    display: 'grid',
    gridTemplate: 'repeat(10, 20px) / repeat(31, 20px)'
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
    let div = document.createElement('div');
    div.className = 'keyboard';
    for (let styleProperty in KEYBOARD_STYLE) {
        div.style[styleProperty] = KEYBOARD_STYLE[styleProperty];
    }
    document.body.append(div);
    customElements.define('key-button', KeyButton, { extends: 'button' });
    customElements.define('special-key-button', SpecialButton, { extends: 'button' });

    //Line buttons 1
    createKeys(LINE_1_BUTTONS, div);
    createSpecialKey('Backspace', 'Backspace', div, 5);
    //Line buttons 2
    createSpecialKey('Tab', 'Tab', div, 3);
    createKeys(LINE_2_BUTTONS, div);
    createSpecialKey('Delete', 'Delete', div);
    //Line buttons 3
    createSpecialKey('CapsLock', 'Caps Lock', div, 4);
    createKeys(LINE_3_BUTTONS, div);
    createSpecialKey('Enter', 'Enter', div, 5);
    //Line buttons 4
    createSpecialKey('ShiftLeft', 'Shift', div, 5);
    createKeys(LINE_4_BUTTONS, div);
    createSpecialKey('ArrowUp', '^', div);
    createSpecialKey('ShiftRight', 'Shift', div, 4);
    //Line buttons 5
    createSpecialKey('ControlLeft', 'Ctrl', div, 3);
    createSpecialKey('MetaLeft', 'Meta', div);
    createSpecialKey('AltLeft', 'Alt', div);
    createSpecialKey('Space', ' ', div, 11);
    createSpecialKey('AltRight', 'Alt', div);
    createSpecialKey('ControlRight', 'Ctrl', div, 3);
    createSpecialKey('ArrowLeft', '<', div);
    createSpecialKey('ArrowDown', 'v', div);
    createSpecialKey('ArrowRight', '>', div);
}

//Function creates key-buttons from object and appends to page.
function createKeys(keys, div) {
    for (let key in keys) {
        let keyButton = getKey(key, keys[key]);
        div.append(keyButton);
    }
}

//Function creates a functional key-button and appends to page.
function createSpecialKey(key, text, div, length) {
    let keyButton = document.createElement('button', 'special-key-button');
    keyButton.id = key;
    keyButton.innerText = text;
    keyButton.style.gridColumn = length !== undefined ? `span ${length}` : 'span 2';
    // debugger;    
    div.append(keyButton);
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