import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PaginationConfig} from "ng2-bootstrap";

import {LoadingService} from "../services/loading.service";
import {TranslateService} from "../translate/translate.service";
import {AlertService} from "../services/alert.service";
import {ConfigService} from "../services/config.service";
import {ExperenceService} from "../services/experence.service";

import {Config} from "../models/config.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  templateUrl: './templates/experence.component.html',
  providers: [ExperenceService, PaginationConfig]
})
export class ExperenceComponent implements OnInit {
  private sub: any = {};
  public model: any = {};
  public currentPage = 1;
  public itemsPerPage = 10;
  public config: any = {};
  public media_url = Config.MEDIA_URL;

  constructor(private _loading: LoadingService,
              private _title: Title,
              private _t: TranslateService,
              private _alert: AlertService,
              private _config: ConfigService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _experences: ExperenceService) {
    this._title.setTitle(this._t.instant('Experences Manager'));
  }

  ngOnInit(): void {
    this._config.get().subscribe(
      data => {
        this.config = data;
        if (this.config.pagination) {
          this.itemsPerPage = this.config.pagination.page_item;
        }
      },
      error => {
        this._alert.error(error);
      }
    );
    this.sub = this._route.queryParams.subscribe(params => {
      if (params['page']) {
        this.currentPage = params['page'];
      }
    });
    this.getExperences();
  }

  public getExperences() {
    this._loading.show()
    this._experences.get_list(this.currentPage, this.itemsPerPage).subscribe(
      data => {
        this._loading.hide();
        this.model = data;
      },
      error => {
        this._loading.hide();
        this._alert.error(error);
      }
    )
  }

  public pageChanged(event: any): void {
    this.currentPage = event.page;
    this._router.navigate(['/candidates/experience/list'], {queryParams: {page: this.currentPage}});
    this.getExperences();
  }

}
