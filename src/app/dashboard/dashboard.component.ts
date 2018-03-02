import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoadingService} from "../services/loading.service";

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor(private _loading: LoadingService) {}

  ngOnInit(): void {
    this._loading.show();
  }
}
