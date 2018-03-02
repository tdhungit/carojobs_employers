import {Component, OnInit, OnDestroy} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../translate/translate.service";
import {AlertService} from "../services/alert.service";
import {LoadingService} from "../services/loading.service";
import {ActivatedRoute} from "@angular/router";
import {CompanyService} from "../services/company.service";
import {Config} from "../models/config.model";

@Component({
  templateUrl: './templates/setting.detailcompany.component.html',
  providers: [CompanyService]
})

export class SettingDetailCompanyComponent implements OnInit, OnDestroy {
  private sub: any;
  private sub2: any;
  public media_url = Config.MEDIA_URL;
  public id: number;
  public model: any = {};

  public constructor(private _title: Title,
                     private _t: TranslateService,
                     private _alert: AlertService,
                     private _loading: LoadingService,
                     private _route: ActivatedRoute,
                     private _company: CompanyService) {
    this._title.setTitle(this._t.instant('Detail Company'));
  }

  public ngOnInit() {
    this._loading.show();
    this.sub = this._route.params.subscribe(params => {
      this.id = +params['company_id'];
    });
    this.sub2 = this._route.queryParams.subscribe(params => {
      if (params['refresh']) {
        this.loadCompany();
      }
    });
    this.loadCompany();
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  public loadCompany() {
    this._company.get(this.id).subscribe(
      data => {
        console.log(data);
        this.model = data;
        this._loading.hide();
        this._title.setTitle(this.model.name);
      },
      error => {
        this._alert.error(error);
      }
    );
  }
}
