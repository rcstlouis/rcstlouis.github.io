import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mstl-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private _http: HttpClient) { }

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

}
