import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmacaoDialogComponent } from 'src/app/pages/confirmacao-dialog/confirmacao-dialog.component';
import { Corrida } from 'src/app/models/corrida.model';
import { CorridaService } from 'src/app/services/corrida.service';

@Component({
  selector: 'app-corrida-list',
  templateUrl: './corrida-list.component.html',
  styleUrls: ['./corrida-list.component.css']
})
export class CorridaListComponent implements OnInit{
  corridas: Corrida[] = [];
  organizadorId = '';

  constructor
  ( private corridaService: CorridaService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.carregarStorage();

    if(this.organizadorId){
      const numberId = +this.organizadorId;
      this.corridaService.listarCorridasPorOrganizadorId(numberId).subscribe((corridas) => {
        this.corridas = corridas;
      });
    }
  }

  listarCorridas(): void {
    this.corridaService.listarCorridas().subscribe((corridas) => {
      this.corridas = corridas;
    });
  }

  editarCorrida(cidade: Corrida) {
    this.router.navigate(['/corridas/editar', cidade.id]);
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
  }
}
