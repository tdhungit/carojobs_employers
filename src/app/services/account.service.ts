import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Config} from '../models/config.model';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountService {
  public constructor(private _http: Http) {
  }

  public get_list(page = 1, limit = 10) {
    let url = Config.API_URL + '/accounts/';
    if (page > 1) {
      url += '&limit=' + limit + '&offset=' + (page - 1) * limit;
    }
    return this._http.get(url, Config.jwt())
      .map((response: Response) => response.json());
  }

  public get_info() {
    let account_id = localStorage.getItem('currentAccountId');
    return this._http.get(Config.API_URL + '/accounts/' + account_id + '/', Config.jwt())
      .map((response: Response) => response.json());
  }

  public get(id: number) {
    return this._http.get(Config.API_URL + '/accounts/' + id + '/', Config.jwt())
      .map((response: Response) => response.json());
  }

  public add_employer(email: string) {
    let account_id = localStorage.getItem('currentAccountId');
    return this._http.post(Config.API_URL + '/accounts/' + account_id + '/invite-employer/', {email: email},
      Config.jwt()).map((response: Response) => response.json());
  }

  public update(id: number, accounts) {
    return this._http.put(Config.API_URL + '/accounts/' + id + '/', accounts, Config.jwt())
      .map((response: Response) => response.json());
  }

  public delete(id: number) {
    let account_id = localStorage.getItem('currentAccountId');
    return this._http.delete(Config.API_URL + '/accounts/' + id + '/?account=' + account_id, Config.jwt())
      .map((response: Response) => response.json());
  }

}
