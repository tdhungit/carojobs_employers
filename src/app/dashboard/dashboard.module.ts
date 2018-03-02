import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {CommonModule} from '@angular/common';

import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {CaroJobsModule} from '../shared/carojobs.module';
import {ModalModule} from 'ng2-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
    CaroJobsModule,
    ModalModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule {}
