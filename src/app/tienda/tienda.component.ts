import { Component, OnInit } from '@angular/core';
import { tienda } from '../tienda';

import { TiendaService } from '../tienda.service';
import { MessageService } from '../message.service';
import { PRODUCTLIST } from '../productlist';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  productos: tienda[] = [];
  
  constructor(private tiendaService: TiendaService,  private messageService: MessageService) { }

  ngOnInit(): void {
    this.getProduct();
  }
 
  getProduct(): void {
    this.tiendaService.getProductos()
        .subscribe(productos => this.productos = productos);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.tiendaService.addProduct({ name } as tienda)
      .subscribe(product => {
        this.productos.push(product);
      });
  }
  
  delete(producto: tienda): void {
    this.productos = this.productos.filter(h => h !== producto);
    this.tiendaService.deleteProduct(producto.id).subscribe();
  }

}
