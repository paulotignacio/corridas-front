import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmacaoDialogComponent } from 'src/app/pages/confirmacao-dialog/confirmacao-dialog.component';
import { Corrida } from 'src/app/models/corrida.model';
import { CorridaService } from 'src/app/services/corrida.service';

@Component({
  selector: 'app-corrida-list',
  templateUrl: './corrida-list.component.html',
  styleUrls: ['./corrida-list.component.css']
})
export class CorridaListComponent implements OnInit{
  titulo = 'Corridas';
  corridas: Corrida[] = [];
  organizadorId = '';
  administradorId = '';


  constructor
  ( private corridaService: CorridaService,
    private router: Router,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.carregarStorage();

    if(this.organizadorId){
      this.titulo = 'Minhas corridas';
      const numberId = +this.organizadorId;
      this.corridaService.listarCorridasPorOrganizadorId(numberId).subscribe((corridas) => {
        this.corridas = corridas;
      });
    }

    if(this.administradorId){
      this.corridaService.listarCorridas().subscribe((corridas => {
        this.corridas = corridas;
      }));
    }
  }

  listarCorridas(): void {
    this.corridaService.listarCorridas().subscribe((corridas) => {
      this.corridas = corridas;
    });
  }

  editarCorrida(corrida: Corrida) {
    this.router.navigate(['/corridas/editar', corrida.id]);
  }

  removerCorrida(id: number): void{
    this.corridaService.removerCorrida(id).subscribe(() => {
      this.listarCorridas();
    });
  }

  confirmarExclusao(corrida: Corrida): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '250px',
      data: { mensagem: 'Deseja excluir o registro?' },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.removerCorrida(corrida.id);
      }
    });
  }

  carregarStorage(): void{
    const organizadorId = localStorage.getItem('organizadorId');
    if(organizadorId)
      this.organizadorId = organizadorId;

    const administradorId = localStorage.getItem('administradorId');
    if(administradorId)
      this.administradorId = administradorId;
  }
}
