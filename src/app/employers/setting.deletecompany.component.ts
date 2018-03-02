import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../services/company.service";
import {TranslateService} from "../translate/translate.service";

@Component({
  templateUrl: './templates/setting.company.component.html',
  providers: [CompanyService]
})
export class SettingDeleteCompanyComponent implements OnInit {
  private sub: any;
  private company_id: number;
  public model: any = {};

  constructor(private _t: TranslateService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _company: CompanyService,
              private _loading: LoadingService,
              private _alert: AlertService,) {
  }

  ngOnInit(): any {
    this._loading.show();
    this.sub = this._route.params.subscribe(params => {
      this.company_id = params['company_id'];
    });
    this.delete(this.company_id);
  }

  public delete(company_id) {
    this._loading.show();
    this._company.delete(company_id).subscribe(
      data => {
        this._loading.hide();
        this._alert.success(this._t.instant('Delete Hiring Company successful'));
        this._router.navigate(['/employers/settings/companies']);
      },
      error => {
        this._loading.hide();
        this._alert.error(error);
      }
    );
  }
}
