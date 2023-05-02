import { tap, filter } from 'rxjs';
import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  private offset: number = 0;
  private limit: number = 50;

  public getAllPokemons: any[] = [];

  public apiError = false;

  private filteredTimeout: any;

  private scrollable = true;

  constructor(private pokeApiService: PokeApiService) { }

  ngOnInit(): void {
    this.GetPokemons();
  }

  public GetPokemons() {
    this.pokeApiService.apiListAllPokemons(this.offset, this.limit).subscribe({
      next: res => {
        this.getAllPokemons.push(...res.results);
      },
      error: () => this.apiError = true,
      complete: () => this.offset += 25
    });
  }

  public getFilteredPokemonList(event: any){
    this.offset = 0;
    this.limit = 50;
    this.getAllPokemons = [];

    if (event === '') {
      this.scrollable = true;
      return this.GetPokemons();
    };

    this.scrollable = false

    clearTimeout(this.filteredTimeout);
    this.filteredTimeout = setTimeout(() => {
      this.GetFilteredPokemonListCall(event);
    }, 1000);
  }

  private GetFilteredPokemonListCall(event: any) {
    this.pokeApiService.apiListAllPokemons(this.offset, this.limit).subscribe({
      next: res => {
        this.getAllPokemons.push(...res.results.filter((value: any) => value.name.includes(event)));
        this.getAllPokemons = [...new Set(this.getAllPokemons)];

        this.offset += 100;
        this.limit = 100;
      },
      error: () => this.apiError = true,
      complete: () => {
        if (this.offset <= 1300) {
          setTimeout(() => {
            this.GetFilteredPokemonListCall(event);
          }, 200);
        };
      }
    });
  }

  public onScroll() {
    if (this.scrollable) {
      this.offset += 25;
      this.limit = 25;

      this.GetPokemons();
    }
  }

}
