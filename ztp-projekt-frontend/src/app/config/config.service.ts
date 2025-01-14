import { Injectable } from '@angular/core';
import {ApiPaths} from "./api-paths";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public getApiUrl(key: string){
    const apiHost = 'http://localhost:8080';

    // @ts-ignore
    let endpointPath = ApiPaths[key] as string;

    if(!endpointPath)
      throw new Error(`ConfigService: Configuration value ApiPaths[${key}] not found`);

    return apiHost + endpointPath;
  }
}
