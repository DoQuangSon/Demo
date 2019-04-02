import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header.component";
import { RouterLinkActive, RouterModule } from "@angular/router";
import { NotificationComponent } from "../notification/notification.component";
import { DropdownDirective } from "ngx-treeview";

@NgModule({
    imports: [
      CommonModule,
      RouterModule
    ],
    declarations: [
      HeaderComponent,
      NotificationComponent,
    //   DropdownDirective
    ],
    exports: [
        HeaderComponent
    ]
  })
  export class HeaderModule { }