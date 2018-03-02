import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Select2Module} from 'ng2-select2';
import {CKEditorModule} from 'ng2-ckeditor';
import {ModalModule, PaginationConfig, PaginationModule} from "ng2-bootstrap";

import {EmployersRoutingModule} from './employers-routing.module';
import {CaroJobsModule} from '../shared/carojobs.module';

import {ProfileComponent} from './profile.component';
import {ProfileBasicComponent} from './profile.basic';
import {ProfileChangePasswdComponent} from './profile.changepasswd.component';

import {SettingAccountComponent} from './setting.account.component';
import {SettingDetailAccountComponent} from "./setting.detailaccount.component";
import {SettingEditAccountComponent} from "./setting.editaccount.component";

import {SettingEmployerComponent} from "./setting.employer.component";
import {SettingEditEmployerComponent} from "./setting.editemployer.component";
import {SettingDetailEmployerComponent} from "./setting.detailemployer.component";
import {SettingDeleteEmployerComponent} from "./setting.deleteemployer.component";
import {SettingInviteUserComponent} from "./setting.inviteuser.component";

import {JobListComponent} from "./job.list.component";
import {JobCreateComponent} from "./job.create.component";
import {JobDetailComponent} from "./job.detail.component";
import {JobEditComponent} from "./job.edit.component";
import {JobDeleteComponent} from "./job.delete.component";

import {SettingCompanyComponent} from './setting.company.component';
import {SettingCreateCompanyComponent} from './setting.createcompany.component';
import {SettingDetailCompanyComponent} from "./setting.detailcompany.component";
import {SettingEditCompanyComponent} from "./setting.editcompany.component";

import {SettingCreateLocationComponent} from "./setting.createlocation.component";
import {SettingDetailLocationComponent} from "./setting.detaillocation.component";
import {SettingDeleteCompanyComponent} from "./setting.deletecompany.component";
import {SettingDeleteAccountComponent} from "./setting.deleteaccount.component";

@NgModule({
  imports: [
    CommonModule,
    EmployersRoutingModule,
    FormsModule,
    ModalModule,
    CKEditorModule,
    PaginationModule,
    Select2Module,
    ChartsModule,
    CaroJobsModule
  ],
  declarations: [
    ProfileComponent,
    ProfileBasicComponent,
    ProfileChangePasswdComponent,
    SettingAccountComponent,
    SettingDetailAccountComponent,
    SettingEditAccountComponent,
    SettingDeleteAccountComponent,
    SettingCompanyComponent,
    SettingEmployerComponent,
    SettingEditEmployerComponent,
    SettingDetailEmployerComponent,
    SettingDeleteEmployerComponent,
    SettingInviteUserComponent,
    SettingCreateCompanyComponent,
    SettingDetailCompanyComponent,
    SettingEditCompanyComponent,
    SettingCreateLocationComponent,
    SettingDetailLocationComponent,
    SettingDeleteCompanyComponent,
    JobListComponent,
    JobCreateComponent,
    JobDetailComponent,
    JobEditComponent,
    JobDeleteComponent

  ],
  providers: [PaginationConfig]
})
export class EmployersModule {
}
