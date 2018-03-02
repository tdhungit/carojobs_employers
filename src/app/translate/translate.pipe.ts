import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '../translate';

@Pipe({
  name: 'translate',
  pure: false
})

export class TranslatePipe implements PipeTransform {

  public constructor(private _translate: TranslateService) {}

  transform(value: string, args: string | string[]): any {
    if (!value) {
      return;
    }

    return this._translate.instant(value, args);
  }
}
