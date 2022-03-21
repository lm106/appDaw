import { Component, OnInit } from '@angular/core';
import { tienda } from '../tienda';
import { TiendaService } from '../tienda.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  productos: tienda[] = [];

  constructor(private heroService: TiendaService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.heroService.getProductos()
      .subscribe(productos => this.productos = productos.slice(2, 4));
  }
}