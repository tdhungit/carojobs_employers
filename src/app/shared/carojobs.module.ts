import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthGuard} from '../services/auth.guard';
import {TRANSLATION_PROVIDERS, TranslatePipe, TranslateService} from '../translate';
import {AlertService} from '../services/alert.service';
import {AuthenticateService} from '../services/authenticate.service';
import {AlertComponent} from '../directives/alert.component';
import {LoadingService} from "../services/loading.service";
import {LoadingComponent} from "../directives/loading.component";
import {LabelSelectPipe} from "../directives/labelselect.pipe";
import {ConfigService} from "../services/config.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TranslatePipe,
    AlertComponent,
    LoadingComponent,
    LabelSelectPipe
  ],
  exports: [
    TranslatePipe,
    AlertComponent,
    LoadingComponent,
    LabelSelectPipe
  ],
  providers: [
    AuthGuard,
    TRANSLATION_PROVIDERS,
    TranslateService,
    AlertService,
    LoadingService,
    AuthenticateService,
    ConfigService
  ]
})

export class CaroJobsModule {
  static forRoot() {
    return {
      ngModule: CaroJobsModule,
      providers: []
    };
  }
}
