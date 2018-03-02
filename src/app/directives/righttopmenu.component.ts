import {Component, OnInit} from '@angular/core';
import {EmployerService} from "../services/employer.service";
import {Config} from "../models/config.model";
import {AlertService} from "../services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: '[righttopmenu]',
  templateUrl: './templates/righttopmenu.component.html',
  providers: [EmployerService]
})

export class RightTopMenuComponent implements OnInit {
  public disabled: boolean = false;
  public employer: any = {};
  public status: { isopen: boolean } = {isopen: false};

  public constructor(private _employer: EmployerService,
                     private _alert: AlertService,
                     private _router: Router) {
  }

  public ngOnInit() {
    this._employer.getInfo().subscribe(
      data => {
        this.employer = data;
        if (data.avatar.length > 2) {
          this.employer.full_avatar = Config.MEDIA_URL + data.avatar;
        } else {
          this.employer.full_avatar = data.avatar;
        }
      },
      error => {
        this._alert.error(error);
      }
    );
  }

  public toggled(open: boolean): void {
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
}
