/* tslint:disable */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeBuilderService {
  public YEAR: string = 'year';
  cconstructor() { }

  fromString(string: any): TimeDate {
    if (string instanceof Date) {
      return new TimeDate(string);
    }

    if (!string) {
      // console.log('String is null!');
      return new TimeDate();
    }
    const date = new Date(string);
    if (!(date instanceof Date) || isNaN(date.valueOf())) {
      console.log(`${string} is not valid type of date!`);
      return new TimeDate();
    }
    return new TimeDate(date);
  }

  current(): TimeDate {
    return new TimeDate(new Date());
  }

  fromTimeDatePicker(obj: any): TimeDate {
    if (!obj) {
      return new TimeDate();
    } else if (obj.jsdate) {
      return new TimeDate(new Date(obj.jsdate));
    } else if (obj.date) {
      // return new TimeDate(new Date(Date.UTC(obj.date.year, obj.date.month - 1, obj.date.day, 0, 0)));
      return new TimeDate(new Date(obj.date.year, obj.date.month - 1, obj.date.day, 0, 0));
    } else if (typeof obj === 'string') {
      return new TimeDate(new Date(obj));
    } else {
      return new TimeDate();
    }
  }

  // convert date of timezone current to date UTC
  convertDateUTC(time) {
    // let result;
    if (time.jsdate) {
      return time.jsdate;
    //   const date = new Date(time.jsdate);
    //   const convertDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()));
    //   result = convertDate.toISOString();
    } else {
    //   const convertDate = new Date(Date.UTC(time.date.year, time.date.month, time.date.day, 0, 0));
    //   result = convertDate.toISOString();
      return new Date(time.date.year, time.date.month - 1, time.date.day, 0, 0);
    }
    // return result;
  }

  pathValueTime(string) {
    const time = new Date(string);
    const day = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    const result = {
      date: {
        year: year,
        month: month,
        day: day
      }
    };
    return result;
  }

  convertDateToString(string) {
    const time = new Date(string);
    const day = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    if (time === null) {
      return null;
    } else {
      if (day < 10) {
        var ngay = "0"+day;
      }
      if (month < 10) {
        var thang = "0"+month;
      }
      return ngay+"/"+thang+"/"+year;
    }
  }
}

export function compareDate(date1: Date, date2: Date) {
  const startDay = (date1.valueOf()) / 1000;
  const endDay = (date2.valueOf()) / 1000;
  const diff = endDay - startDay;
  if (diff > 0) { return 1; } else if (diff < 0) { return -1; } else { return 0; }
}

export class TimeDate {
  private date: Date;
  constructor(date?: Date) {
    this.date = date || null;
  }
  get(type: string = 'all') {
    switch (type) {
      case 'all': {
        return this.date;
      }
      case 'year': {
        return this.date.getFullYear();
      }
      default: {
        return this.date;
      }
    }
  }
  compare(date: Date) {
    const startDay = (this.date.valueOf()) / 1000;
    const endDay = (date.valueOf()) / 1000;
    const diff = endDay - startDay;
    if (diff > 0) { return 1; } else if (diff < 0) { return -1; } else { return 0; }
  }
  setUTC() {
    // no convert utc
    // if (this.date) {
    //   const date = new Date(Date.UTC(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), this.date.getHours(), this.date.getMinutes()));
    //   this.date = date;
    // }

    return this;
  }

  toISOString(): string {
    if (this.date) { return this.date.toISOString(); } else { return null; }
  }

  toTimeDatePickerValue(): any {
    if (this.date) {
      const day = this.date.getDate();
      const month = this.date.getMonth() + 1;
      const year = this.date.getFullYear();
      const result = {
        date: {
          year: year,
          month: month,
          day: day
        }
      };
      return result;
    } else {
      return null;
    }
  }
}
