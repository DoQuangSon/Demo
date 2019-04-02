import {Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SIDE_MENU } from '../../../shared/models/menu/menu.model';
import { Menu } from '../../../shared/models/menu/menu.interface';
import { AuthService } from '../../../auth/auth.service';
import { NoiAccountService } from '../../../services/api/noi-account/noi-account.service';
import { FileResourceService } from '../../../services/helper/file-resource.service';
import { IUser } from '../../../interfaces/account.interface';
import { MainLayoutService } from '../../../services/dom-events/main-layout.service';


@Component({
  selector: 'ttkt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  data: Menu = SIDE_MENU;
  nowUrl: any;
  account: IUser;
  mobileShow: boolean = false;

  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('imageUser') public imageUser: ElementRef;
  @ViewChild('navbarNavDropdown') public navbarNavDropdown: ElementRef;

  constructor(
    private loginService: AuthService,
    private router: Router,
    private noiAccountService: NoiAccountService,
    private auth: AuthService,
    private fileResourceService: FileResourceService,
  ) {
   }

  ngOnInit() {
    this.account = this.auth.currentUser;
    console.log(this.account);
    this.nowUrl = this.router.url;
    this.data.items.forEach(e => {
      if (e.path === 'ql-hd-ttkt') {
        e.url = '/ql-hd-ttkt';
      } else if (e.path === 'ql-hethong-ttkt') {
        e.url = '/ql-hethong-ttkt';
      } else if (e.path === 'ql-tiep-cd') {
        e.url = '/ql-tiep-cd';
      }
    });

  }

  ngAfterViewInit() {
    const u: HTMLImageElement = this.imageUser.nativeElement as HTMLImageElement;

    //@Todo: get link server
    // this.fileResourceService.downloadFile(this.account.imageUrl).subscribe(item => u.src  = window.URL.createObjectURL(item));
  }

  showMobileMenu(event) {
    // console.log(event);
    this.mobileShow = !this.mobileShow;
    // console.log(this.mobileShow);
    if (this.mobileShow) {
      event.target.className =
      event.target.className.replace('collapsed', '');
      this.navbarNavDropdown.nativeElement.className += ' show';
    } else {
      event.target.className += 'collapsed';
      this.navbarNavDropdown.nativeElement.className =
      this.navbarNavDropdown.nativeElement.className.replace('show', '');
      
    }
  }

  logout() {
    console.log('logout');
    this.loginService.logout();
  }
  changePass(){
    
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  checkPermission(path) {
    return this.auth.checkPermission(path);
  }
}
