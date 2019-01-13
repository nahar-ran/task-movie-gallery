import { AfterContentInit, QueryList, OnDestroy } from '@angular/core';
import { ScrollSpyLinkDirective } from './scroll-spy-link.directive';
import { ScrollSpyService } from './scroll-spy.service';
export declare class ScrollSpyDirective implements AfterContentInit, OnDestroy {
    private scrollSpyService;
    links: QueryList<ScrollSpyLinkDirective>;
    id: string;
    private _id;
    constructor(scrollSpyService: ScrollSpyService);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
