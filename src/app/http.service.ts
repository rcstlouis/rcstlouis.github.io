import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { IProject } from './model/project.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  projects: IProject[] = null;

  constructor(private _http: HttpClient) { }

  getProjectList(): Observable<IProject[]> {
    const url = "https://api.github.com/users/rcstlouis/repos";
    return this._http.get<IProject[]>(url).pipe(
      tap(data => console.log(`Data from Github: ${JSON.stringify(data)}`))
    )
  }

  getProjects(): IProject[] {
    if (this.projects) {
      return this.projects;
    }
    const url = "https://api.github.com/users/rcstlouis/repos";
    this._http.get<IProject[]>(url).pipe(
      tap(data => console.log(`Data from Github: ${JSON.stringify(data)}`))
    ).subscribe({
      next: data => {
        console.log(`Data for the table: ${JSON.stringify(data)}`);
        this.projects = data;
      }, error: err => {
        console.error(`Problem loading the project data: ${JSON.stringify(err)}`);
      }
    })
  }

  getReadme(url): Observable<string> {
    return this._http.get<string>(url).pipe(
      tap( data => console.log(`Truncated Readme: ${data.substr(0, 30)}`) )
    );
  }

}
