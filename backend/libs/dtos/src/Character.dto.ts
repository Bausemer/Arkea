import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class Character_DTO {
  @IsString({message: 'The character name must be a string.'})
  @IsNotEmpty({message: 'A character level must have a name.'})
  name: string;
  
  @IsString({message: 'The character class must be a string.'})
  @IsNotEmpty({message: 'A character must have a class.'})
  characterClass: string;
  
  @IsString()
  player: string;
  
  @Min(1, {message: 'A character level must be between 1 and 20.'})
  @Max(20, {message: 'A character level must be between 1 and 20.'})
  level: number;
}