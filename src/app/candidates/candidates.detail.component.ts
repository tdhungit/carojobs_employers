import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from "@angular/platform-browser";
import {LoadingService} from "../services/loading.service";
import {TranslateService} from "../translate/translate.service";
import {AlertService} from "../services/alert.service";
import {CandidateService} from "../services/candidate.service";
import {Config} from "../models/config.model";

@Component({
  templateUrl: './templates/candidate.detail.component.html',
  providers: [CandidateService]
})
export class CandidatesDetailComponent implements OnInit {
  public model: any = {};
  public sub: any;
  public candidate_id: number;
  public media_url = Config.MEDIA_URL;

  constructor(private _loading: LoadingService,
              private _title: Title,
              private _t: TranslateService,
              private _alert: AlertService,
              private _route: ActivatedRoute,
              private _candidate: CandidateService) {
    this._title.setTitle(this._t.instant('Detail Candidate Manager'));
  }

  ngOnInit(): void {
    this._loading.show();
    this.sub = this._route.params.subscribe(params => {
      this.candidate_id = params['candidate_id'];
    });
    this.loadCandidate();
  }

  public loadCandidate() {
    this._candidate.get(this.candidate_id).subscribe(
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
