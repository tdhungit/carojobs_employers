import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LoadingService {
  public _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public constructor() {
  }

  public show() {
    this._loading.next(true);
  }

  public hide() {
    this._loading.next(false);
  }
}
