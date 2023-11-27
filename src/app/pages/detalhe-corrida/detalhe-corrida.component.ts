import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Corrida } from 'src/app/models/corrida.model';

@Component({
  selector: 'app-detalhe-corrida',
  templateUrl: './detalhe-corrida.component.html',
  styleUrls: ['./detalhe-corrida.component.css']
})
export class DetalheCorridaComponent {
  corrida: any;

  constructor(
    public dialogRef: MatDialogRef<DetalheCorridaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { corrida: Corrida },
    public dialog: MatDialog
  ) {
    this.corrida = data.corrida;
  }

  fecharModal(): void {
    this.dialog.closeAll();
  }
}
