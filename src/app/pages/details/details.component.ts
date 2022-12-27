import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon = 'https://pokeapi.co/api/v2/pokemon';
  private urlName = 'https://pokeapi.co/api/v2/pokemon-species';

  constructor(private activatedRoute: ActivatedRoute, private pokeService: PokeApiService) { }

  ngOnInit(): void {
    this.getPokemon;
  }

  get getPokemon() {
    const id = this.activatedRoute.snapshot.params['id'];

    const pokemon = this.pokeService.apiGetPokemons(`${this.urlPokemon}/${id}`);
    const name = this.pokeService.apiGetPokemons(`${this.urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe({
      next: res => {
        console.log(res);
      }
    }) // forkjoin permite que usemos menos subscribe
  }

}
