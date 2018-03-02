import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from "@angular/platform-browser";
import {LoadingService} from "../services/loading.service";
import {TranslateService} from "../translate/translate.service";
import {AlertService} from "../services/alert.service";
import {ResumeService} from "../services/resume.service";

@Component({
  templateUrl: './templates/resume.detail.component.html',
  providers: [ResumeService]
})
export class ResumeDetailComponent implements OnInit {
  public model: any = {};
  public sub: any;
  public resume_id: number;

  constructor(private _loading: LoadingService,
              private _title: Title,
              private _t: TranslateService,
              private _alert: AlertService,
              private _route: ActivatedRoute,
              private _resume: ResumeService) {
    this._title.setTitle(this._t.instant('Detail Resume Manager'));
  }

  ngOnInit(): void {
    this._loading.show();
    this.sub = this._route.params.subscribe(params => {
      this.resume_id = params['resume_id'];
    });
    this.loadResume();
  }

  public loadResume() {
    this._loading.show();
    this._resume.get(this.resume_id).subscribe(
      data => {
        this.model = data;
        this._loading.hide();
      },
      error => {
        this._loading.hide();
        this._alert.error(error);
      }
    )
  }

}
