import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  list: any;
  isSpinner = true;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {

  }

}
