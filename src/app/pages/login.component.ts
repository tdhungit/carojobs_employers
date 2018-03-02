import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AlertService} from '../services/alert.service';
import {AuthenticateService} from '../services/authenticate.service';
import {AccountService} from "../services/account.service";

@Component({
  templateUrl: './templates/login.component.html',
  providers: [AccountService]
})

export class LoginComponent implements OnInit {
  public model: any = {};
  public accounts: any = {};
  public loading = false;
  public load_modal = false;
  public returnUrl = '/';

  public constructor(
    private _title: Title,
    private _route: ActivatedRoute,
    private _router: Router,
    private _alert: AlertService,
    private _auth: AuthenticateService,
    private _account: AccountService
  ) {
    this._title.setTitle('Login');
  }

  public ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this._router.navigate(['/employers/profile/information']);
    }
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  public login() {
    this.loading = true;
    this._auth.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this._account.get_list().subscribe(
            data => {
              this.loading = false;
              this.accounts = data;
              if (this.accounts.count <= 1) {
                this._auth.set_account(this.accounts.results[0].id);
                this._router.navigate([this.returnUrl]);
              } else {
                this.load_modal = true;
              }
            },
            error => {
              this._alert.error_message(error._body);
            }
          );
        },
        error => {
          this._alert.error_message(error._body);
          this.loading = false;
        }
      );
  }

  public set_account(account_id) {
    this._auth.set_account(account_id);
  }

  public register() {
    this._router.navigate(['pages/register']);
  }
}
