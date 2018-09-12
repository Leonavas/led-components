/**
* This is an autogenerated file created by the Stencil compiler.
* It contains typing information for all components that exist in this project.
*/
/* tslint:disable */

import './stencil.core';




export namespace Components {

  interface LedInput {
    'first': string;
    'last': string;
    'placeholder': string;
  }
  interface LedInputAttributes extends StencilHTMLAttributes {
    'first'?: string;
    'last'?: string;
    'placeholder'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'LedInput': Components.LedInput;
  }

  interface StencilIntrinsicElements {
    'led-input': Components.LedInputAttributes;
  }


  interface HTMLLedInputElement extends Components.LedInput, HTMLStencilElement {}
  var HTMLLedInputElement: {
    prototype: HTMLLedInputElement;
    new (): HTMLLedInputElement;
  };

  interface HTMLElementTagNameMap {
    'led-input': HTMLLedInputElement
  }

  interface ElementTagNameMap {
    'led-input': HTMLLedInputElement;
  }


}
export declare function defineCustomElements(window: any): void;