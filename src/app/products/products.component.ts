import { Component, OnInit } from '@angular/core';
import {ApiService} from '../shared/api.service';
import {Category} from './../shared/models/category.model';

@Component({
  selector: 'app-main',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  listData: Category[];

  constructor(
    private  apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getData().subscribe( (data: Category[]) => {
      this.listData = data;
    });
  }


  showMore(name: any) {
    this.listData.forEach( (item: Category) => {

      if ( item.name === name) {
        item.count = (item.count === item.data.length) ? 10 : +item.data.length;
      }
      return item;
    });
  }
}
