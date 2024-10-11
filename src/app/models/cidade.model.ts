import { Estado } from "./estado.model";

export interface Cidade {
    id: number,
    nome: string,
    estado:  { id: 0, nome: '', uf: '' }
};