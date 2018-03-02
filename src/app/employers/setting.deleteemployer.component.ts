import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployerService} from "../services/employer.service";
import {TranslateService} from "../translate/translate.service";

@Component({
  template: '',
  providers: [EmployerService]
})
export class SettingDeleteEmployerComponent implements OnInit {
  private sub: any;
  private users_id: number;
  public model: any = {};

  constructor(private _t: TranslateService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _employer: EmployerService,
              private _loading: LoadingService,
              private _alert: AlertService,) {
  }

  ngOnInit(): any {
    this._loading.show();
    this.sub = this._route.params.subscribe(params => {
      this.users_id = params['users_id'];
    });
    this.delete(this.users_id);
  }

  public delete(users_id) {
    this._loading.show();
    this._employer.delete(users_id).subscribe(
      data => {
        this._loading.hide();
        this._alert.success(this._t.instant('Delete Employer successful'));
        this._router.navigate(['/employers/settings/users']);
      },
      error => {
        this._loading.hide();
        this._alert.error(error);
      }
    );
  }
}
