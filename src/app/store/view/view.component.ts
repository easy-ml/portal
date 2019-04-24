import { Component, OnInit, ApplicationInitStatus } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { App } from 'src/app/shared/app.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { Uploaded } from 'src/app/shared/uploaded.model';

declare var $: any;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.styl']
})
export class ViewComponent implements OnInit {
  public applications = new Array<App>();
  public loaded = false;
  private appData: Uploaded;
  private imageData: Uploaded;
  private imageUploading = false;
  private appUploading = false;
  private form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    app: new FormControl('', [Validators.required]),
  });
  constructor(private storeService: StoreService, private router: Router, private storageService: StorageService) { }

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
    this.storageService.upload(files.item(0)).subscribe(uploaded => {
      this.imageUploading = false;
      this.form.patchValue({ image: uploaded.original_filename });
      this.imageData = uploaded;
      console.log(this.imageData);
    });
  }

  uploadAppFromDisk(files: FileList) {
    this.appUploading = true;
    this.storageService.upload(files.item(0)).subscribe(uploaded => {
      this.appUploading = false;
      this.form.patchValue({ app: uploaded.original_filename });
      this.appData = uploaded;
      console.log(this.appData);
    });
  }

  publish() {
    const form = this.form.value;
    if (this.imageData && this.appData) {
      let request = {
        'title': form.title,
        'description': form.description,
        'cover': this.imageData.id,
        'details': {
          'app_id': this.appData.id,
        },
        'price': 0
      };
      this.storeService.publish(request).subscribe(app => {
        this.router.navigate(['/store/' + app._id])
      });
    }
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
