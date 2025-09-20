import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'] as string;

    const validApiKey = 'test-api-key-123'; // Chave de teste

    if (!apiKey || apiKey !== validApiKey) {
      throw new UnauthorizedException('API key inválida ou ausente');
    }

    return true;
  }
}