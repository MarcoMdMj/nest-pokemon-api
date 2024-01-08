import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) 
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    const { name, no } = createPokemonDto;

    try {
      return await this.pokemonModel.create({ no, name: name.toLocaleLowerCase() });
    } catch (error) {
      this.handleDuplicateException(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(selector: string): Promise<Pokemon> {
    let pokemon: Pokemon | null = null;

    switch (true) {
      case !isNaN(+selector):
        pokemon = await this.pokemonModel.findOne({ no: selector });
        break;
        
      case isValidObjectId(selector):
        pokemon = await this.pokemonModel.findById(selector);
        break;

      default:
        pokemon = await this.pokemonModel.findOne({ name: selector.toLocaleLowerCase().trim() });
    } 

    if (!pokemon) 
      throw new NotFoundException(`No pokemon matched the search term: ${ selector }`);
    
    return pokemon;
  }

  async update(selector: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(selector);

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true, });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch(error) {
      this.handleDuplicateException(error);
    }

  }

  async remove(selector: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: selector });

    if (deletedCount === 0) 
      throw new NotFoundException(`Pokemon with ID ${ selector } not found.`);
  }

  handleDuplicateException(error: any) {
    if (error.code === 11000) 
      throw new BadRequestException(`Data already exists in database: ${ JSON.stringify(error.keyValue) }`);

    console.log(error);
    throw new InternalServerErrorException(`Couldn't create pokemon due to a server malfunction.`);
  }
}
