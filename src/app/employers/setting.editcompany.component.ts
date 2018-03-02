import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";

import {TranslateService} from "../translate/translate.service";
import {AlertService} from "../services/alert.service";
import {LoadingService} from "../services/loading.service";
import {CompanyService} from "../services/company.service";
import {UserService} from "../services/user.service";

import {Config} from "../models/config.model";

@Component({
  templateUrl: './templates/setting.editcompany.component.html',
  providers: [CompanyService, UserService]
})

export class SettingEditCompanyComponent implements OnInit {
  public model: any = {};
  public obj: any = {};
  private sub: any;
  public company_id: number;

  public constructor(private _title: Title,
                     private _t: TranslateService,
                     private _alert: AlertService,
                     private _loading: LoadingService,
                     private _route: ActivatedRoute,
                     private _router: Router,
                     private _company: CompanyService,
                     private _user: UserService) {
    this._title.setTitle(this._t.instant('Edit Company'));
  }

  public ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
      this.company_id = params['company_id'];
    });
    this._company.get(this.company_id).subscribe(
      data => {
        this.model = data;
        this.model.logo_path = Config.MEDIA_URL + data.logo
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
      account: this.model.account.id,
      name: this.model.name,
      phone: this.model.phone,
      description: this.model.description,
      email: this.model.email,
      job_count: this.model.job_count,
      logo: this.model.logo,
      logo_path: this.model.logo_path
    }
    this._company.update(this.company_id, this.obj).subscribe(
      data => {
        this._alert.success(this._t.instant('Update Hiring Company successful'));
        this._router.navigate(['/employers/settings/companies']);
      },
      error => {
        this._alert.error(error);
      }
    )
  }
}
