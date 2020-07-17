import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { IProject } from './model/project.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getProjectList(): Observable<IProject[]> {
    const url = "https://api.github.com/users/mastlouis/repos";
    return this._http.get<IProject[]>(url).pipe(
      tap(data => console.log(`Data from Github: ${JSON.stringify(data)}`))
    )
  }
}
