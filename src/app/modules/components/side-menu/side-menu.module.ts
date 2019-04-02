import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SideMenuComponent } from "./side-menu.component";
import { RouterModule } from "@angular/router";
import { DirectiveModule } from "../../../shared/directives/directive.module";

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      DirectiveModule
    ],
    declarations: [
      SideMenuComponent,
    ],
    exports: [
      SideMenuComponent
    ]
  })
  export class SideMenuModule { }