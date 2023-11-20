import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Corrida } from '../models/corrida.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorridaService {
  private baseUrl = 'https://corridasapi-8xt2jifx.b4a.run/corridas'; // Sua URL da API

  constructor(private http: HttpClient) {}

  listarCorridas(): Observable<Corrida[]> {
    return this.http.get<Corrida[]>(this.baseUrl);
  }

  listarCorrida(id: number): Observable<Corrida> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Corrida>(url);
  }

  listarCorridasPorOrganizadorId(id: number): Observable<Corrida[]> {
    const url = `${this.baseUrl}?organizador=${id}`;
    return this.http.get<Corrida[]>(url);
  }
  
  atualizarCorrida(corrida: Corrida): Observable<Corrida> {
    if(corrida.id == 0)
      return this.http.post<Corrida>(this.baseUrl+"/", corrida);
    else
      return this.http.put<Corrida>(this.baseUrl+"/"+corrida.id+"/", corrida)
  }

  removerCorrida(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
