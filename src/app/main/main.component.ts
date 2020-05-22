import { Component, OnInit } from '@angular/core';
import {ApiService} from '../shared/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  listData: any;

  constructor(
    private  apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getData().subscribe(data => {
      this.listData = data;
      console.log('ListData', this.listData);
    });
  }


  showAndHide(name: any) {
    this.listData.forEach( i => {
      if ( i.name === name) {
        i.count = (i.count === i.data.length) ? 10 : +i.data.length;
      }
      return i;
    });
  }
}
