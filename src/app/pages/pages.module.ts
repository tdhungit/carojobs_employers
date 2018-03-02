import {NgModule} from '@angular/core';
import {PagesRoutingModule} from './pages-routing.module';
import {CaroJobsModule} from '../shared/carojobs.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';
import {ModalModule} from "ng2-bootstrap";

@NgModule({
  imports: [
    PagesRoutingModule,
    CaroJobsModule,
    CommonModule,
    FormsModule,
    ModalModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class PagesModule {}
