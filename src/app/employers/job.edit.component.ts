import {Component, OnInit, OnDestroy} from '@angular/core';
import {JobService} from "../services/job.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../translate/translate.service";
import {AlertService} from "../services/alert.service";
import {ConfigService} from "../services/config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingService} from "../services/loading.service";
import {Select2OptionData} from "ng2-select2";
import {CompanyService} from "../services/company.service";
import {LocationService} from "../services/location.service";

@Component({
  templateUrl: './templates/job.edit.component.html',
  providers: [JobService, CompanyService, ConfigService, LocationService]
})

export class JobEditComponent implements OnInit, OnDestroy {
  private sub: any;
  public model: any = {
    location: '0',
  };
  public config: any = {};
  public job_id: number;

  public categories: Array<Select2OptionData> = [];
  public companies: Array<Select2OptionData> = [];
  public locations: Array<Select2OptionData> = [];
  public employment_types: Array<Select2OptionData> = [];
  public currencies: Array<Select2OptionData> = [];
  public salary_types: Array<Select2OptionData> = [];
  public createReturnUrl: any;

  constructor(private _title: Title,
              private _t: TranslateService,
              private _alert: AlertService,
              private _loading: LoadingService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _config: ConfigService,
              private _job: JobService,
              private _company: CompanyService,
              private _localtion: LocationService) {
    this._title.setTitle(this._t.instant('Edit Job'));
  }

  public ngOnInit() {
    this._loading.show();
    // get all configs
    this._config.get().subscribe(
      data => {
        if (data.employment_types) {
          this.employment_types = data.employment_types.config;
          this.model.type = data.employment_types.default;
        }
        if (data.currencies) {
          this.currencies = data.currencies.config;
          this.model.salary_currency = data.currencies.default;
        }
        if (data.salary_types) {
          this.salary_types = data.salary_types.config;
          this.model.salary_type = data.salary_types.default;
        }
      }
    );
    // get current url
    let currentUrl = this._router.url;
    this.createReturnUrl = {returnUrl: currentUrl};
    if (currentUrl.indexOf('?') > 0) {
      this.createReturnUrl = {returnUrl: currentUrl.substr(0, currentUrl.indexOf('?'))};
    }
    this.sub = this._route.params.subscribe(params => {
      this.job_id = params['job_id'];
    });
    this._job.get(this.job_id).subscribe(
      data => {
        this.model = data;
        let category_id = data['category']['id'];
        // get all categories
        this._job.get_category_select2().subscribe(
          data => {
            this.categories = data;
            this.model.category = category_id;
          }
        );
        let company_id = data['company']['id'];
        // get all companies
        this._company.get_list_select2().subscribe(
          data => {
            this.companies = data;
            this.model.company = company_id;
          }
        );
        //get all location
        let location_id = data['location']['id'];
        if (typeof this.model.company == 'object') {
          this._company.get_locations_select2(this.model.company.id).subscribe(
            data => {
              this.locations = data;
              this.model.location = location_id;
            }
          );
        }
        this._title.setTitle(this.model.name);
        this._loading.hide();
      },
      error => {
        this._alert.error(error);
      }
    );
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public update() {
    this._loading.show();
    this._job.update(this.job_id, this.model).subscribe(
      data => {
        this._loading.hide();
        this._router.navigate(['/employers/jobs']);
      },
      error => {
        this._alert.error(error);
      }
    )
  }

  public changed(e: any, key): void {
    this.model[key] = e.value;
    if (key == 'company' && e.value && e.value != 0) {
      this.getLocationsSelect(e.value);
    }
  }

  public getLocationsSelect(value: any) {
    if (typeof value != 'object') {
      this._loading.show();
      this._company.get_locations_select2(value).subscribe(
        data => {
          this.model.location = value;
          this._loading.hide();
          this.locations = data;
        },
        error => {
          this._alert.error(error);
        }
      );
    }
  }
}
