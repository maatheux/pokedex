import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100'

  constructor(private http: HttpClient) { }

  get apiListAllPokemons(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      map(res => res.results.filter((value: {name: string, url: string}) => value.name.startsWith('b'))),
      tap(console.log),
    )
  }

}
