import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpService } from '../http.service';

@Component({
  selector: 'mstl-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  projects: any;

  constructor(private _http: HttpClient, private httpService: HttpService) { }

  ngOnInit(): void {
  }

  downloadPDF(): any {
    const url = "assets/Resume.pdf";
    // return this._http.get(url, {responseType: "blob"}).map(
    //  (res) => { return new Blob([res.blob()], { type: 'application/pdf' })
    //  (res) => { return new Blob([res], { type: 'application/pdf' }),
    // );
    return this._http.get(url, { responseType: 'blob'}).pipe(
      map(res => {
        return new Blob([res], { type: 'application/pdf' });
      })
    );
  }

  resume(): void {
    this.downloadPDF().subscribe(
      (res) => {
        var fileURL = URL.createObjectURL(res);
        window.open(fileURL);
      }
    );
  }

  getProjects(): void {
    this.httpService.getProjectList().subscribe({
      next: data => {
        console.log(`Data in component: ${JSON.stringify(data)}`);
        this.projects = data;
      },
      error: err => {
        console.error(`Something went wrong in the component: ${JSON.stringify(err)}`);
      }
    });
  }

}
