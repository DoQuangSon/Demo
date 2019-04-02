import { Injectable } from "@angular/core";
import { fromEvent, Subject } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class MainLayoutService {

    private readonly mainLayoutClicked$ = new Subject();

    constructor () {
    }

    click() {
        this.mainLayoutClicked$.next();
    }

    onMainLayoutClicked() {
        return this.mainLayoutClicked$.asObservable();
    }

}