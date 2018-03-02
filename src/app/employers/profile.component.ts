import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  templateUrl: './templates/profile.component.html'
})

export class ProfileComponent {
  public constructor(private _title: Title,
                     private _router: Router) {
    this._title.setTitle('My Profile');
  }

  public getClassName(url) {
    const is_active = this._router.isActive(url, true);
    if (is_active) {
      return 'active';
    }

    return '';
  }
}
