import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { MenuItem } from '../../../shared/models/menu-item/menu-item.interface';
import { NotificationService } from '../../../services/api/notification/notification.service';
import { SIDE_MENU } from '../../../shared/models/menu/menu.model';
import { AuthService } from '../../../auth/auth.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ttkt-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy {
  data: MenuItem[] = [];
  open = true;
  account: any;
  accountType: string;
  routerSub: Subscription;
  menuSub: Subscription;
  collapse?: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  listKeHoach: any;
  listChoduyet = [];
  soKeHoach = 0;
  constructor(
    private _router: Router,
    private notiService: NotificationService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.renderClass();
    this.account = this.authService.currentUser;
    this.accountType = this.authService.accountType;
    this._filterData(location.href);
    this.routerSub = this._router.events.pipe(takeUntil(this.destroy$)).subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this._filterData(event.url);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  toggle() {
    this.open = !this.open;
    this.renderClass();
    console.log(this.open);
  }

  renderClass() {
    document.body.className =
      document.body.className.replace('sidebar-open', '');
    document.body.className =
      document.body.className.replace('sidebar-close', '');

    if (!this.open) {
      document.body.className += ' sidebar-close';
    } else {
      document.body.className += ' sidebar-open';
    }
  }

  private _filterData(url: string) {
    const item = SIDE_MENU.items.find((i: MenuItem) => (i.path && url.indexOf(i.path) > -1));
    if (item) {
      this.data = item.children;
    }
  }

  // private _setSidebar(state: SideBarState) {
  //   this.open = state.open;
  // }

  checkPermission(path) {
    return this.authService.checkPermission(path);
  }
  resetWait() {
    this.soKeHoach = 0;
    if (this.listChoduyet !== undefined || this.listChoduyet.length > 0) {
      this.notiService.updateNotifiSeen(this.listChoduyet).subscribe();
    }
  }
}
