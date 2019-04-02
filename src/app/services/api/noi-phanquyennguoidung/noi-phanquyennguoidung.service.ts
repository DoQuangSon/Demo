import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreeItem, TreeviewItem } from 'ngx-treeview';
import { Observable } from 'rxjs/Observable';
import { QL_NHOM_NGUOI_DUNG } from '../../../constants/api.constants';
import { AuthService } from '../../../auth/auth.service';

@Injectable({   providedIn: 'root' })
export class PhanQuyenUserService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  checkTreeChecked(node: any) {
    if (!node.children || (node.children || []).length <= 0) {
      return node.checked;
    } else {
      let checked = false;
      for (const child of node.children) {
        child.checked = this.checkTreeChecked(child);
        if (child.checked) {
          checked = true;
        }
      }
      return checked;
    }
  }

  getCheckedAndChildrenProperty(node: any) {
    const children = node.children || node.internalChildren;
    const checked = node.checked || node.internalChecked || false;
    node.checked = checked;
    node.children = children;

    if (children) {
      for (const child of children) {
        this.getCheckedAndChildrenProperty(child);
      }
    }
    return node;
  }

  patchValueToTreeView(res): TreeviewItem[] {
    const TreeViewList: any = [];
    for (const item of res) {
      const _item = new TreeviewItem(<TreeItem>item);
      TreeViewList.push(_item);
    }
    return [...TreeViewList];
  }

  getTrueFalseForChecked(res) {
    for (const item of res) {
      if (!item.checked) {
        item.checked = false;
      }
      if (item.children) {
        item.children = this.getTrueFalseForChecked(item.children);
      }
    }
    return res;
  }

  getUserPermissionList(authorityId): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.get(QL_NHOM_NGUOI_DUNG.GET_PERMISSION_TREEVIEW + `?authorityId=${authorityId}`);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  updatePermissionTreeView(body): Observable<any> {
    //const options = createCommonHeaders(this.authService);
    return this.http.post(QL_NHOM_NGUOI_DUNG.UPDATE_PERMISSION_TREEVIEW, body);//, options)
      //.map(extractData)
      //.catch(handleError);
  }

  getPathFromPermissionList(listPermission, all = false): Array<string> {
    const listPath = [];
    for (const permission of listPermission) {
      if (permission.path) {
        if (all) {
          listPath.push(permission.path);
        } 
        if (!all && permission.checked) {
          listPath.push(permission.path);
        }
      }
      if (permission.children) {
        listPath.push(...this.getPathFromPermissionList(permission.children, all));
      }
    }
    return listPath;
  }
}
