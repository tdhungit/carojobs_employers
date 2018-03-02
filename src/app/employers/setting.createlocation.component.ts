import {Component, OnInit, OnDestroy} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../translate/translate.service";
import {AlertService} from "../services/alert.service";
import {LoadingService} from "../services/loading.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../services/company.service";
import {LocationService} from "../services/location.service";

@Component({
  templateUrl: './templates/setting.createlocation.component.html',
  providers: [CompanyService, LocationService]
})

export class SettingCreateLocationComponent implements OnInit, OnDestroy {
  private sub: any;
  public company_id: number;
  public model: any = {};
  public company: any = {};
  public returnUrl = '/';

  public constructor(private _title: Title,
                     private _t: TranslateService,
                     private _alert: AlertService,
                     private _loading: LoadingService,
                     private _router: Router,
                     private _route: ActivatedRoute,
                     private _location: LocationService) {
    this._title.setTitle(this._t.instant('Create Location'));
  }

  public ngOnInit() {
    this.sub = this._route.parent.params.subscribe(params => {
      this.company_id = +params['company_id'];
    });
    if (!this.company_id) {
      this.sub = this._route.params.subscribe(params => {
        this.company_id = +params['company_id'];
      });
    }
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/employers/settings/detail-company/' + this.company_id;
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public save() {
    this._loading.show();
    this.model.company = this.company_id;
    this._location.create(this.model).subscribe(
      data => {
        this._loading.hide();
        let queryParams = {refresh: '1', company: this.company_id, location: data.id};
        this._router.navigate([this.returnUrl], {queryParams: queryParams});
      },
      error => {
        this._alert.error(error);
      }
    );
  }
}
