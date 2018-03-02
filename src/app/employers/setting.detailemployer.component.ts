import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {EmployerService} from "../services/employer.service";
import {TranslateService} from "../translate/translate.service";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../services/alert.service";
import {LoadingService} from "../services/loading.service";
import {Config} from "../models/config.model";

@Component({
  templateUrl: './templates/setting.detailemployer.component.html',
  providers: [EmployerService]
})

export class SettingDetailEmployerComponent implements OnInit, OnDestroy {
  private sub: any;
  public users_id: number;
  public media_url = Config.MEDIA_URL;
  public model: any = {
    membership: {}
  };

  public constructor(private _title: Title,
                     private _t: TranslateService,
                     private _loading: LoadingService,
                     private _alert: AlertService,
                     private _route: ActivatedRoute,
                     private _employer: EmployerService) {
    this._title.setTitle(this._t.instant('Detail Account'));
  }

  public ngOnInit(): void {
    this.sub = this._route.params.subscribe(params => {
      this.users_id = params['users_id'];
    });
    this.getAccount();
  }

  public getAccount() {
    this._loading.show();
    this._employer.getById(this.users_id).subscribe(
      data => {
        console.log(data);
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
