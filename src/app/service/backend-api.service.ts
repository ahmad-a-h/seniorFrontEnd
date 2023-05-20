import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class BackendApiService { 
  private REST_API_SERVER = environment.backendUrl;

  constructor(private readonly httpClient: HttpClient) { }

  public get(url: string) {
    return this.httpClient
      .get(this.REST_API_SERVER + url, { observe: 'response' });
  }

  public put(url: string, params: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    var json = JSON.stringify(params);
    return this.httpClient
      .put(this.REST_API_SERVER + url, json, { headers });
  }

  public post(url: string, params: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    var json = JSON.stringify(params);
    return this.httpClient
      .post(this.REST_API_SERVER + url, json, { headers });
  }

  public uploadImage(url: string, params: any) {
    return this.httpClient
      .post(this.REST_API_SERVER + url, params);
  }

  public delete(url: string) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    return this.httpClient
      .delete(this.REST_API_SERVER + url, { headers });
  }
  private obj:any
  public setData(obj:any){
    this.obj = obj
  }
  public getData(){
    return this.obj
  }

}