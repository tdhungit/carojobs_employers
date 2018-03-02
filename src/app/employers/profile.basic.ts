import {Component, OnInit} from '@angular/core';
import {EmployerService} from '../services/employer.service';
import {AlertService} from '../services/alert.service';
import {TranslateService} from '../translate/translate.service';
import {UserService} from '../services/user.service';
import {Config} from '../models/config.model';
import {LoadingService} from "../services/loading.service";

@Component({
  templateUrl: './templates/profile.basic.html',
  providers: [EmployerService, UserService]
})

export class ProfileBasicComponent implements OnInit {
  public employer: any = {};

  public constructor(private _employer: EmployerService,
                     private _user: UserService,
                     private _alert: AlertService,
                     private _translate: TranslateService,
                     private _loading: LoadingService) {
  }

  public ngOnInit(): void {
    this._loading.show();
    this._employer.getInfo().subscribe(
      data => {
        this._loading.hide();
        this.employer = data;
        if (data.avatar.length > 2) {
          this.employer.full_avatar = Config.MEDIA_URL + data.avatar;
        } else {
          this.employer.full_avatar = data.avatar;
        }
      },
      error => {
        this._alert.error(error);
      }
    );
  }

  public update() {
    this._employer.update(this.employer).subscribe(
      data => {
        this._alert.success(this._translate.instant('Update Success'));
      },
      error => {
        this._alert.error(this._translate.instant('Update Error!'));
        this._alert.error(error);
      }
    );
  }

  public uploadAvatar(image: any) {
    const listImage = image.target.files;
    if (listImage.length > 0) {
      const file: File = listImage[0];
      this._user.upload(file, 'images').subscribe(
        data => {
          this.employer.avatar = data.uri;
          this.employer.full_avatar = Config.MEDIA_URL + data.uri
        },
        error => {
          this._alert.error(error);
        }
      );
    }
  }
}
