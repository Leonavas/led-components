import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'led-input',
  styleUrl: 'led-input.scss',
  shadow: true
})
export class LedInput {

  @Prop() first: string;
  @Prop() last: string;
  @Prop() placeholder: string = '';

  @State() active: boolean = false;
  @State() value: any;
  @State() isEmpty: boolean = true;

  textInput: HTMLInputElement;

  render() {
    return (
      <div class="outer">
        <label
          class={(this.active ? 'selected' : '')}
          onClick={() => this.handleLabelClick()}>
          {this.placeholder}
          <div></div>
        </label>


        <div class={'inner ' + (this.active ? 'hasFocus' : '')}>
          <input
            id="input"
            ref={(el: HTMLInputElement) => this.textInput = el}
            type="text"
            onInput={(event) => this.handleOnInput(event)}
            onFocus={() => this.handleOnFocus()}
            onBlur={() => this.handleOnBlur()}
          >
          </input>
        </div>
      </div>
    );
  }

  handleLabelClick() {
    this.textInput.focus();
  }

  handleOnInput(event) {
    console.log('onInput')
    console.log(event.target.value);
    this.value = event.target.value;
    if (this.value === '') {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
  }

  handleOnFocus() {
    console.log('onFocus')
    this.active = true;
  }

  handleOnBlur() {
    console.log('Blur')
    if (this.isEmpty) {
      this.active = false
    } else {
      this.active = true
    }
  }

}
