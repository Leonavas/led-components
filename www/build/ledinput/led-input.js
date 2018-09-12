/*! Built with http://stenciljs.com */
const { h } = window.LedInput;

class LedInput {
    constructor() {
        this.placeholder = '';
        this.active = false;
        this.isEmpty = true;
    }
    render() {
        return (h("div", { class: "outer" },
            h("label", { class: (this.active ? 'selected' : ''), onClick: () => this.handleLabelClick() }, this.placeholder),
            h("div", { class: 'inner ' + (this.active ? 'hasFocus' : '') },
                h("input", { id: "input", ref: (el) => this.textInput = el, type: "text", onInput: (event) => this.handleOnInput(event), onFocus: () => this.handleOnFocus(), onBlur: () => this.handleOnBlur() }))));
    }
    handleLabelClick() {
        this.textInput.focus();
    }
    handleOnInput(event) {
        console.log('onInput');
        console.log(event.target.value);
        this.value = event.target.value;
        if (this.value === '') {
            this.isEmpty = true;
        }
        else {
            this.isEmpty = false;
        }
    }
    handleOnFocus() {
        console.log('onFocus');
        this.active = true;
    }
    handleOnBlur() {
        console.log('Blur');
        if (this.isEmpty) {
            this.active = false;
        }
        else {
            this.active = true;
        }
    }
    static get is() { return "led-input"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "active": {
            "state": true
        },
        "first": {
            "type": String,
            "attr": "first"
        },
        "isEmpty": {
            "state": true
        },
        "last": {
            "type": String,
            "attr": "last"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "value": {
            "state": true
        }
    }; }
    static get style() { return ":host {\n  --led-input-font: Roboto;\n  font-family: Roboto; }\n  :host label {\n    cursor: text;\n    padding-left: 4px;\n    padding-right: 4px;\n    background: white;\n    color: #5f6368;\n    position: absolute;\n    margin-bottom: 0;\n    -webkit-transform: translate3d(12px, 20px, 0);\n    transform: translate3d(12px, 20px, 0);\n    -webkit-transform-origin: left top;\n    transform-origin: left top;\n    -webkit-transition: -webkit-transform 150ms ease-in-out;\n    transition: -webkit-transform 150ms ease-in-out;\n    transition: transform 150ms ease-in-out;\n    transition: transform 150ms ease-in-out, -webkit-transform 150ms ease-in-out; }\n  :host .selected {\n    color: #604C8D;\n    transform: translate3d(12px, 0, 0) scale(0.8);\n    -webkit-transform: translate3d(12px, 0, 0) scale(0.8);\n    font-weight: bold; }\n  :host .outer {\n    padding-top: 5px;\n    display: \"table\"; }\n  :host .inner {\n    border: 1px solid #5f6368;\n    margin-top: 6px;\n    border-radius: 5px;\n    padding-top: 15px; }\n    :host .inner.hasFocus {\n      border: 2px solid #604C8D; }\n  :host input {\n    border: 0px;\n    width: 100%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    height: 34px;\n    font-size: 16px;\n    padding-left: 14px;\n    padding-right: 14px;\n    margin-top: -10px;\n    margin-bottom: 4px; }\n  :host input:focus {\n    outline: 0; }"; }
}

export { LedInput };
