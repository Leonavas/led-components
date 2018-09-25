import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'led-input',
  styleUrl: 'led-input.scss',
  shadow: true
})
export class LedInput {

  @Prop() first: string
  @Prop() last: string
  @Prop() placeholder: string = ''

  @Prop() maskPlaceholder: string = '_'
  @Prop() mask: string

  @Prop() required: boolean = false;

  @State() active: boolean = false
  @State() value: any
  @State() hasMask: boolean = false
  @State() hasError: boolean = false;
  @State() touched: boolean = false;
  @State() pristine: boolean = true;
  @State() dirty: boolean = false;
  
  @State() isEmpty: boolean = true

  textInput: HTMLInputElement

  render() {
    return (
      <div class="outer">
        <label
          class={(this.active ? 'selected' : '') + ' ' + (this.hasError ? 'hasError' : '')}
          onClick={() => this.handleLabelClick()}>
          {this.placeholder}
          <div></div>
        </label>


        <div class={'inner ' + (this.active ? 'hasFocus' : '')  + ' ' + (this.hasError ? 'hasError' : '')}>
          <input
            id="input"
            ref={(el: HTMLInputElement) => this.textInput = el}
            type="text"
            onKeyDown={(event) => this.handleOnKeyDown(event)}
            onKeyPress={(event) => this.handleOnKeyPress(event)}
            onFocus={() => this.handleOnFocus()}
            onBlur={() => this.handleOnBlur()}
          >
          </input>
        </div>
        {this.hasError
          ? <div class="error-message">
            <span>Required</span>
          </div>
          : <div class="space-holder"></div>
        }

      </div>
    );
  }

  // @Listen('submit')
  // submitHandler(event: CustomEvent) {
  //   console.log('A submit was pressed: ', event.detail);
  //   event.preventDefault();
  // }

  componentDidLoad() {
    if (typeof (this.mask) !== 'undefined') {
      this.hasMask = true;
      this.textInput.maxLength = this.mask.length
    }

    //GETTING SUBMIT EVENT TO TRIGGER VALIDATIONS
    document.addEventListener('submit', (event) => {
      console.log('A submit was pressed: ', event);
      event.preventDefault();
    })
  }

  inputedLendgth() {
    return (this.textInput.value.match(new RegExp('_', 'g')) || []).length - 1;
  }

  skipNext(pos) {
    // if next position is a fixed character placeholder...
    const mask = this.mask
      .replace(new RegExp('9', 'g'), this.maskPlaceholder)
      .replace(new RegExp('A', 'g'), this.maskPlaceholder)
    if (mask.charAt(pos) !== this.maskPlaceholder) {
      let skippedChars = 1;

      for (let i = pos + 1; i < mask.length - 1; i++) {
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
    const mask = this.mask
      .replace(new RegExp('9', 'g'), this.maskPlaceholder)
      .replace(new RegExp('A', 'g'), this.maskPlaceholder)
    if (mask.charAt(pos - 1) !== this.maskPlaceholder) {
      let skippedChars = 0;

      for (let i = pos - 1; i >= 0; i--) {
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

  handleOnKeyPress(event) {
    if (this.hasMask) {
      const cursorPosition = this.textInput.selectionStart
      if (event.key.length === 1) {
        switch (this.mask.charAt(cursorPosition)) {
          case 'A':
            if (!event.key.match(/[a-zA-Z]/i)) {
              event.preventDefault();
              this.textInput.setSelectionRange(this.textInput.selectionStart, this.textInput.selectionStart)
              return false;
            }
            break;
          case '9':
            if (!event.key.match(/[0-9]/i)) {
              event.preventDefault();
              this.textInput.setSelectionRange(this.textInput.selectionStart, this.textInput.selectionStart)
              return false;
            }
            break;
          default:

        }
      }
    }

  }

  handleOnKeyDown(event) {
    if (!this.dirty) {
      this.dirty = true;
    }
    if (this.hasMask) {
      const cursorPosition = this.textInput.selectionStart

      if (
        (this.textInput.selectionEnd === this.textInput.selectionStart) &&
        (event.key.length === 1) ||
        (event.key === 'Backspace')
      ) {

        let skipChars = 0
        if (event.key === 'Backspace') {
          if (this.textInput.selectionEnd !== this.textInput.selectionStart) {
            skipChars = 1
          } else {
            skipChars = this.skipPrev(cursorPosition)
          }

          this.textInput.setSelectionRange(cursorPosition - 1 + skipChars, cursorPosition + skipChars)
        } else {
          skipChars = this.skipNext(cursorPosition)
          this.textInput.setSelectionRange(cursorPosition + skipChars, cursorPosition + 1 + skipChars)
        }
      }

      setTimeout(() => {
        this.fixMask(this.textInput.selectionStart)
      }, 1)
    }


  }

  fixMask(currentPos) {
    if (this.textInput.value.length !== this.mask.length) {
      const formattedMask = this.mask
        .replace(new RegExp('9', 'g'), this.maskPlaceholder)
        .replace(new RegExp('A', 'g'), this.maskPlaceholder)
      const firstPiece = this.textInput.value.substring(0, this.textInput.selectionStart)
      //TODO: Check if there are content after cursor and merge it with mask if there isnt

      const lastPiece = formattedMask.substring(this.textInput.selectionStart, formattedMask.length)

      this.textInput.value = firstPiece + lastPiece

      this.textInput.setSelectionRange(currentPos, currentPos)
    }
  }

  handleOnFocus() {
    this.active = true
    // this.handleInputState()

    if (this.hasMask) {
      const formattedMask = this.mask
        .replace(new RegExp('9', 'g'), this.maskPlaceholder)
        .replace(new RegExp('A', 'g'), this.maskPlaceholder)
      if (this.active) {
        if (this.checkIsEmpty()) {
          setTimeout(() => {
            this.textInput.value = formattedMask
            this.textInput.setSelectionRange(0, 0)
          }, 10)
        } else {
          setTimeout(() => {
            //this.textInput.value = formattedMask
            const pos = this.textInput.value.indexOf('_')
            this.textInput.setSelectionRange(pos, pos)
          }, 10)
        }
      }
    }

  }

  checkIsEmpty() {
    if (this.hasMask) {
      const formattedMask = this.mask
        .replace(new RegExp('9', 'g'), this.maskPlaceholder)
        .replace(new RegExp('A', 'g'), this.maskPlaceholder)
      this.isEmpty = this.textInput.value === null || this.textInput.value === '' || this.textInput.value === formattedMask
      return this.isEmpty
    } else {
      this.isEmpty = this.textInput.value === null || this.textInput.value === ''
      return this.isEmpty
    }

  }

  handleOnBlur() {
    if (this.checkIsEmpty()) {
      this.active = false
    } else {
      this.active = true
    }

    this.checkIsEmpty();

    this.touched = true;

    if (this.dirty) {
      this.pristine = false;
    }

    this.triggerValidations()
  }

  triggerValidations() {
    if (typeof(this.required) !== 'undefined' && this.required && this.isEmpty) {
      if (!this.pristine) {
        this.hasError = true
      }
    } else {
      this.hasError = false
    }
  }

}
