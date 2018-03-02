import {Component, OnInit} from '@angular/core';
import {CompanyService} from "../services/company.service";
import {AlertService} from "../services/alert.service";
import {TranslateService} from "../translate/translate.service";
import {Title} from "@angular/platform-browser";
import {LoadingService} from "../services/loading.service";
import {Config} from '../models/config.model';
import {ConfigService} from "../services/config.service";

@Component({
  templateUrl: './templates/setting.company.component.html',
  providers: [CompanyService]
})

export class SettingCompanyComponent implements OnInit {
  public model: any = {};
  public media_url = Config.MEDIA_URL;
  public currentPage = 1;
  public itemsPerPage = 10;

  public constructor(private _company: CompanyService,
                     private _config: ConfigService,
                     private _alert: AlertService,
                     private _loading: LoadingService,
                     private _t: TranslateService,
                     private _title: Title) {
    this._title.setTitle(this._t.instant('Hiring Company Manager'));
  }

  public ngOnInit() {
    let pagination = this._config.get_pagination();
    this.itemsPerPage = pagination.page_item;
    this.getCompanies();
  }

  public getCompanies() {
    this._loading.show();
    this._company.get_list(this.currentPage, this.itemsPerPage).subscribe(
      data => {
        this._loading.hide();
        this.model = data;
      },
      error => {
        this._alert.error(error);
      }
    );
  }

  public pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getCompanies();
  }
}
