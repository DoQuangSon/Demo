import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[ttktDropdownSidemenu]'
})
export class DropdownSidemenuDirective {

  @HostBinding('class.open.click') get opened() {
    return this.isOpen;
  }
  @HostListener('click') open() {
    let qlac = document.querySelectorAll('.open.click');
    for(let id =0; id < qlac.length; id++ ) {
      let ql = qlac.item(id);

      ql.classList.remove('open');
    }
    this.isOpen = (this.isOpen === true ? false : true);
  }
  // tslint:disable-next-line:member-ordering
  private isOpen = false;

}
