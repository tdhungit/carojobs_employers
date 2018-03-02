import {Component} from '@angular/core';
import {CompanyService} from '../services/company.service';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '../translate/translate.service';
import {AlertService} from '../services/alert.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {Config} from '../models/config.model';

@Component({
  templateUrl: './templates/setting.createcompany.component.html',
  providers: [CompanyService, UserService]
})

export class SettingCreateCompanyComponent {
  public model: any = {};

  public constructor(private _title: Title,
                     private _t: TranslateService,
                     private _alert: AlertService,
                     private _company: CompanyService,
                     private _user: UserService,
                     private _router: Router) {
    this._title.setTitle(this._t.instant('Create Hiring Company'));
  }

  public uploadAvatar(image: any) {
    let listImage = image.target.files;
    if (listImage.length > 0) {
      const file: File = listImage[0];
      this._user.upload(file, 'images').subscribe(
        data => {
          this.model.logo = data.uri;
          this.model.logo_path = Config.MEDIA_URL + data.uri
        },
        error => {
          this._alert.error(error);
        }
      );
    }
  }

  public save() {
    let account_id = localStorage.getItem('currentAccountId');
    this.model.account = account_id;
    this._company.create(this.model).subscribe(
      data => {
        this._alert.success(this._t.instant('Create Hiring Company successful'));
        this._router.navigate(['/employers/settings/companies']);
      },
      error => {
        this._alert.error(error);
      }
    );
  }
}
