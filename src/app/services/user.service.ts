import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Config} from '../models/config.model';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  public constructor(private _http: Http) {
  }

  public upload(file, folder = 'images') {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('folder', folder);
    return this._http.post(Config.API_URL + Config.API_UPLOAD, formData, Config.jwt(true))
      .map((response: Response) => response.json());
  }
}
