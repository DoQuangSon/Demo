import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TempService {
  private temp:BehaviorSubject<any>=new BehaviorSubject(0);
  constructor() { }
  setValue(value){
    localStorage.setItem('showKB',value);
    this.temp.next(value);
  }
  getvalue():Observable<any>{
    this.setValue(localStorage.getItem('showKB'));
    return this.temp.asObservable();
  }
}
