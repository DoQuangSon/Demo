import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[ttktCheckNumberOnly]'
})
export class CheckNumberOnlyDirective {

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): boolean {
     // 0-9, enter, TAB, Backspace only
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode === 9 || e.keyCode === 8 || e.keyCode === 13)) {
      return true;
    }
    return false;
  }

}
