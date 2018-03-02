import {Component, OnDestroy, OnInit} from '@angular/core';
import {JobService} from "../services/job.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../translate/translate.service";
import {AlertService} from "../services/alert.service";
import {LoadingService} from "../services/loading.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './templates/job.detail.component.html',
  providers: [JobService]
})

export class JobDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  public job_id: number;
  public model: any = {
    'category': {},
    'company': {},
    'location': {},
  };

  public constructor(private _title: Title,
                     private _t: TranslateService,
                     private _alert: AlertService,
                     private _loading: LoadingService,
                     private _route: ActivatedRoute,
                     private _job: JobService) {
    this._title.setTitle(this._t.instant('Job Detail'));
  }

  public ngOnInit(): void {
    this._loading.show();
    this.sub = this._route.params.subscribe(params => {
      this.job_id = params['job_id'];
    });
    this._job.get(this.job_id).subscribe(
      data => {
        this.model = data;
        this._title.setTitle(this.model.name);
        this._loading.hide();
      },
      error => {
        this._alert.error(error);
      }
    );
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
