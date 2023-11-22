import { Injectable } from '@angular/core';
import { Atleta } from '../models/atleta.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtletaService {
  private baseUrl = 'https://corridasapi1-0qtf945p.b4a.run/atletas'; // Sua URL da API

  constructor(private http: HttpClient) {}

  listarAtletas(): Observable<Atleta[]> {
    return this.http.get<Atleta[]>(this.baseUrl);
  }

  listarAtleta(id: number): Observable<Atleta> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Atleta>(url);
  }
  
  atualizarAtleta(atleta: Atleta): Observable<Atleta> {
    if(atleta.id == 0)
      return this.http.post<Atleta>(this.baseUrl+"/", atleta);
    else
      return this.http.put<Atleta>(this.baseUrl+"/"+atleta.id+"/", atleta)
  }

  removerAtleta(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  login(username: string, password: string): Observable<Atleta> {
    const url = `${this.baseUrl}?username=${username}&password=${password}`;
    return this.http.get<Atleta>(url);
  }
}
