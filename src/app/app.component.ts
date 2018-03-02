import {Component, OnInit} from '@angular/core';
import {TranslateService} from './translate/translate.service';

@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  public constructor() {}
}
