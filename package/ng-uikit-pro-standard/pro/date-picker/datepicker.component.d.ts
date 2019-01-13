import { IMyLocales } from './interfaces/locale.interface';
import { EventEmitter, OnChanges, SimpleChanges, ElementRef, Renderer2, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IMyDate, IMyMonth, IMyWeek, IMyInputFieldChanged, IMyCalendarViewChanged, IMyInputFocusBlur } from './interfaces/index';
import { LocaleService } from './services/datepickerLocale.service';
import { UtilService } from './services/datepickerUtil.service';
export declare const MYDP_VALUE_ACCESSOR: any;
export declare class MDBDatePickerComponent implements OnChanges, ControlValueAccessor, AfterViewInit {
    elem: ElementRef;
    private renderer;
    private localeService;
    private utilService;
    private cdRef;
    tabIndex: any;
    options: any;
    locale: string;
    defaultMonth: string;
    selDate: string;
    label: string;
    placeholder: string;
    selector: number;
    disabled: boolean;
    dateChanged: EventEmitter<any>;
    inputFieldChanged: EventEmitter<IMyInputFieldChanged>;
    calendarViewChanged: EventEmitter<IMyCalendarViewChanged>;
    calendarToggle: EventEmitter<number>;
    inputFocusBlur: EventEmitter<IMyInputFocusBlur>;
    divFocus: any;
    pickerFrame: ElementRef;
    dateInput: ElementRef;
    isDateSelected: boolean;
    labelActive: boolean;
    showSelector: boolean;
    visibleMonth: IMyMonth;
    selectedMonth: IMyMonth;
    selectedDate: IMyDate;
    weekDays: Array<string>;
    dates: Array<IMyWeek>;
    selectionDayTxt: string;
    invalidDate: boolean;
    disableTodayBtn: boolean;
    dayIdx: number;
    weekDayOpts: Array<string>;
    editMonth: boolean;
    invalidMonth: boolean;
    editYear: boolean;
    invalidYear: boolean;
    prevMonthDisabled: boolean;
    nextMonthDisabled: boolean;
    prevYearDisabled: boolean;
    nextYearDisabled: boolean;
    prevMonthId: number;
    currMonthId: number;
    nextMonthId: number;
    tmp: IMyDate;
    opts: any;
    months: any;
    years: any;
    elements: HTMLCollectionOf<Element>;
    elementNumber: any;
    firstTimeOpenedModal: boolean;
    modalHeightBefore: any;
    isMobile: any;
    isBrowser: any;
    constructor(elem: ElementRef, renderer: Renderer2, localeService: LocaleService, utilService: UtilService, cdRef: ChangeDetectorRef, platformId: string);
    ngAfterViewInit(): void;
    ChangeZIndex(): void;
    onChangeCb: (_: any) => void;
    onTouchedCb: () => void;
    setDisabledState(isDisabled: boolean): void;
    removeInlineStyle(): void;
    setLocaleOptions(): void;
    addLocale(locale: IMyLocales): void;
    setOptions(): void;
    resetMonthYearEdit(): void;
    onUserDateInput(value: string): void;
    onFocusInput(event: any): void;
    onBlurInput(event: any): void;
    onUserMonthInput(value: string): void;
    onUserYearInput(value: string): void;
    isTodayDisabled(): void;
    parseOptions(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    ngOnChanges(changes: SimpleChanges): void;
    hideKeyboard(): void;
    removeBtnClicked(): void;
    openBtnClicked(): void;
    setVisibleMonth(): void;
    monthList(): void;
    yearsList(): void;
    prevMonth(): void;
    nextMonth(): void;
    prevYear(): void;
    nextYear(): void;
    todayClicked(): void;
    cellClicked(cell: any): void;
    cellKeyDown(event: any, cell: any): void;
    clearDate(): void;
    selectDate(date: IMyDate): void;
    updateDateValue(date: IMyDate, clear: boolean): void;
    getDateModel(date: IMyDate): any;
    preZero(val: string): string;
    formatDate(val: any): string;
    monthText(m: number): string;
    weekText(m: string): string;
    getMonthShort(m: number): string;
    getMonthFull(m: number): string;
    monthStartIdx(y: number, m: number): number;
    daysInMonth(m: number, y: number): number;
    daysInPrevMonth(m: number, y: number): number;
    isCurrDay(d: number, m: number, y: number, cmo: number, today: IMyDate): boolean;
    getToday(): IMyDate;
    getTimeInMilliseconds(date: IMyDate): number;
    getWeekday(date: IMyDate): string;
    getDate(year: number, month: number, day: number): Date;
    sundayIdx(): number;
    generateCalendar(m: number, y: number, notifyChange: boolean): void;
    parseSelectedDate(selDate: any): IMyDate;
    parseSelectedMonth(ms: string): IMyMonth;
    setHeaderBtnDisabledState(m: number, y: number): void;
    checkActive(): boolean;
}
