import { CheckNumberOnlyDirective } from './check-number-only/check-number-only.directive';
import { CheckPhoneNumberDirective } from './check-phone-number/check-phone-number.directive';
import { DropdownSidemenuDirective } from './dropdown-sidemenu/dropdown-sidemenu.directive';
import { CollapseDirective } from './collapse/collapse.directive';
import { NgModule } from '@angular/core';

export const DIRECTIVES = [
    CheckNumberOnlyDirective,
    CheckPhoneNumberDirective,
    // RouterActiveDirective,
    DropdownSidemenuDirective,
    CollapseDirective
];

@NgModule({
    imports: [

    ],
    exports: [
        ...DIRECTIVES
    ],
    declarations: [
        ...DIRECTIVES,
    ]
})
export class DirectiveModule { }