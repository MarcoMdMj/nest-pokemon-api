import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { isAbsolute } from 'node:path/win32';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!isValidObjectId(value))
      throw new BadRequestException(`${ value } is not a valid MongoID`);

    return value;
  }
}
