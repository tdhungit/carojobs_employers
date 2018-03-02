import {Component, OnInit, OnDestroy} from '@angular/core';
import {LocationService} from "../services/location.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "../translate/translate.service";
import {AlertService} from "../services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  templateUrl: './templates/setting.detaillocation.component.html',
  providers: [LocationService]
})

export class SettingDetailLocationComponent implements OnInit, OnDestroy {
  private sub: any;
  private sub2: any;
  public location_id: number;
  public model: any = {};
  public returnUrl: string;

  public constructor(private _title: Title,
                     private _t: TranslateService,
                     private _alert: AlertService,
                     private _route: ActivatedRoute,
                     private _location: LocationService) {
    this._title.setTitle(this._t.instant('Detail Location'));
  }

  public ngOnInit(): void {
    this.sub = this._route.params.subscribe(params => {
      this.location_id = params['location_id'];
    });
    this.sub2 = this._route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/employers/settings/companies';
    });

    this._location.get(this.location_id).subscribe(
      data => {
        this.model = data;
      },
      error => {
        this._alert.error(error);
      }
    );
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
