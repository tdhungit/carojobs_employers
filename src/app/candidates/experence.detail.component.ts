import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from "@angular/platform-browser";
import {LoadingService} from "../services/loading.service";
import {TranslateService} from "../translate/translate.service";
import {AlertService} from "../services/alert.service";
import {ExperenceService} from "../services/experence.service";
import {Config} from "../models/config.model";

@Component({
  templateUrl: './templates/experence.detail.component.html',
  providers: [ExperenceService]
})
export class ExperienceDetailComponent implements OnInit {
  public model: any = {};
  public sub: any;
  public experience_id: number;
  public media_url = Config.MEDIA_URL;

  constructor(private _loading: LoadingService,
              private _title: Title,
              private _t: TranslateService,
              private _alert: AlertService,
              private _route: ActivatedRoute,
              private _experence: ExperenceService) {
    this._title.setTitle(this._t.instant('Detail Experence Manager'));
  }

  ngOnInit(): void {
    this._loading.show();
    this.sub = this._route.params.subscribe(params => {
      this.experience_id = params['experience_id'];
    });
    this.loadExperence();
  }

  public loadExperence() {
    this._experence.get(this.experience_id).subscribe(
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
