import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { RestResponse } from '../models/api/rest-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetDataApiService {

  private readonly API_URL = 'http://localhost:9000/api/v1/';

  constructor(private httpClient: HttpClient) { }

  /**
   * Get data fro a random planet from the planets API endpoint.
   */
  public getRandomPlanet(): Observable<RestResponse> {
    return this.httpClient.get<RestResponse>(`${this.API_URL}/planets?queryType=random`);
  }

}
