import { CanActivate, ExecutionContext, Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(JwtService)
  private readonly jwtService: JwtService

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const authorization = this.extractTokenFromHeaders(request)
    if (!authorization) throw new UnauthorizedException('Token is required')

    try {
      const payload = this.jwtService.verify(authorization, {
        secret: process.env.SECET_JWT
      })
      request['sub'] = payload
    } catch (err) {
      throw new UnauthorizedException('Invalid Token')
    }

    return true
  }

  private extractTokenFromHeaders(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  };
}
