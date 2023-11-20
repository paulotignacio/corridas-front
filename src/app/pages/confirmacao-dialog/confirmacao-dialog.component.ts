// confirmacao-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao-dialog',
  templateUrl: './confirmacao-dialog.component.html',
})
export class ConfirmacaoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmacaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensagem: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Retorna true se o usuário confirmar
  }

  onCancel(): void {
    this.dialogRef.close(false); // Retorna false se o usuário cancelar
  }
}
