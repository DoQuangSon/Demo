import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { TtktFormModule } from '../../shared/form-module/ttkt-form.module';
import { HeaderModule } from '../../modules/components/header/header.module';
import { FooterModule } from '../../modules/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    FormsModule,
    ReactiveFormsModule,
    TtktFormModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChangePasswordComponent
      }
    ]),
    
  ],
  declarations: [ChangePasswordComponent]
})
export class ChangePasswordModule { }
