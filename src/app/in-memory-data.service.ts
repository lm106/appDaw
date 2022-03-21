import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { tienda } from './tienda';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const productlist = [
      { id: 11, name: 'Papelería' },
      { id: 12, name: 'Tecnología' },
      { id: 13, name: 'Ferretería' },
      { id: 14, name: 'Accesorios' },
      { id: 15, name: 'Hogar' },
    ];
    return {productlist};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(productlist: tienda[]): number {
    return productlist.length > 0 ? Math.max(...productlist.map(product => product.id)) + 1 : 11;
  }
}