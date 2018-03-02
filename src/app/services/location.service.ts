import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Config} from "../models/config.model";
import 'rxjs/add/operator/map';

@Injectable()
export class LocationService {
  public constructor(private _http: Http) {
  }

  public get(id: number) {
    return this._http.get(Config.API_URL + '/locations/' + id + '/', Config.jwt())
      .map((response: Response) => response.json());
  }

  public create(model: any) {
    return this._http.post(Config.API_URL + '/locations/', model, Config.jwt())
      .map((response: Response) => response.json());
  }

  public get_list_select2() {
    let account_id = localStorage.getItem('currentAccountId');
    return this._http.get(Config.API_URL + '/locations/?account_id=' + account_id, Config.jwt())
      .map((response: Response) => {
        let data = response.json();
        let result: any = [{id: '0', text: '--'}];
        for (let com of data.results) {
          result.push({id: com.id.toString(), text: com.name});
        }
        return result;
      });
  }
}
