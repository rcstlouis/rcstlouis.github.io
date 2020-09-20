import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'mstl-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  name = 'A1';
  defaultBranch = 'master';
  url = 'https://github.com/mastlouis/a1-gettingstarted';
  readme = 'Failed to load README';
  description = 'The first assignment for CS4241';

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getReadme(this.getUrlForRaw(this.url)).subscribe({
      next: (data: string) => {
        this.readme = data;
      },
      error: err => {
        if (err.status === 200) {
          this.readme = err.error.text;
        }
        else {
          console.error(`Error retrieving readme: ${err.message}`);
        }
      }
    })
  }

  getUrlForRaw(url: string) {
    // Original Form: https://github.com/${user}/${project}
    // New Form `https://raw.githubusercontent.com/${user}/${project}/${branch}/README.md`
    return `https://raw.githubusercontent.com${
      url.substr(18, url.length - 18)
    }/${this.defaultBranch}/README.md`;

  }

  debug() {
    debugger;
  }

}
