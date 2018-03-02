import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {AlertService} from "../services/alert.service";
import {TranslateService} from '../translate/translate.service';
import {Title} from '@angular/platform-browser';
import {LoadingService} from "../services/loading.service";
import {ConfigService} from "../services/config.service";
import {Config} from "../models/config.model";
@Component({
  templateUrl: './templates/setting.account.component.html',
  providers: [AccountService]
})

export class SettingAccountComponent implements OnInit {
  public model: any = {};
  public media_url = Config.MEDIA_URL;
  public currentAccountId = '';
  public currentPage = 1;
  public itemsPerPage = 10;

  public constructor(private _t: TranslateService,
                     private _title: Title,
                     private _account: AccountService,
                     private _config: ConfigService,
                     private _alert: AlertService,
                     private _loading: LoadingService) {
    this._title.setTitle(this._t.instant('Account Manager'));
  }

  public ngOnInit() {
    this.currentAccountId = localStorage.getItem('currentAccountId');
    let pagination = this._config.get_pagination();
    this.itemsPerPage = pagination.page_item;
    this.getAccounts();
  }

  public getAccounts() {
    this._loading.show();
    this._account.get_list(this.currentPage, this.itemsPerPage).subscribe(
      data => {
        this._loading.hide();
        this.model = data;
      },
      error => {
        this._alert.error(error);
      }
    );
  }

  public pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getAccounts();
  }
}
