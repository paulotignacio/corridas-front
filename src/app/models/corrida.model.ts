import { Time } from "@angular/common";

export interface Corrida {
    id: number;
    nome: string;
    inicio_inscricao: Date;
    fim_inscricao: Date;
    data_largada: Date;
    hora_largada: string;
    percurso: string;
    valor: number;
    site: string;
    cidade: number;
    organizador: number;
}
