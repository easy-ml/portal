import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { App } from 'src/app/shared/app.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.styl']
})
export class ViewComponent implements OnInit {

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.getApps().subscribe((apps: App[]) => {
      console.log(apps);
    });
  }

}
