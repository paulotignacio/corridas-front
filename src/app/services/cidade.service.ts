import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cidade } from '../models/cidade.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private baseUrl = 'https://corridasapi1-0qtf945p.b4a.run/cidades'; // Sua URL da API

  constructor(private http: HttpClient) {}

  listarCidades(): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(this.baseUrl);
  }

  listarCidade(id: number): Observable<Cidade> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Cidade>(url);
  }

  listarCidadesDoEstado(estado_id: number): Observable<Cidade[]> {
    const url = `${this.baseUrl}?estado=${estado_id}`;
    return this.http.get<Cidade[]>(url);
  }
  
  atualizarCidade(cidade: Cidade): Observable<Cidade> {
    if(cidade.id == 0)
      return this.http.post<Cidade>(this.baseUrl+"/", cidade);
    else
      return this.http.put<Cidade>(this.baseUrl+"/"+cidade.id+"/", cidade)
  }

  removerCidade(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
