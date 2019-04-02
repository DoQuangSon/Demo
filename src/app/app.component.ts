import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading = false;
  constructor(public loader: LoadingBarService) {
    loader.progress$.subscribe(load => {
      if (load == 100 || load == 0) {
        this.loading = false;
      } else {
        this.loading = true;
      }
    });
  }
}
