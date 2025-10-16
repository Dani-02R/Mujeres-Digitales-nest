import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseUpperTrimPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string') {
      return value.trim().toUpperCase();
    }
    if (typeof value === 'object' && value !== null) {
        throw new Error('El valor debe ser un string');
    }
    return value;
  }
}
