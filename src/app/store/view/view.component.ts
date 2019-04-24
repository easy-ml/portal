import { Component, OnInit, ApplicationInitStatus } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { App } from 'src/app/shared/app.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.styl']
})
export class ViewComponent implements OnInit {
  public applications = new Array<App>();
  public loaded = false;
  private appData: any;
  private imageData: any;
  private imageUploading = false;
  private appUploading = false;
  private form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    app: new FormControl('', [Validators.required]),
  });
  constructor(private storeService: StoreService, private router: Router) { }

  addButtonClick() {
    $('.ui.modal').modal('show');
  }

  ngOnInit() {
    this.storeService.getApps().subscribe(apps => {
      this.applications.push(...apps.items);
      this.loaded = true
    });
  }

  moreButtonClick(app: App) {
    console.log(app);
    this.router.navigate(['/store/' + app._id]);
  }

  uploadImageFromDisk(files: FileList) {
    this.imageUploading = true;
    console.log(files);
  }

  uploadAppFromDisk(files: FileList) {
    console.log(files);
  }

  publish() {
    console.log('publish');
  }


  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }

  get image() {
    return this.form.get('image');
  }

  get app() {
    return this.form.get('app');
  }

}
