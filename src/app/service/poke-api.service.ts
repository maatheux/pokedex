import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url = 'https://pokeapi.co/api/v2/pokemon/'

  constructor(private http: HttpClient) { }

  public apiListAllPokemons(offset: number, limit: number): Observable<any> {
    return this.http.get<any>(this.url, {
      params: {
        "offset": offset,
        "limit": limit,
      }
    })
      .pipe(
        tap(res => res),
        tap(res => {
          res.results.map((resPokemons: any) => {
            this.apiGetPokemons(resPokemons.url)
              .subscribe(res => Object.assign(resPokemons, {status: res}))
          })
        }),
      )
  }

  public apiGetPokemons(url: string): Observable<any> {
    return this.http.get<any>(url)
      .pipe(map(res => res))
  }

}
