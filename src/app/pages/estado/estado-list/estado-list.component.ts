import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmacaoDialogComponent } from 'src/app/pages/confirmacao-dialog/confirmacao-dialog.component';
import { Estado } from 'src/app/models/estado.model';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-estado-list',
  templateUrl: './estado-list.component.html',
  styleUrls: ['./estado-list.component.css']
})
export class EstadoListComponent implements OnInit{
  estados: Estado[] = [];

  constructor
  ( private estadoService: EstadoService,
    private router: Router,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.listarEstados();
  }

  listarEstados(): void {
    this.estadoService.listarEstados().subscribe((estados) => {
      this.estados = estados;
    });
  }

  editarEstado(estado: Estado) {
    this.router.navigate(['/estados/editar', estado.id]);
  }

  removerEstado(id: number): void{
    this.estadoService.removerEstado(id).subscribe(() => {
      this.listarEstados();
    });
  }

  confirmarExclusao(estado: Estado): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '250px',
      data: { mensagem: 'Deseja excluir o registro?' },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.removerEstado(estado.id);
      }
    });
  }
}
