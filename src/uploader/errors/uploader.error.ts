import { DomainError } from './../../common/domain.error';

export class UploaderError extends DomainError {
  constructor(name: string, message: string) {
    super(name, message);
  }

  public static UnsupportedMediaType(): UploaderError {
    return new UploaderError('UnsupportedMediaType', 'Unsupported Media Type');
  }
}
