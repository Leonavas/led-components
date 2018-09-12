import '../../stencil.core';
export declare class LedInput {
    first: string;
    last: string;
    placeholder: string;
    active: boolean;
    value: any;
    isEmpty: boolean;
    textInput: HTMLInputElement;
    render(): JSX.Element;
    handleLabelClick(): void;
    handleOnInput(event: any): void;
    handleOnFocus(): void;
    handleOnBlur(): void;
}
