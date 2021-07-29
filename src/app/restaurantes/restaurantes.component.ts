import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NovoRestauranteComponent } from '../novo-restaurante/novo-restaurante.component';
import { PgRestauranteComponent } from '../pg-restaurante/pg-restaurante.component';
import { RestaurantesService } from '../shared/restaurantes.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss']
})
export class RestaurantesComponent implements OnInit {

  toSearch: any = '';
  siglas: Array<any> = [];

  restaurantes: Array<any> = [];

  constructor(
    private _http: HttpClient, private dialog: MatDialog,
    private _restaurantesServices: RestaurantesService
    ) { }

  ngOnInit(): void {
    this.listarRestaurantes();

    this._http.get('https://servicodados.ibge.gov.br/api/v1/localidades/regioes/1|2|3|4|5/estados').subscribe((res: any) => {
      let estados = res;
      estados = estados.sort((a: any, b: any) => (a.nome > b.nome) ? 1 : -1);
      estados.forEach((estado: any) => {
        this.siglas.push({
          nome: estado.nome,
          sigla: estado.sigla
        })
      })
    })
  }

  async listarRestaurantes() {
    await this._restaurantesServices.listarRestaurantes()
    .subscribe(rests => {
      this.restaurantes = rests.map(rest => rest);
      this.restaurantes = this.restaurantes.sort((a, b) => b.criadoEm.seconds - a.criadoEm.seconds);
    });
  }

  novoRestaurante() {
    const dialogRef = this.dialog.open(NovoRestauranteComponent, {
      width: '80%',
      height: 'max-content',
      data: {
        usuario: '',
        siglas: this.siglas
      }
    });

    dialogRef.afterClosed().subscribe((data: any)=>{
      this.restaurantes.push(data);
    })
  }

  sair() {
    console.log('Olá, função sair');
  }

  abrirRestaurante(restaurante: any) {
    this.dialog.open(PgRestauranteComponent, {
      width: "80%",
      height: "98vh",
      data: restaurante,
      panelClass: "custom-dialog-container"
    })
  }
}
