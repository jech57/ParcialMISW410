import { Component, OnInit } from '@angular/core';
import { CoffeeService } from '../services/coffee.service';
import { Coffee } from './coffee';

@Component({
  selector: 'app-coffee',
  standalone: false,
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})

export class CoffeeComponent implements OnInit {

  coffees: Coffee[] = [];
  blendCoffees: number = 0;
  originCoffees: number = 0;

  constructor(private coffeeService: CoffeeService) { }

  getCoffeesList() {
    this.coffeeService.getCoffees().subscribe(
      (data: Coffee[]) => {
        this.coffees = data;

        for (let i = 0; i < this.coffees.length; i++) {
          if (this.coffees[i].tipo === 'Blend') {
            this.blendCoffees++;
          } else {
            this.originCoffees++;
          }
        }
      },
      (error) => {
        console.error('Error fetching coffee data', error);
      }
    );
  }

  ngOnInit() {
    this.getCoffeesList();
  }
}
