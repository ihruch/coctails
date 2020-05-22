import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn} from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  list: any = [];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getFilters().subscribe( list => {
      this.list = list;
      this.addCheckboxes();
      this.fetchListCoctails(this.list.map(i => i.strCategory));
    });

    this.form = this.fb.group({
      orders: new FormArray([], this.minSelectedCheckboxes(1))
    });
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }

  private addCheckboxes() {
    this.list.forEach((name, ind) => {
      const control = new FormControl(true);
      (this.form.controls.orders as FormArray).push(control);
    });
  }

  submit() {
    const selectedOrderIds = this.form.value.orders
        .map((value, ind) => (value ? this.list[ind].strCategory : null))
        .filter(value => value !== null);

    this.fetchListCoctails(selectedOrderIds);
  }

  fetchListCoctails(list) {
    this.apiService.listCoctails = list;
    this.apiService.getDrinks();
  }
}
