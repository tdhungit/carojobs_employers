import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Config} from '../models/config.model';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticateService {
  public constructor(private _http: Http) {
  }

  public login(username: string, password: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = 'grant_type=password&client_id=' + Config.client_id + '&client_secret=' + Config.client_secret
      + '&username=' + username + '&password=' + password;
    return this._http.post(Config.API_URL + Config.API_LOGIN, body, {headers: headers})
      .map((response: Response) => {
        const user = response.json();
        if (user && user.access_token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  public logout() {
    localStorage.removeItem('currentUser');
  }

  public set_account(account_id) {
    localStorage.setItem('currentAccountId', account_id);
  }
}
