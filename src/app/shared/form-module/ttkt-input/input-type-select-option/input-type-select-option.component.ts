import { Component, OnInit, ViewChild } from '@angular/core';
import { IDataSelect, InputTypeBase } from '../input-type.interface';

@Component({
  selector: 'ttkt-input-type-select-option',
  templateUrl: './input-type-select-option.component.html',
  styleUrls: ['./input-type-select-option.component.scss']
})
export class InputTypeSelectOptionComponent extends InputTypeBase<IDataSelect> implements OnInit {
  @ViewChild('select') select: any;

  _data: IDataSelect = {
    idType: 'id',
    valueType: 'text',
    outputType: 'id',
    placeholder: '',
    multiple: false,
    disabled: false
  };
  // multiple: boolean = false;
  // placeholder: string = '';
  options: Array<any> = [];
  selectedItem: Array<any> = [];

  set data(data: IDataSelect) {
    for (const key of Object.keys(data)) {
      this._data[key] = data[key];
    }

    if (!data.options || data.options.length === 0) {
      var activeItem = this.select.activeOption;
      if(activeItem) {
        this.select.remove(activeItem);
      }
      this.options = [];
    }
    
    if (data.options) {
      if (data.options instanceof Array) {
        // console.log(data.options);
        this.options = data.options.map(req => this.mappingOption(req));
        this.select.active = this.selectedItem;
      }
    }
  }

  get data() {
    return this._data;
  }

  mappingOption(req: any) {
    const temp = {
      id: req[this.data.idType],
      text: req[this.data.valueType]
    };
    try {
      const value = this.formControlInput.value;
      if (this.data.multiple) {
        if (value instanceof Array && value.findIndex(res => temp.id == res.id) !== -1) {
          this.selectedItem.push(temp);
        }
      } else {
        if (temp.id == value) {
          this.selectedItem = [temp];
        }
      }
    } catch (ex) {
      console.log(ex);
    }
    return temp;
  }

  ngOnInit() {
      const vl = this.formControlInput.value;
      if ( !!vl ) {
          if (this.data.multiple) {
              this.selectedItem = this.options.filter(data => vl.findIndex(vli => vli.id == data.id) !== -1);
          } else {
              this.selectedItem = this.options.filter(data => data.id == vl);
          }
          this.select.active = this.selectedItem;
      }
    this.formControlInput.valueChanges.subscribe(vl => {
        if (!vl) {
        this.select.active = this.selectedItem = [];
        return;
      }
      if (this.data.multiple) {
        this.selectedItem = this.options.filter(data => vl.findIndex(vli => vli.id == data.id) !== -1);
      } else {
        this.selectedItem = this.options.filter(data => data.id == vl);
      }
      this.select.active = this.selectedItem;
    });
  }

  onSelected(event) {
    console.log(this.data.multiple, event);
    if (this.data.multiple) {
      let slI: any = this.formControlInput.value || [];
      if (!(slI instanceof Array)) {
        slI = [];
      }
      slI.push(event);
      this.formControlInput.setValue(slI);
    } else {
      this.formControlInput.setValue(event[this.data.outputType]);
    }
  }

  onRemoved(event) {
    console.log(event, this.data);
    if (this.data.multiple) {
      const slI: Array<any> = this.formControlInput.value;
      const foundIndex = slI.findIndex(item => item[this._data['idType']] == event[this._data['idType']]);
        if (foundIndex > -1) {
            slI.splice(foundIndex, 1);
        }
      this.formControlInput.setValue(slI);
    } else {
      this.formControlInput.setValue('');
    }
    console.log(this.formControlInput.value);
  }

  onType(event) {

  }
}
