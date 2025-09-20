import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import Strategy from 'passport-headerapikey';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor() {
    super({ header: 'X-API-KEY', prefix: '' }, true);
  }

  async validate(apiKey: string): Promise<any> {
    const isValid = process.env.API_KEY === apiKey;
    if (isValid) {
      return { apiKey };
    }
    throw new UnauthorizedException();
  }
}