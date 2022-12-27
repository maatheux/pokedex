import { tap, filter } from 'rxjs';
import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  public getAllPokemons: any;

  public apiError = false;

  constructor(private pokeApiService: PokeApiService) { }

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe({
      next: res => {
        this.getAllPokemons = res.results;
      },
      error: () => this.apiError = true,
    });
  }

  public getFilteredPokemonList(event: any){
    this.pokeApiService.apiListAllPokemons.subscribe({
      next: res => {
        this.getAllPokemons = res.results.filter((value: any) => value.name.includes(event));
      },
      error: () => this.apiError = true,
    });
  }

}
