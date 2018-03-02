import {Pipe, PipeTransform} from '@angular/core';
import {ConfigService} from "../services/config.service";

@Pipe({
  name: 'label_select',
  pure: true
})

export class LabelSelectPipe implements PipeTransform {
  public constructor(private _config: ConfigService) {}

  public transform(value: string, list_name: string): any {
    if (!value) {
      return;
    }

    let config = this._config.get_from_cache();
    let index = config[list_name].config.findIndex(x => x.value == value);
    return config[list_name].config[index].text;
  }
}
