import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { PIPES } from "./pipes/index";
import { RouterModule } from "@angular/router";
import { TtktFormModule } from "./form-module/ttkt-form.module";
import { PaginationModule } from "ngx-bootstrap/pagination/pagination.module";
import { ModalModule } from "ngx-bootstrap/modal/modal.module";
import { MyDatePickerModule } from "mydatepicker";
import { SelectModule } from "ng2-select";
import { TimepickerModule } from "ngx-bootstrap";
import { DirectiveModule } from "./directives/directive.module";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";

@NgModule({
    imports: [
      CommonModule,
      TtktFormModule,
      PaginationModule.forRoot(),
      ModalModule.forRoot(),
      MyDatePickerModule,
      SelectModule,
      ReactiveFormsModule,
      TimepickerModule.forRoot(),
      DirectiveModule
    ],
    exports: [
      ...PIPES,
      DirectiveModule,
      ReactiveFormsModule,
      RouterModule,
      TtktFormModule,
      PaginationModule,
      ModalModule,
      MyDatePickerModule,
      SelectModule,
      TimepickerModule,
      BreadcrumbComponent
    ],
    declarations: [
      ...PIPES,
      BreadcrumbComponent
    ]
  })
  export class SharedModule { }