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

//The class represents key-button.
export class KeyButton extends HTMLButtonElement {
    constructor() {
        super();
        for (let styleProperty in BUTTON_STYLE) {
            this.style[styleProperty] = this.style[styleProperty] == '' ? BUTTON_STYLE[styleProperty] : this.style[styleProperty];
        }
        this.classList.add('button');
    }
}

//The class represents special key-button.
export class SpecialButton extends KeyButton {
    constructor() {
        super();
        for (let styleProperty in SPECIAL_BUTTON_STYLE) {
            this.style[styleProperty] = SPECIAL_BUTTON_STYLE[styleProperty];
        }
        this.classList.add('special-button');
    }
}

//The class represents alpha-numeric key-button.
export class SymbolButton extends KeyButton {
    constructor() {
        super();
        for (let styleProperty in SYMBOL_BUTTON_STYLE) {
            this.style[styleProperty] = SYMBOL_BUTTON_STYLE[styleProperty];
        }
        this.classList.add('symbol-button');
    }
}