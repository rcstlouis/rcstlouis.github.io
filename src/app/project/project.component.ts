import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { IProject } from '../model/project.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mstl-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  readme = 'No README Available';
  id = null
  project: IProject = null;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.id = params.get('id');
      this.loadProject(this.id);
    })
  }

  loadProject(id: string) {
    this.httpService.getProjectList().subscribe({
      next: projects => {
        console.log(`Data: ${JSON.stringify(this.project)}`);
        for (let project of projects) {
          if (project.name === id) {
            this.project = project;
            this.loadReadme();
          }
        }
      }, error: err => {
        console.error(`Problem loading the project data: ${JSON.stringify(err)}`);
      }
    })
  }

  loadReadme() {
    this.httpService.getReadme(this.getUrlForRaw(this.project.html_url)).subscribe({
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
    });
  }

  getUrlForRaw(url: string) {
    // Original Form: https://github.com/${user}/${project}
    // New Form `https://raw.githubusercontent.com/${user}/${project}/${branch}/README.md`
    return `https://raw.githubusercontent.com${
      url.substr(18, url.length - 18)
    }/${this.project.default_branch}/README.md`;

  }

  debug() {
    debugger;
  }

}
