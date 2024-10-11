import { Cidade } from "./cidade.model";

export interface Corrida {
    id: number;
    nome: string;
    inicio_inscricao: string;
    fim_inscricao: string;
    data_largada: string;
    hora_largada: string;
    data_hora_largada: Date;
    percurso: string;
    valor: number;
    site: string;
    cidade: Cidade;
    organizador: number;
}
