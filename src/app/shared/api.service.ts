import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { pluck } from 'rxjs/operators';
import {forkJoin, Subject} from 'rxjs';
import {Category} from './models/category.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  mainURL = 'https://www.thecocktaildb.com/api/json/v1/1/';
  listDrinks = 'filter.php?c=';
  listFilters = 'list.php?c=list';

  listCoctails: Array<string> = [];
  private data$ = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  setData(data: Category[]) {
    this.data$.next(data);
  }

  getData() {
    return this.data$.asObservable();
  }


  getFilters() {
    return this.http.get(`${this.mainURL}${this.listFilters}`).pipe(pluck('drinks'));
  }

  getDrinks() {
    const list = this.listCoctails.map( i => this.http.get(`${this.mainURL}${this.listDrinks}${i}`)
                    .pipe(pluck('drinks')));

    forkJoin(...list).subscribe( data => {
      this.setData(data.map( (val, ind) => ({name: this.listCoctails[ind], data: val, count: 10})));
    });
  }

}
