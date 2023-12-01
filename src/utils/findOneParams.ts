import { IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

class FindOneParams {
  @IsString()
  id: string;
}

export default FindOneParams;
