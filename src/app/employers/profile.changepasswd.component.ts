import {Component} from '@angular/core';
import {AlertService} from '../services/alert.service';
import {EmployerService} from '../services/employer.service';
import {TranslateService} from '../translate/translate.service';

@Component({
  templateUrl: './templates/profile.changepasswd.component.html',
  providers: [EmployerService]
})

export class ProfileChangePasswdComponent {
  public model: any = {};

  public constructor(private _translate: TranslateService,
                     private _alert: AlertService,
                     private _employer: EmployerService) {
  }

  public changePassword() {
    return this._employer.changePassword(this.model).subscribe(
      data => {
        this._alert.success(this._translate.instant('Change Password Successful'));
      },
      error => {
        this._alert.error(error);
      }
    );
  }
}
