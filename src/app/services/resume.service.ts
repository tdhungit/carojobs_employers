import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Config} from '../models/config.model';
import 'rxjs/add/operator/map';

@Injectable()
export class ResumeService {
  public constructor(private _http: Http) {
  }

  public get_list(page = 1, limit = 10) {
    let account_id = localStorage.getItem('currentAccountId');
    let url = Config.API_URL + '/resumes/?account_id=' + account_id;
    if (page > 1) {
      url += '&limit=' + limit + '&offset=' + (page - 1) * limit;
    }
    return this._http.get(url, Config.jwt())
      .map((response: Response) => response.json());
  }

  public get(id: number) {
    return this._http.get(Config.API_URL + '/resumes/' + id + '/', Config.jwt())
      .map((response: Response) => response.json());
  }


}
