/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp } from 'firebase-admin/app';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

@Injectable()
export class FirebaseAuthGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {

        try {
            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization.split(' ')[1];
            // console.log(token);
            const firebaseUser = await getAuth(firebaseapp)
                .verifyIdToken(token)
                .then((decodedToken) => {
                    request.user = decodedToken;
                    return decodedToken;
                    // ...
                })
                .catch((error) => {
                    // Handle error
                    // throw new error(error);
                    console.error(error)
                })
            if (!firebaseUser) {
                throw new UnauthorizedException('nao autorizado');
            }



            request.user = firebaseUser;
            
            return true;


        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
