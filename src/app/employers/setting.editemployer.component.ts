import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";

import {TranslateService} from "../translate/translate.service";
import {AlertService} from "../services/alert.service";
import {LoadingService} from "../services/loading.service";
import {EmployerService} from "../services/employer.service";
import {UserService} from "../services/user.service";

import {Config} from "../models/config.model";

@Component({
  templateUrl: './templates/setting.editemployer.component.html',
  providers: [EmployerService, UserService]
})

export class SettingEditEmployerComponent implements OnInit {
  public model: any = {};
  public obj: any = {};
  private sub: any;
  public users_id: number;
  public media_url = Config.MEDIA_URL;

  public constructor(private _title: Title,
                     private _t: TranslateService,
                     private _alert: AlertService,
                     private _loading: LoadingService,
                     private _route: ActivatedRoute,
                     private _router: Router,
                     private _employer: EmployerService,
                     private _user: UserService) {
    this._title.setTitle(this._t.instant('Edit Employer'));
  }

  public ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
      this.users_id = params['users_id'];
    });
    this._employer.getById(this.users_id).subscribe(
      data => {
        this.model = data;
      },
      error => {
        this._alert.error(error);
      }
    );
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

  public update() {
    this.obj = {
      id: this.model.id,
      first_name: this.model.first_name,
      last_name: this.model.last_name,
      phone: this.model.phone,
      email: this.model.email,
      avatar: this.model.logo
    }
    this._employer.update_employer(this.users_id, this.obj).subscribe(
      data => {
        this._alert.success(this._t.instant('Update Employer successful'));
        this._router.navigate(['/employers/settings/users']);
      },
      error => {
        this._alert.error(error);
      }
    )
  }
}
