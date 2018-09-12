export class LedInput {
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
    static get style() { return "/**style-placeholder:led-input:**/"; }
}
