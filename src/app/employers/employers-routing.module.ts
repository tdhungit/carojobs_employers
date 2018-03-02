import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProfileComponent} from './profile.component';
import {ProfileBasicComponent} from './profile.basic';
import {ProfileChangePasswdComponent} from './profile.changepasswd.component';

import {SettingAccountComponent} from "./setting.account.component";
import {SettingDetailAccountComponent} from "./setting.detailaccount.component";
import {SettingEditAccountComponent} from "./setting.editaccount.component";
import {SettingDeleteAccountComponent} from "./setting.deleteaccount.component";

import {SettingEditEmployerComponent} from "./setting.editemployer.component";
import {SettingDetailEmployerComponent} from "./setting.detailemployer.component";
import {SettingDeleteEmployerComponent} from "./setting.deleteemployer.component";

import {SettingCompanyComponent} from "./setting.company.component";
import {SettingCreateCompanyComponent} from './setting.createcompany.component';
import {SettingDetailCompanyComponent} from "./setting.detailcompany.component";
import {SettingEditCompanyComponent} from "./setting.editcompany.component";
import {SettingDeleteCompanyComponent} from "./setting.deletecompany.component";

import {SettingEmployerComponent} from "./setting.employer.component";
import {SettingInviteUserComponent} from "./setting.inviteuser.component";

import {JobListComponent} from "./job.list.component";
import {JobCreateComponent} from "./job.create.component";
import {JobDetailComponent} from "./job.detail.component";
import {JobEditComponent} from "./job.edit.component";
import {JobDeleteComponent} from "./job.delete.component";

import {SettingCreateLocationComponent} from "./setting.createlocation.component";
import {SettingDetailLocationComponent} from "./setting.detaillocation.component";

const routes: Routes = [
  {
    path: '', data: {title: 'Employer'},
    children: [
      {
        path: 'profile', component: ProfileComponent,
        children: [
          {path: '', redirectTo: 'information', pathMatch: 'full'},
          {path: 'information', component: ProfileBasicComponent, data: {title: 'My Profile'}},
          {path: 'change-password', component: ProfileChangePasswdComponent, data: {title: 'Change Password'}}
        ]
      },
      {
        path: 'jobs', data: {title: 'Jobs'},
        children: [
          {path: '', redirectTo: 'list', pathMatch: 'full'},
          {
            path: 'list', component: JobListComponent, data: {title: 'List'}, children: [
            {
              path: 'detail-location/:location_id',
              component: SettingDetailLocationComponent,
              data: {title: 'Detail Location'}
            }
          ]
          },
          {
            path: 'create', component: JobCreateComponent, data: {title: 'Create New Job'}, children: [
            {
              path: ':company_id/create-location',
              component: SettingCreateLocationComponent,
              data: {title: 'Create Location'}
            },
          ]
          },
          {path: 'detail/:job_id', component: JobDetailComponent, data: {title: 'Job Detail'}},
          {path: 'edit/:job_id', component: JobEditComponent, data: {title: 'Job Edit'}},
          {path: 'delete/:job_id', component: JobDeleteComponent, data: {title: 'Job Delete'}},
        ]
      },
      {
        path: 'settings', data: {title: 'Settings'},
        children: [
          {path: '', redirectTo: 'accounts', pathMatch: 'full'},
          {path: 'accounts', component: SettingAccountComponent, data: {title: 'Accounts'}},
          {path: 'edit-account/:account_id', component: SettingEditAccountComponent, data: {title: 'Edit Account'}},
          {
            path: 'detail-account/:account_id',
            component: SettingDetailAccountComponent,
            data: {title: 'Detail Account'}
          },
          {
            path: 'delete-account/:account_id',
            component: SettingDeleteAccountComponent,
            data: {title: 'Delete Account'}
          },
          {path: 'companies', component: SettingCompanyComponent, data: {title: 'Hiring Companies'}},
          {path: 'create-company', component: SettingCreateCompanyComponent, data: {title: 'Create Hiring Company'}},
          {
            path: 'edit-company/:company_id',
            component: SettingEditCompanyComponent,
            data: {title: 'Edit Hiring Company'}
          },
          {
            path: 'detele-company/:company_id',
            component: SettingDeleteCompanyComponent,
            data: {title: 'Delete Hiring Company'}
          },
          {
            path: 'detail-company/:company_id',
            component: SettingDetailCompanyComponent,
            data: {title: 'Detail Hiring Company'},
            children: [
              {path: 'create-location', component: SettingCreateLocationComponent, data: {title: 'Create Location'}},
            ]
          },
          {path: 'users', component: SettingEmployerComponent, data: {title: 'Users'}},
          {path: 'edit-users/:users_id', component: SettingEditEmployerComponent, data: {title: 'Users Edit'}},
          {path: 'detail-users/:users_id', component: SettingDetailEmployerComponent, data: {title: 'Users Detail'}},
          {path: 'delete-users/:users_id', component: SettingDeleteEmployerComponent, data: {title: 'Users Delete'}},
          {path: 'invite-user', component: SettingInviteUserComponent, data: {title: 'Invite User'}}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployersRoutingModule {
}
