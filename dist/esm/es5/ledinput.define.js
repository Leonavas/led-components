// LedInput: Custom Elements Define Library, ES Module/ES5 Target
import { defineCustomElement } from './ledinput.core.js';
import {
  LedInput
} from './ledinput.components.js';

export function defineCustomElements(window, opts) {
  defineCustomElement(window, [
    LedInput
  ], opts);
}