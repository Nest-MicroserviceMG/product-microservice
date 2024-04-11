import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public name: string;

  @IsNumber({
    maxDecimalPlaces: 4, //la cantidad de decimales permitidos
  })
  @Min(0) //el valor mínimo permitido, 0 para arriba
  @Type(() => Number) //para que el valor se transforme a number
  public price: number;
}
