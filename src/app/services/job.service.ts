import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Config} from "../models/config.model";

@Injectable()
export class JobService {
  public constructor(private _http: Http) {
  }

  public get_list(page = 1, limit = 10) {
    let account_id = localStorage.getItem('currentAccountId');
    let url = Config.API_URL + '/jobs/?account_id=' + account_id;
    if (page > 1) {
      url += '&limit=' + limit + '&offset=' + (page - 1) * limit;
    }
    return this._http.get(url, Config.jwt())
      .map((response: Response) => response.json());
  }

  public get_categories() {
    return this._http.get(Config.API_URL + '/job-categories/', Config.jwt())
      .map((response: Response) => response.json());
  }

  public get(id: number) {
    return this._http.get(Config.API_URL + '/jobs/' + id + '/', Config.jwt())
      .map((response: Response) => response.json());
  }

  public create(model: any) {
    return this._http.post(Config.API_URL + '/jobs/', model, Config.jwt())
      .map((response: Response) => response.json());
  }

  public update(id: number, jobs) {
    return this._http.put(Config.API_URL + '/jobs/' + id + '/', jobs, Config.jwt())
      .map((response: Response) => response.json());
  }

  public delete(id: number) {
    let account_id = localStorage.getItem('currentAccountId');
    return this._http.delete(Config.API_URL + '/jobs/' + id + '/?account=' + account_id, Config.jwt())
      .map((response: Response) => response.json());
  }

  public get_category_select2() {
    return this._http.get(Config.API_URL + '/job-categories/', Config.jwt())
      .map((response: Response) => {
        let data = response.json();
        let result: any = [{id: '0', text: '--'}];
        for (let cat of data.results) {
          result.push({id: cat.id.toString(), text: cat.name});
        }
        return result;
      });
  }
}
