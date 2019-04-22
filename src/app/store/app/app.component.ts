import { Component, OnInit, Input } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { App } from 'src/app/shared/app.model';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  private id: string;
  private app = new App();
  public loaded: boolean = false;
  constructor(private route: ActivatedRoute, private storeService: StoreService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.storeService.getApp(this.id).subscribe(app => {
      this.app = app;
      this.loaded = true;
    });
  }

  public upload(file: FileList): void {
    console.log(file.item(0));
  }

}
