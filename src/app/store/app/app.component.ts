import { Component, OnInit, Input } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { App } from 'src/app/shared/app.model';
import { SubmissionService } from 'src/app/services/submission.service';
import { Submission } from 'src/app/shared/submission.model';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  public id: string;
  public app = new App();
  public submissions = new Array<Submission>();
  public loaded: boolean = false;
  constructor(private route: ActivatedRoute,
    public storeService: StoreService,
    public submissionService: SubmissionService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.storeService.getApp(this.id).subscribe(app => {
      this.app = app;
      this.loaded = true;
      this.loadSubmissions();
    });
  }

  private updateResponse(submission: Submission) {
    console.log(submission.response != null);
    if(submission.response != null) {
      return;
    }
    this.submissionService.getSubmission(this.id, submission._id).subscribe(s => {
      if(s.response != null) {
        console.log(s);
        for(let i=0; i < this.submissions.length; ++i) {
          if(this.submissions[i]._id === s._id) {
            this.submissions[i].response = s.response;
            break;
          }
        }
      } else {
        setTimeout(() => this.updateResponse(submission), 5000);
      }
    }, (e) => {
      setTimeout(() => this.updateResponse(submission), 10000);
    });
  }

  private loadSubmissions() {
    this.submissionService.getSubmissions(this.id).subscribe(submissions => {
      this.submissions.push(...submissions);
      this.submissions.forEach((e) => this.updateResponse(e));
    });
  }

  public upload(file: FileList): void {
    this.submissionService.submit(this.id, file.item(0)).subscribe(submission => {
      this.submissions.unshift(submission);
      this.updateResponse(submission);
    })
  }

  public downloadButtonClick(submission: Submission) {
    console.log(submission.response);
  }

  public errorButtonClick(submission: Submission) {
    console.log(submission.response);
  }

}
