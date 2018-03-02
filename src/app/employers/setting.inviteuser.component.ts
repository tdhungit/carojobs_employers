import {Component} from '@angular/core';
import {AccountService} from "../services/account.service";
import {AlertService} from "../services/alert.service";
import {TranslateService} from "../translate/translate.service";
import {LoadingService} from "../services/loading.service";
import {Title} from "@angular/platform-browser";

@Component({
  templateUrl: './templates/setting.inviteuser.component.html',
  providers: [AccountService]
})

export class SettingInviteUserComponent {
  public email: string;

  public constructor(private _account: AccountService,
                     private _title: Title,
                     private _alert: AlertService,
                     private _t: TranslateService,
                     private _loading: LoadingService) {
    this._title.setTitle(this._t.instant('Invite User'))
  }

  public invite() {
    this._loading.show();
    this._account.add_employer(this.email).subscribe(
      data => {
        this._loading.hide();
        this._alert.success(this._t.instant('Invite %s successful. Please wait confirm', this.email));
      },
      error => {
        this._alert.error(error);
      }
    );
  }
}
