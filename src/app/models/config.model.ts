import {RequestOptions, Headers} from '@angular/http';

export class Config {
  // dev
  // media url
  public static MEDIA_URL = 'http://127.0.0.1:8000/statics/media';
  // api url
  public static API_URL = 'http://127.0.0.1:8000';
  // live
  // media url
  //public static MEDIA_URL = 'http://api.carojobs.com/statics/media';
  // api url
  //public static API_URL = 'http://api.carojobs.com';
  // login info
  public static API_LOGIN = '/auth/token/';
  public static client_id = 'carojobs';
  public static client_secret = 'carodev@carojobs';
  // API uri
  // Employer register
  public static API_REGISTER = '/employers/';
  // Upload
  public static API_UPLOAD = '/users/upload/';
  // cache systemPreference
  public static CACHE_SYSTEM_PREFERENCE_TIME = 300;

  public static jwt(multipart = false) {
    // create authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.access_token) {
      const headers = new Headers({'Authorization': 'Bearer ' + currentUser.access_token});
      // if (multipart) {
      //   headers.append('Content-Type', 'multipart/form-data');
      // }
      return new RequestOptions({headers: headers});
    }
  }
}
