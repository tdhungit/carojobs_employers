import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AccountService} from "../services/account.service";
import {TranslateService} from "../translate/translate.service";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../services/alert.service";
import {LoadingService} from "../services/loading.service";
import {Config} from "../models/config.model";


@Component({
  templateUrl: './templates/setting.detailaccount.component.html',
  providers: [AccountService]
})

export class SettingDetailAccountComponent implements OnInit, OnDestroy {
  private sub: any;
  public account_id: number;
  public media_url = Config.MEDIA_URL;
  public model: any = {
    membership: {}
  };

  public constructor(private _title: Title,
                     private _t: TranslateService,
                     private _loading: LoadingService,
                     private _alert: AlertService,
                     private _route: ActivatedRoute,
                     private _account: AccountService) {
    this._title.setTitle(this._t.instant('Detail Account'));
  }

  public ngOnInit(): void {
    this.sub = this._route.params.subscribe(params => {
      this.account_id = params['account_id'];
    });
    this.getAccount();
  }

  public getAccount() {
    this._loading.show();
    this._account.get(this.account_id).subscribe(
      data => {
        this.model = data;
        this._title.setTitle(this.model.name);
        // this.model.logo_path = Config.MEDIA_URL + data.logo
        this._loading.hide();
      },
      error => {
        this._alert.error(error);
      }
    );
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
