import {Component, OnInit, OnDestroy} from '@angular/core';
import {JobService} from '../services/job.service';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '../translate/translate.service';
import {AlertService} from '../services/alert.service';
import {Select2OptionData} from 'ng2-select2';
import {CompanyService} from '../services/company.service';
import {LoadingService} from "../services/loading.service";
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from "../services/config.service";

@Component({
  templateUrl: './templates/job.create.component.html',
  providers: [JobService, CompanyService, ConfigService]
})

export class JobCreateComponent implements OnInit, OnDestroy {
  private sub: any;
  public model: any = {
    company: '0',
    location: '0',
    type: '0',
    salary_currency: '0',
    salary_type: '0'
  };
  public default_company = '0';
  public default_location = '0';
  public config: any = {};

  public categories: Array<Select2OptionData> = [];
  public companies: Array<Select2OptionData> = [];
  public locations: Array<Select2OptionData> = [];
  public employment_types: Array<Select2OptionData> = [];
  public currencies: Array<Select2OptionData> = [];
  public salary_types: Array<Select2OptionData> = [];
  public createReturnUrl: any;

  public constructor(private _title: Title,
                     private _t: TranslateService,
                     private _alert: AlertService,
                     private _loading: LoadingService,
                     private _router: Router,
                     private _route: ActivatedRoute,
                     private _config: ConfigService,
                     private _job: JobService,
                     private _company: CompanyService) {
    this._title.setTitle(this._t.instant('Create New Job'));
  }

  public ngOnInit() {
    this._loading.show();
    // get all categories
    this._job.get_category_select2().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        this._alert.error(error);
      }
    );
    // get all companies
    this._company.get_list_select2().subscribe(
      data => {
        this._loading.hide();
        this.companies = data;
        this.model.company = this.default_company;
      },
      error => {
        this._alert.error(error);
      }
    );
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
    // get params data
    this.sub = this._route.queryParams.subscribe(params => {
      this.default_company = params['company'] || '0';
      this.default_location = params['location'] || '0';
      if (this.default_company && this.default_company != '0'
        && this.default_location && this.default_location != '0') {
        this.getLocationsSelect(this.default_company);
      }
    });
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public changed(e: any, key): void {
    this.model[key] = e.value;
    if (key == 'company' && e.value && e.value != 0) {
      this.getLocationsSelect(e.value);
    }
  }

  public getLocationsSelect(value: any) {
    this._loading.show();
    this._company.get_locations_select2(value).subscribe(
      data => {
        this.locations = data;
        this.model.location = this.default_location;
        this._loading.hide();
      },
      error => {
        this._alert.error(error);
      }
    );
  }

  public save() {
    this._job.create(this.model).subscribe(
      data => {
        this._router.navigate(['/employers/jobs']);
      },
      error => {
        this._alert.error(error);
      }
    );
  }
}
