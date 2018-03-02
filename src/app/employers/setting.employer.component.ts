import {Component, OnInit} from '@angular/core';
import {AlertService} from "../services/alert.service";
import {LoadingService} from "../services/loading.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../translate/translate.service";
import {AccountService} from "../services/account.service";
import {Config} from "../models/config.model";

@Component({
  templateUrl: './templates/setting.employer.component.html',
  providers: [AccountService]
})

export class SettingEmployerComponent implements OnInit {
  public model: any = {};
  public media_url = Config.MEDIA_URL;

  public constructor(private _account: AccountService,
                     private _alert: AlertService,
                     private _loading: LoadingService,
                     private _title: Title,
                     private _t: TranslateService) {
    this._title.setTitle(this._t.instant('Employer Manager'));
  }

  public ngOnInit() {
    this._loading.show();
    this._account.get_info().subscribe(
      data => {
        this._loading.hide();
        this.model = data;
      },
      error => {
        this._alert.error(error);
      }
    );
  }
}
