import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AccountService} from "../services/account.service";
import {TranslateService} from "../translate/translate.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../services/alert.service";
import {LoadingService} from "../services/loading.service";
import {UserService} from "../services/user.service";
import {Config} from "../models/config.model";

@Component({
  templateUrl: './templates/setting.editaccount.component.html',
  providers: [AccountService, UserService]
})

export class SettingEditAccountComponent implements OnInit {
  private sub: any;
  public account_id: number;
  public model: any = {};
  public obj: any = {};

  public constructor(private _title: Title,
                     private _t: TranslateService,
                     private _loading: LoadingService,
                     private _alert: AlertService,
                     private _router: Router,
                     private _route: ActivatedRoute,
                     private _account: AccountService,
                     private _user: UserService) {
    this._title.setTitle(this._t.instant('Edit Account'));
  }

  public ngOnInit(): void {
    this.sub = this._route.params.subscribe(params => {
      this.account_id = params['account_id'];
    });
    this._account.get(this.account_id).subscribe(
      data => {
        this.model = data;
        this.model.logo_path = Config.MEDIA_URL + data.logo
      },
      error => {
        this._alert.error(error);
      }
    )
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
      name: this.model.name,
      phone: this.model.phone,
      email: this.model.email,
      description: this.model.description,
      post_code: this.model.post_code,
      state: this.model.state,
      country: this.model.country,
      city: this.model.city,
      billing_state: this.model.billing_state,
      billing_post_code: this.model.billing_post_code,
      billing_country: this.model.billing_country,
      billing_city: this.model.billing_city,
      billing_address2: this.model.billing_address2,
      billing_address1: this.model.billing_address1,
      address2: this.model.address2,
      address1: this.model.address1,
      logo: this.model.logo,
      logo_path: this.model.logo_path
    }
    this._account.update(this.account_id, this.obj).subscribe(
      data => {

        this._alert.success(this._t.instant('Update Account successful'));
        this._router.navigate(['/employers/settings/accounts']);
      },
      error => {
        this._alert.error(error);
      }
    )
  }

}
