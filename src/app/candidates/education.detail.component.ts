import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from "@angular/platform-browser";
import {LoadingService} from "../services/loading.service";
import {TranslateService} from "../translate/translate.service";
import {AlertService} from "../services/alert.service";
import {EducationService} from "../services/education.service";
import {Config} from "../models/config.model";

@Component({
  templateUrl: './templates/education.detail.component.html',
  providers: [EducationService]
})
export class EducationDetailComponent implements OnInit {
  public model: any = {};
  public sub: any;
  public education_id: number;
  public media_url = Config.MEDIA_URL;

  constructor(private _loading: LoadingService,
              private _title: Title,
              private _t: TranslateService,
              private _alert: AlertService,
              private _route: ActivatedRoute,
              private _education: EducationService) {
    this._title.setTitle(this._t.instant('Detail Education Manager'));
  }

  ngOnInit(): void {
    this._loading.show();
    this.sub = this._route.params.subscribe(params => {
      this.education_id = params['education_id'];
    });
    this.loadEducation();
  }

  public loadEducation() {
    this._education.get(this.education_id).subscribe(
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
