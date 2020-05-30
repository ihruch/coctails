import { Component, OnInit } from '@angular/core';
import {ApiService} from '../shared/api.service';
import {Product} from './../shared/models/product.model';

@Component({
  selector: 'app-main',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  listData: Product[];

  constructor(
    private  apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getData().subscribe( (data: Product[]) => {
      this.listData = data;
    });
  }


  showMore(name: any) {
    this.listData.forEach( item => {
      if ( item[name] === name) {
        item[count] = (item[count] === item[data].length) ? 10 : +item[data].length;
      }
      return item;
    });
  }
}
