import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Config} from '../models/config.model';
import {Employer} from '../models/employer.model';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployerService {
  public constructor(private _http: Http) {
  }

  public register(employer: Employer) {
    let data = employer;
    data.user = {username: employer.username, password: employer.password};
    data.avatar = 'N';
    return this._http.post(Config.API_URL + Config.API_REGISTER, data)
      .map((response: Response) => response.json());
  }

  public register_invite(employer: Employer, account_id) {
    let data: any = employer;
    data.user = {username: employer.username, password: employer.password};
    data.avatar = 'N';
    data.account = account_id;
    return this._http.post(Config.API_URL + '/employers/link-account/', data)
      .map((response: Response) => response.json());
  }

  public getById(id: number) {
    return this._http.get(Config.API_URL + '/employers/' + id + '/', Config.jwt()).map((response: Response) => response.json());
  }

  public getInfo() {
    return this._http.get(Config.API_URL + '/employers/profile/', Config.jwt())
      .map((response: Response) => response.json());
  }

  public update(employer) {
    return this._http.put(Config.API_URL + '/employers/update_profile/', employer, Config.jwt())
      .map((response: Response) => response.json());
  }

  public update_employer(id: number, employers) {
    return this._http.put(Config.API_URL + '/employers/' + id + '/', employers, Config.jwt())
      .map((response: Response) => response.json());
  }

  public changePassword(model) {
    return this._http.post(Config.API_URL + '/employers/change_password/', model, Config.jwt())
      .map((response: Response) => response.json());
  }

  public delete(id: number) {
    let account_id = localStorage.getItem('currentAccountId');
    return this._http.delete(Config.API_URL + '/employers/' + id + '/?account=' + account_id, Config.jwt())
      .map((response: Response) => response.json());
  }
}
