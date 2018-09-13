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

  @Prop() maskPlaceholder: string = '_';
  @Prop() mask: string;

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

  componentDidLoad() {
    if (typeof(this.mask) !== 'undefined') {
      this.textInput.maxLength = this.mask.length + 1
    }
    
  }

  handleInputState(type?) {
    if (typeof(type) === 'undefined') {
      type = 'insertText'
    }
    const formattedMask = this.mask.replace(new RegExp('9', 'g'), this.maskPlaceholder)
    if (typeof(this.mask) !== 'undefined' && this.active) {
      if (this.textInput.value == '') {
        setTimeout(() => {
          this.textInput.value = formattedMask
          this.textInput.setSelectionRange(0,0)
        }, 10)
      } else {

        const cursorPosition = this.textInput.selectionStart
        let skipChars = 0
        if (type === 'insertText') {
          skipChars = this.skipNext(cursorPosition)
        } else {
          skipChars = this.skipPrev(cursorPosition)
        }
        if (this.canInput(cursorPosition) || type !== 'insertText') {
          const firstPiece = this.textInput.value.substring(0, this.textInput.selectionStart)
          //TODO: Check if there are content after cursor and merge it with mask if there isnt
          const lastPiece = formattedMask.substring(this.textInput.selectionStart, formattedMask.length)

          this.textInput.value = firstPiece + lastPiece
          this.textInput.setSelectionRange(cursorPosition + skipChars, cursorPosition + skipChars)
        } else {

        }

        if (this.isLast(cursorPosition)) {
          this.textInput.maxLength = this.mask.length
        } else {
          this.textInput.maxLength = this.mask.length + 1
        }
        
      }
    } else if (typeof(this.mask) !== 'undefined') {
      setTimeout(() => {
        this.textInput.value = ''
      }, 10)
    }
  }

  canInput(pos) {

    if (this.mask.replace(new RegExp('9', 'g'), this.maskPlaceholder).charAt(pos - 1) === this.maskPlaceholder) {
      return true;
    } else {
      return false;
    }
  }

  isLast(pos) {
    if (pos === this.mask.length) {
      return true;
    }
    return false;
  }

  skipNext(pos) {
    // if next position is a fixed character placeholder...
    const mask = this.mask.replace(new RegExp('9', 'g'), this.maskPlaceholder)
    if (mask.charAt(pos) !== this.maskPlaceholder) {
      let skippedChars = 1;

      for (let i = pos + 1; i < mask.length -1; i++) {
        if (mask.charAt(i) !== this.maskPlaceholder) {
          skippedChars += 1
        } else {
          break
        }
      }

      return skippedChars;
    } else {
      return 0
    }
  }

  skipPrev(pos) {
    // if next position is a fixed character placeholder...
    const mask = this.mask.replace(new RegExp('9', 'g'), this.maskPlaceholder)
    if (mask.charAt(pos) !== this.maskPlaceholder) {
      let skippedChars = 0;

      for (let i = pos; i >= 0; i--) {
        if (mask.charAt(i) !== this.maskPlaceholder) {
          skippedChars -= 1
        } else {
          break
        }
      }

      return skippedChars;
    } else {
      return 0
    }
  }

  handleLabelClick() {
    this.textInput.focus();
  }

  handleOnInput(event) {
    //console.log(event.inputType)
    //console.log('onInput')
    this.value = event.target.value
    if (this.value === '') {
      this.isEmpty = true
    } else {
      this.isEmpty = false
    }
    this.handleInputState(event.inputType)
  }

  handleOnFocus() {
    //console.log('onFocus')
    this.active = true
    this.handleInputState()
  }

  handleOnBlur() {
    //console.log('Blur')
    if (this.isEmpty) {
      this.active = false
    } else {
      this.active = true
    }
    this.handleInputState();
  }

}
