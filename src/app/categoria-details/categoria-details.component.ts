import { Component, Input, OnInit } from '@angular/core';
import { tienda } from '../tienda';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TiendaService } from '../tienda.service';
@Component({
  selector: 'app-categoria-details',
  templateUrl: './categoria-details.component.html',
  styleUrls: ['./categoria-details.component.css']
})
export class CategoriaDetailsComponent implements OnInit {
  product: tienda | undefined;
  constructor(private route: ActivatedRoute,
    private tiendaService: TiendaService,
    private location: Location) { }

  ngOnInit(): void {
    this.getproduct();
  }
  getproduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tiendaService.getProduct(id)
      .subscribe(product => this.product = product);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.product) {
      this.tiendaService.updateHero(this.product)
        .subscribe(() => this.goBack());
    }
  }
}
