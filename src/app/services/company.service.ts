import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Config} from '../models/config.model';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {
  public constructor(private _http: Http) {
  }

  public get_list(page = 1, limit = 10) {
    let account_id = localStorage.getItem('currentAccountId');
    let url = Config.API_URL + '/companies/?account_id=' + account_id;
    if (page > 1) {
      url += '&limit=' + limit + '&offset=' + (page - 1) * limit;
    }
    return this._http.get(url, Config.jwt())
      .map((response: Response) => response.json());
  }

  public get_list_select2() {
    let account_id = localStorage.getItem('currentAccountId');
    return this._http.get(Config.API_URL + '/companies/?account_id=' + account_id, Config.jwt())
      .map((response: Response) => {
        let data = response.json();
        let result: any = [{id: '0', text: '--'}];
        for (let com of data.results) {
          result.push({id: com.id.toString(), text: com.name});
        }
        return result;
      });
  }

  public create(company: any) {
    let account_id = localStorage.getItem('currentAccountId');
    return this._http.post(Config.API_URL + '/companies/?account=' + account_id, company, Config.jwt())
      .map((response: Response) => response.json());
  }

  public get(id: number) {
    return this._http.get(Config.API_URL + '/companies/' + id + '/', Config.jwt())
      .map((response: Response) => response.json());
  }

  public update(id: number, companies) {
    let account_id = localStorage.getItem('currentAccountId');
    return this._http.put(Config.API_URL + '/companies/' + id + '/?account=' + account_id, companies, Config.jwt())
      .map((response: Response) => response.json());
  }

  public delete(id: number) {
    let account_id = localStorage.getItem('currentAccountId');
    return this._http.delete(Config.API_URL + '/companies/' + id + '/?account=' + account_id, Config.jwt())
      .map((response: Response) => response.json());
  }

  public get_locations_select2(id: number) {
    return this._http.get(Config.API_URL + '/companies/' + id + '/', Config.jwt())
      .map((response: Response) => {
        let data = response.json();
        let result: any = [{id: '0', text: '--'}];
        for (let com of data.location_set) {
          result.push({id: com.id.toString(), text: com.name});
        }
        return result;
      });
  }
}
