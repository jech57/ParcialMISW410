import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeeComponent } from './coffee.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CoffeeComponent],
  exports: [CoffeeComponent]
})
export class CoffeeModule { }
