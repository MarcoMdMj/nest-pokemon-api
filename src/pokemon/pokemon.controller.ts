import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(@Query() params: PaginationDto) {
    return this.pokemonService.findAll(params);
  }

  @Get(':selector')
  findOne(@Param('selector') selector: string) {
    return this.pokemonService.findOne(selector);
  }

  @Patch(':selector')
  update(@Param('selector') selector: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(selector, updatePokemonDto);
  }

  @Delete(':selector')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('selector', ParseMongoIdPipe) selector: string) {
    return this.pokemonService.remove(selector);
  }
}
