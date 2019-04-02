import { Injectable } from '@angular/core';
import { range as LD_range } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  getPager(currentPage?: number, pageSize?: number, totalPage?: number) {

    let startPage: number, endPage: number;
    if (totalPage <= 5) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPage;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPage) {
        startPage = totalPage - 4;
        endPage = totalPage;
      } else {
        console.log(2);
        startPage = currentPage - 1;
        endPage = currentPage + 3;
      }
    }

    // create an array of pages to ng-repeat in the pager control
    const pages = LD_range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPage,
      startPage: startPage,
      endPage: endPage,
      pages: pages
    };
  }
}
