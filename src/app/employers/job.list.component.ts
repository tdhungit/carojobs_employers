import {Component, OnDestroy, OnInit} from '@angular/core';
import {JobService} from "../services/job.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../translate/translate.service";
import {AlertService} from "../services/alert.service";
import {ConfigService} from "../services/config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingService} from "../services/loading.service";

@Component({
  templateUrl: './templates/job.list.component.html',
  providers: [JobService]
})

export class JobListComponent implements OnInit, OnDestroy {
  private sub: any;
  public model: any = {};
  public config: any = {};
  public currentPage = 1;
  public itemsPerPage = 10;

  public constructor(private _title: Title,
                     private _t: TranslateService,
                     private _alert: AlertService,
                     private _loading: LoadingService,
                     private _route: ActivatedRoute,
                     private _router: Router,
                     private _config: ConfigService,
                     private _job: JobService) {
    this._title.setTitle(this._t.instant('Jobs Manager'));
  }

  public ngOnInit() {
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
    this.getJobs();
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getJobs() {
    this._loading.show();
    this._job.get_list(this.currentPage, this.itemsPerPage).subscribe(
      data => {
        this.model = data;
        this._loading.hide();
      },
      error => {
        this._alert.error(error);
      }
    );
  }

  public pageChanged(event: any): void {
    this.currentPage = event.page;
    this._router.navigate(['/employers/jobs/list'], {queryParams: {page: this.currentPage}});
    this.getJobs();
  }
}
