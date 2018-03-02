import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {EmployerService} from '../services/employer.service';
import {AlertService} from '../services/alert.service';
import {TranslateService} from '../translate/translate.service';

@Component({
  templateUrl: 'templates/register.component.html',
  providers: [EmployerService]
})

export class RegisterComponent implements OnInit {
  public model: any = {};
  public loading = false;

  public constructor(
    private _title: Title,
    private _employer: EmployerService,
    private _alert: AlertService,
    private _t: TranslateService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._title.setTitle('Register');
  }

  public ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this._router.navigate(['/employers/profile/information']);
    }
  }

  public register() {
    this.loading = true;
    let account_id = this._route.snapshot.queryParams['account_id'] || '';
    if (account_id) {
      this._employer.register_invite(this.model, account_id).subscribe(
        data => {
          this.loading = false;
          this._alert.success(this._t.instant('Registration successful'), true);
          this._router.navigate(['/pages/login']);
        },
        error => {
          this.loading = false;
          this._alert.error_message(error._body);
        }
      );
    } else {
      this._employer.register(this.model).subscribe(
        data => {
          this.loading = false;
          this._alert.success(this._t.instant('Registration successful'), true);
          this._router.navigate(['/pages/login']);
        },
        error => {
          this.loading = false;
          this._alert.error_message(error._body);
        }
      );
    }
  }

  public accept_invite() {
    this.loading = true;
  }
}
