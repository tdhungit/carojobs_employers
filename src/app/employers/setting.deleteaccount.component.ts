import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../services/account.service";
import {TranslateService} from "../translate/translate.service";

@Component({
  template: '',
  providers: [AccountService]
})
export class SettingDeleteAccountComponent implements OnInit {
  private sub: any;
  private account_id: number;
  public model: any = {};

  constructor(private _t: TranslateService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _account: AccountService,
              private _loading: LoadingService,
              private _alert: AlertService,) {
  }

  ngOnInit(): any {
    this._loading.show();
    this.sub = this._route.params.subscribe(params => {
      this.account_id = params['account_id'];
    });
    this.delete(this.account_id);
  }

  public delete(account_id) {
    this._loading.show();
    this._account.delete(account_id).subscribe(
      data => {
        this._loading.hide();
        this._alert.success(this._t.instant('Delete Account successful'));
        this._router.navigate(['/employers/settings/accounts']);
      },
      error => {
        this._loading.hide();
        this._alert.error(error);
      }
    );
  }
}
