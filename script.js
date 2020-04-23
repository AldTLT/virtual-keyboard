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
};

const WRAPPER_STYLE = {
  display: 'flex',
  width: '700px',
  flexWrap: 'wrap',
  margin: '0 auto',
};

const MONITOR_STYLE = {
  width: '600px',
  height: '250px',
  margin: '10px auto',
  border: '2px solid #111111',
  backgroundColor: '#dddddd',
  resize: 'none',
};

const KEYBOARD_STYLE = {
  display: 'grid',
  gridTemplate: 'repeat(10, 20px) / repeat(31, 20px)',
  margin: '0 auto',
};

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
  fontWeight: '600',
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
};

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
};

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
};

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
};

const INFO_STYLE = {
  margin: '0 50px',
  fontSize: '20px',
  color: '#264458',
};

const OS_INFO_TEXT = 'Клавиатура создавалась для ОС Windows.';
const LANGUAGE_CHANGE_INFO_TEXT = 'Для смены языка нажмите Ctrl+Shift. Используйте мышь и клавиатуру в любой комбинации.';

onload = function () {
  // Set localstorage
  if (!localStorage.language) {
    localStorage.setItem('language', 'en');
  }

  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  Object.assign(wrapper.style, WRAPPER_STYLE);

  // Create div info
  const osInfoDiv = document.createElement('div');
  wrapper.append(osInfoDiv);

  // Create os info
  const osInfoP = document.createElement('p');
  osInfoP.className = 'information';
  osInfoP.innerText = OS_INFO_TEXT;
  Object.assign(osInfoP.style, INFO_STYLE);
  osInfoDiv.append(osInfoP);

  // Create language change info
  const languageInfoP = document.createElement('p');
  languageInfoP.className = 'information';
  languageInfoP.innerText = LANGUAGE_CHANGE_INFO_TEXT;
  Object.assign(languageInfoP.style, INFO_STYLE);
  osInfoDiv.append(languageInfoP);

  // Create monitor
  const monitor = document.createElement('textarea');
  monitor.className = 'monitor';
  Object.assign(monitor.style, MONITOR_STYLE);
  wrapper.append(monitor);

  // Create keyboard
  const keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  Object.assign(keyboard.style, KEYBOARD_STYLE);
  wrapper.append(keyboard);

  // Append wrapper
  document.body.append(wrapper);

  customElements.define('symbol-key-button', SymbolButton, { extends: 'button' });
  customElements.define('special-key-button', SpecialButton, { extends: 'button' });

  // Line buttons 1
  createKeys(LINE_1_BUTTONS, keyboard);
  createSpecialKey('Backspace', 'Backspace', keyboard, 5);
  // Line buttons 2
  createSpecialKey('Tab', 'Tab', keyboard, 3);
  createKeys(LINE_2_BUTTONS, keyboard);
  createSpecialKey('Delete', 'Del', keyboard);
  // Line buttons 3
  createSpecialKey('CapsLock', 'Caps Lock', keyboard, 4);
  createKeys(LINE_3_BUTTONS, keyboard);
  createSpecialKey('Enter', 'Enter', keyboard, 5);
  // Line buttons 4
  createSpecialKey('ShiftLeft', 'Shift', keyboard, 5);
  createKeys(LINE_4_BUTTONS, keyboard);
  createSpecialKey('ArrowUp', '🡅', keyboard);
  createSpecialKey('ShiftRight', 'Shift', keyboard, 4);
  // Line buttons 5
  createSpecialKey('ControlLeft', 'Ctrl', keyboard, 3);
  createSpecialKey('MetaLeft', 'Meta', keyboard);
  createSpecialKey('AltLeft', 'Alt', keyboard);
  keyboard.append(getKey('Space', [' ', ' '], 11));
  createSpecialKey('AltRight', 'Alt', keyboard);
  createSpecialKey('ControlRight', 'Ctrl', keyboard, 3);
  createSpecialKey('ArrowLeft', '🡄', keyboard);
  createSpecialKey('ArrowDown', '🡇', keyboard);
  createSpecialKey('ArrowRight', '🡆', keyboard);

  document.querySelector('#Space').style.gridColumn = 'span 11';
  // Events
  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
  document.addEventListener('mouseout', onMouseOut);
}

// Function creates key-buttons from object and appends to page.
function createKeys(keys, domElement) {
  for (const key in keys) {
    const keyButton = getKey(key, keys[key], domElement);
    domElement.append(keyButton);
  }
}

// Function creates a functional key-button and appends to page.
function createSpecialKey(key, text, domElement, length) {
  const keyButton = document.createElement('button', 'special-key-button');
  domElement.append(keyButton);
  keyButton.id = key;
  keyButton.innerText = text;
  keyButton.style.gridColumn = length !== undefined ? `span ${length}` : 'span 2';
}

// Function returns the key-button.
function getKey(id, keyText, length) {
  let text;
  let value;
  if (localStorage.getItem('language') === 'en') {
    text = keyText[0];
    value = keyText[1];
  } else {
    text = keyText[1];
    value = keyText[0];
  };

  const keyButton = document.createElement('button', 'symbol-key-button');
  keyButton.id = id;
  keyButton.innerText = text.toLowerCase();
  keyButton.value = value.toLowerCase();
  keyButton.style.gridColumn = length ? `span ${length}` : 'span 2';
  return keyButton;
}

// Event mouse button down
function onMouseDown(event) {
  const { target } = event;
  if (target.classList.contains('button')) {
    const monitor = document.querySelector('.monitor');
    if (target.classList.contains('symbol-button')) {
      printSymbol(target, monitor);
    }

    if (target.classList.contains('special-button')) {
      getSpecialButtonFunction(target, monitor);
    }
    keyButtonPressed(target);
  }
}

// Event mouse button up
function onMouseUp(event) {
  const monitor = document.querySelector('.monitor');
  const keyButton = event.target;
  keyButtonReleased(keyButton);
  specialKeyButtonUp(keyButton);
  monitor.focus();
}

// Event key button down
function onKeyDown(event) {
  const keyButton = document.querySelector(`#${event.code}`);
  const monitor = document.querySelector('.monitor');

  if (!keyButton) {
    return;
  }

  if (keyButton.classList.contains('button')) {
    if (keyButton.classList.contains('symbol-button')) {
      event.preventDefault();
      printSymbol(keyButton, monitor);
    }

    if (keyButton.id === 'ShiftLeft' || keyButton.id === 'ShiftRight') {
      event.preventDefault();
      toUpperOrLowerCase(!capsLock);
    }

    if (keyButton.id === 'Tab') {
      event.preventDefault();
      getSpecialButtonFunction(keyButton, monitor);
    }

    keyButtonPressed(keyButton);
  }
}

// Event key button down
function onKeyUp(event) {
  const keyButton = document.querySelector(`#${event.code}`);

  if (!keyButton) {
    return;
  }

  if (keyButton.classList.contains('button')) {
    if (keyButton.id === 'ShiftLeft' || keyButton.id === 'ShiftRight') {
      event.preventDefault();
      toUpperOrLowerCase(capsLock);
    }

    keyButtonReleased(keyButton);
  }
}

// Event mouse leave a target
function onMouseOut(event) {
  keyButtonReleased(event.target);
}

// The function applies the style to the pressed key-button
function keyButtonPressed(keyButton) {
  keyButton.style.backgroundColor = '#999999';

  if (keyButton.classList.contains('special-button')) {
    // Save key to array
    if (!keysPressed.includes(keyButton.id)) {
      keysPressed.push(keyButton.id);
    }
  }

  makeKeysCombination();

  // Compute scaleX to transform key button
  let { width } = window.getComputedStyle(keyButton);
  width = width.substring(0, width.length - 2);
  const scaleX = 1 - (4 / width).toFixed(3);
  keyButton.style.transform = `scale(${scaleX}, 0.9)`;
}

// The function applies the style to the released key-button
function keyButtonReleased(keyButton) {
  if (keyButton.classList.contains('symbol-button')) {
    keyButton.style.backgroundColor = BUTTON_STYLE.backgroundColor;
  }
  if (keyButton.classList.contains('special-button')) {
    // Delete key button from array
    if (keysPressed.includes(keyButton.id)) {
      keysPressed = keysPressed.filter((keyId) => keyId != keyButton.id);
    }

    keyButton.style.backgroundColor = SPECIAL_BUTTON_STYLE.backgroundColor;
  }

  saveSelectorPosition();
  keyButton.style.transform = keyRelisedStyleTransform;
  languageChanged = false;
}

// The function registers pressed key buttons
function getPressedKeyButtons(keyButton) {
  keysPressed.push(keyButton.id);
}

// The function adds symbol to textarea
function printSymbol(keyButton, monitor) {
  let symbol = keyButton.id === 'Space' ? ' ' : keyButton.innerText;
  saveSelectorPosition();
  const text = monitor.value;
  monitor.value = text.substring(0, selectorPosition) + symbol + text.substring(selectorPosition);
  monitor.selectionStart = monitor.selectionEnd = selectorPosition + 1;
}

// The function implements special key buttons click
function getSpecialButtonFunction(keyButton, monitor) {
  const keyId = keyButton.id;
  const text = monitor.value.split('');
  const textCursorPosition = monitor.selectionStart;
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
      keyButton.style.border = capsLock ? '2px solid #32d432' : '2px solid #234567';
      toUpperOrLowerCase(capsLock);
      break;
    }
    case 'ShiftLeft': {
      toUpperOrLowerCase(!capsLock);
      shiftPressed = true;
      break;
    }
    case 'ShiftRight': {
      toUpperOrLowerCase(!capsLock);
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
    case 'AltLeft': {
      altPressed = true;
      break;
    }
    case 'AltRight': {
      altPressed = true;
      break;
    }
    case 'ArrowUp': {
      setArrowUpPosition();
      break;
    }
    case 'ArrowLeft': {
      monitor.selectionStart = selectorPosition > 0 ? selectorPosition - 1 : 0;
      saveSelectorPosition();
      break;
    }
    case 'ArrowDown': {
      setArrowDownPosition();
      break;
    }
    case 'ArrowRight': {
      monitor.selectionStart = selectorPosition < monitor.textLength ? selectorPosition + 1 : selectorPosition;
      saveSelectorPosition();
      break;
    }
    default: {
      break;
    }
  }

  monitor.value = text.join('');
  monitor.selectionStart = monitor.selectionEnd = selectorPosition;
}

// The function moves cursor position up
function setArrowUpPosition() {
  const monitor = document.querySelector('.monitor');
  let text = monitor.value;
  let cursorPosition = 0;
  text = text.substring(0, selectorPosition).split('\n');
  const row = text.length;
  if (text.length > 1) {
    const shift = text[text.length - 1].length;
    text.pop();
    text[text.length - 1] = text[text.length - 1].substr(0, shift);

    cursorPosition = text.join('\n').length;
  } else {
    cursorPosition = monitor.selectionStart;
  }
  monitor.selectionStart = monitor.selectionEnd = cursorPosition;
  saveSelectorPosition();
}

// The function moves cursor position down
function setArrowDownPosition() {
  const monitor = document.querySelector('.monitor');
  const text = monitor.value;
  const arrowTextAfter = text.substring(selectorPosition).split('\n');
  const shiftAfter = arrowTextAfter[0].length;
  const arrowTextBefore = text.substring(0, selectorPosition).split('\n');
  let shiftBefore = arrowTextBefore[arrowTextBefore.length - 1].length;
  shiftBefore = arrowTextAfter.length > 1 ? Math.min(shiftBefore, arrowTextAfter[1].length) : 0;

  monitor.selectionStart = monitor.selectionEnd = monitor.selectionStart + shiftBefore + shiftAfter + 1;
  saveSelectorPosition();
}


// The function converts characters to upper or lower case
function toUpperOrLowerCase(toUpper) {
  document.querySelectorAll('.symbol-button').forEach((button) => {
    if (toUpper) {
      button.style.textTransform = 'uppercase';
    } else {
      button.style.textTransform = 'lowercase';
    }
  });
}

// Unpress special key buttons
function specialKeyButtonUp(keyButton) {
  const keyId = keyButton.id;

  switch (keyId) {
    case 'ShiftLeft': {
      shiftPressed = false;
      break;
    }
    case 'ShiftRight': {
      toUpperOrLowerCase(capsLock);
      shiftPressed = false;
      break;
    }
    case 'ControlLeft': {
      toUpperOrLowerCase(capsLock);
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

  if (!shiftPressed) {
    toUpperOrLowerCase(capsLock);
  }
}

// Function changes the language
function changeLanguage() {
  const keyButtons = document.querySelectorAll('.symbol-button');
  keyButtons.forEach((keyButton) => {
    const text = keyButton.innerText;
    keyButton.innerText = keyButton.value;
    keyButton.value = text;
  });
}

// Functions handels key combination
function makeKeysCombination() {
  if (keysPressed.length === 2) {
    if (languageChanged) {
      return;
    }

    if (keysPressed.includes('ShiftLeft') || keysPressed.includes('ShiftRight')) {
      if (keysPressed.includes('ControlLeft') || keysPressed.includes('ControlRight')) {
        languageChanged = true;
        const language = localStorage.getItem('language') === 'en' ? 'ru' : 'en';
        localStorage.setItem('language', language);
        changeLanguage();
      } else {
        toUpperOrLowerCase(!capsLock);
      }
    }
  }
}

// Function saved start selection of the textarea
function saveSelectorPosition() {
  selectorPosition = document.querySelector('.monitor').selectionStart;
}

// The class represents key-button.
class KeyButton extends HTMLButtonElement {
  constructor() {
    super();
    // for (const styleProperty in BUTTON_STYLE) {
    //   this.style[styleProperty] = this.style[styleProperty] === '' ? BUTTON_STYLE[styleProperty] : this.style[styleProperty];
    // }
    Object.assign(this.style, BUTTON_STYLE);
    this.classList.add('button');
  }
}

// The class represents special key-button.
class SpecialButton extends KeyButton {
  constructor() {
    super();
    Object.assign(this.style, SPECIAL_BUTTON_STYLE);
    this.classList.add('special-button');
  }
}

// The class represents alpha-numeric key-button.
class SymbolButton extends KeyButton {
  constructor() {
    super();
    this.classList.add('symbol-button');
  }
}
