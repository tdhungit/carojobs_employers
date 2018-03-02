import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Config} from "../models/config.model";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ConfigService {
  public constructor(private _http: Http) {
  }

  public get() {
    if (!localStorage.getItem('systemPreference')) {
      return this.get_from_api();
    } else {
      let configObject = JSON.parse(localStorage.getItem('systemPreference'));
      let d = new Date();
      let cache_time = configObject.cache_time || 0;
      let cache_duration = (d.getTime() - cache_time) / 1000;

      if (cache_duration > Config.CACHE_SYSTEM_PREFERENCE_TIME) {
        return this.get_from_api();
      } else {
        return Observable.create((subscriber) => {
          subscriber.next(configObject);
          subscriber.complete();
        });
      }
    }
  }

  public get_from_api() {
    return this._http.get(Config.API_URL + '/users/config/', Config.jwt())
      .map((response: Response) => {
        let result = response.json();
        let d = new Date();
        result.cache_time = d.getTime();
        localStorage.setItem('systemPreference', JSON.stringify(result));
        return result;
      });
  }

  public get_from_cache() {
    if (localStorage.getItem('systemPreference')) {
      return JSON.parse(localStorage.getItem('systemPreference'));
    }
    return false;
  }

  public get_pagination() {
    let config: any = {};
    if (localStorage.getItem('systemPreference')) {
      config = JSON.parse(localStorage.getItem('systemPreference'));
    }
    if (config.pagination) {
      return config.pagination;
    }
    return {page_item: 10}
  }
}
