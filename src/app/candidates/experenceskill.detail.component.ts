import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from "@angular/platform-browser";
import {LoadingService} from "../services/loading.service";
import {TranslateService} from "../translate/translate.service";
import {AlertService} from "../services/alert.service";
import {Config} from "../models/config.model";
import {ExperenceSkillService} from "../services/experenceskill.service";

@Component({
  templateUrl: './templates/experenceskill.detail.component.html',
  providers: [ExperenceSkillService]
})
export class ExperienceSkillDetailComponent implements OnInit {
  public model: any = {};
  public sub: any;
  public experienceskill_id: number;
  public media_url = Config.MEDIA_URL;

  constructor(private _loading: LoadingService,
              private _title: Title,
              private _t: TranslateService,
              private _alert: AlertService,
              private _route: ActivatedRoute,
              private _experenceskill: ExperenceSkillService) {
    this._title.setTitle(this._t.instant('Detail Experence Skill Manager'));
  }

  ngOnInit(): void {
    this._loading.show();
    this.sub = this._route.params.subscribe(params => {
      this.experienceskill_id = params['experienceskill_id'];
    });
    this.loadExperenceSkill();
  }

  public loadExperenceSkill() {
    this._experenceskill.get(this.experienceskill_id).subscribe(
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
