import { Injectable } from '@nestjs/common';
import { PokeapiResponse } from './interfaces/pokeapi-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter
  ) {}

  async exec() {
    await this.pokemonService.deleteAll();

    const data = await this.http.get<PokeapiResponse>(`https://pokeapi.co/api/v2/pokemon?limit=750`);

    const results: { name: string; no: number; }[] = [];

    data.results.forEach(({ name, url}) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      results.push({ name, no });
    });
    
    this.pokemonService.createBatch(results);

    return 'Seed executed successfully';
  }
}
