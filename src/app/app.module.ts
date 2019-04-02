import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LoadingModule } from 'ngx-loading';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServerInterceptorService } from './services/server-interceptor/server-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { SharedModule } from './shared/shared.module';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { MainComponent } from './modules/main.component';
import { HttpModule } from '@angular/http';
import { ModalConfirmComponent } from './shared/modal/confirm/confirm.component';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ServerInterceptorService, multi: true },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ModalConfirmComponent
  ],
  entryComponents: [
    ModalConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    // Ng2DeviceDetectorModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      extendedTimeOut: 1000,
      newestOnTop: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      tapToDismiss: true,
      easeTime: 500,
      autoDismiss: true,
      enableHtml: true,
      preventDuplicates: true
    }),
    HttpClientModule,
    HttpModule,
    LoadingBarModule.forRoot(),
    LoadingModule,
    McBreadcrumbsModule.forRoot(),
  ],
  exports: [
    // CdkTableModule
  ],
  providers: [
    // { provide: AppConfig, useClass: AppConfig },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
