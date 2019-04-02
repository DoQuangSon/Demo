import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription, Subject } from 'rxjs';
import { IDataText, InputTypeBase } from '../input-type.interface';

@Component({
  selector: 'input-type-text',
  templateUrl: './input-type-text.component.html',
  styleUrls: ['./input-type-text.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class TtktInputTypeTextComponent extends InputTypeBase<IDataText> implements OnInit {
  // data: IDataText;
  placeholder: any = '';
  search: Function;
  isSearch: boolean = false;
  type: Number = 0;//0 bt, 1 search api, 3 get form options - @Todo: define 
  valueType: any;
  filteredOptions: Array<any> = [];
  selected: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('list') list: ElementRef;

  set data(data: IDataText) {
    if (!data) return;
    if (data.placeholder) {
      this.placeholder = data.placeholder;
    }

    if (data.search) {
      this.search = data.search;
      this.isSearch = true;
    }

    if (data.valueType) {
      this.valueType = data.valueType;
    }
    
    if (data.selected) {
      this.selected = data.selected;
    }

    if (data.options) {
      this.type = 3;
      this.setFilterOptions(data.options);
    }
  }

  isOpenList: boolean = false;

  ngOnInit(): void {
    // console.log(this.data, this.formControlInput.value);
    // throw new Error("Method not implemented.");
    if (this.search) {
      this.keyUp.map(event => {
        return event.target ? event.target.value : event;
      })
        .debounceTime(250)
        .subscribe(value => {
          this.search(value).subscribe(req => {
            this.setFilterOptions(req);
            if (this.filteredOptions.length > 0) {
              this.isOpenList = true;
            } else {
              this.isOpenList = false;
            }
          });
        })
    }
  }

  onBlur(event) {
    // trim space
    this.formControlInput.setValue((event.target.value + '').trim(), { emitEvent: false });
  }

  setFilterOptions(req: any) {
    this.filteredOptions = req.map(req => this.mappingOption(req));//fixed

    // console.log(this.filteredOptions);
  }
  onClickInside(data: any) {
    this.isOpenList = false;
    let value = this.valueType ? data.data[this.valueType] : data.data;
    console.log(value, data);
    this.formControlInput.setValue(value);

    this.selected.emit(data);
  }

  onClickInput(event: any) {
    // console.log(this.filteredOptions);
    this.isOpenList = true;
    this.keyUp.next(this.formControlInput.value);

    // if(this.filteredOptions.length > 0) {
    //   this.isOpenList = true;
    // }
  }

  onClick(event) {
    if (!this.list.nativeElement.contains(event.target)) // or some similar check
      // this.filteredOptions= [];
      this.isOpenList = false;
    // else {
    //   this.formControlInput.setValue(event.target)
    // }
  }

  keyUp: Subject<any> = new Subject<any>();

  mappingOption(req: any) {

    let data: any = {};
    data.text = this.valueType ? req[this.valueType] : req;
    console.log(this.valueType, data, req);
    if (this.type != 3)
      data.text = data.text.replace(new RegExp(this.formControlInput.value, 'gi'), function (x) {
        return "<strong>" + x + "</strong>";
      });
    data.data = req;
    // var result: Array<any> = data.match('/'+this.formControlInput.value+'/g');
    // console.log(result);
    return data;

    // return data.replace(result, "<strong>"+ result +"</strong>");
  }
}
