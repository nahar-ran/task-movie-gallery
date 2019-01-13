import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import { MdbAutoCompleterComponent } from '../components/mdb-auto-completer.component';
export declare class MdbAutoCompleterDirective implements AfterViewInit, OnDestroy {
    private renderer;
    private el;
    private document;
    mdbAutoCompleter: MdbAutoCompleterComponent;
    ngModelChange: EventEmitter<any>;
    private _autocompleterInputChanges;
    private _clearButton;
    isBrowser: boolean;
    constructor(renderer: Renderer2, el: ElementRef, platformId: string, document: any);
    private _renderClearButton;
    private _setStyles;
    private _addClass;
    private _clearInput;
    protected _handleInput(event: any): void;
    protected _handleKeyDown(event: any): void;
    protected _handleFocusIn(): void;
    protected _handleBlurIn(): void;
    protected _handleMouseDown(): void;
    private _isOpen;
    private _show;
    private _hide;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
