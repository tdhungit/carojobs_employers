import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../services/loading.service";
import {AlertService} from "../services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {JobService} from "../services/job.service";
import {TranslateService} from "../translate/translate.service";

@Component({
  template: '',
  providers: [JobService]
})
export class JobDeleteComponent implements OnInit {
  private sub: any;
  private job_id: number;
  public model: any = {};

  constructor(private _t: TranslateService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _job: JobService,
              private _loading: LoadingService,
              private _alert: AlertService,) {
  }

  ngOnInit(): any {
    this._loading.show();
    this.sub = this._route.params.subscribe(params => {
      this.job_id = params['job_id'];
    });
    this.delete(this.job_id);
  }

  public delete(job_id) {
    this._loading.show();
    this._job.delete(job_id).subscribe(
      data => {
        this._loading.hide();
        this._alert.success(this._t.instant('Delete Jobs successful'));
        this._router.navigate(['/employers/jobs']);
      },
      error => {
        this._loading.hide();
        this._alert.error(error);
      }
    );
  }
}
