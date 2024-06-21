/* eslint-disable prettier/prettier */
// src/auth/firebase-auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('Token não fornecido');
      }

      const firebaseUser = await this.firebaseService.getAuth().verifyIdToken(token);

      if (!firebaseUser) {
        throw new UnauthorizedException('Não autorizado');
      }

      request.user = firebaseUser;
      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Não autorizado');
    }
  }
}
