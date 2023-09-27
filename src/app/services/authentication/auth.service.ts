import { Injectable } from '@angular/core';
import { Auth, UserCredential, getAuth, signInWithPopup } from '@angular/fire/auth';
import { AuthProvider, GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  authManual = getAuth();

  constructor(private auth: Auth) { }

  signInWithGoogleProvider(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    
    return this.callPopUp(provider);
  }

  async callPopUp(provider: AuthProvider): Promise<UserCredential> {
    try {
      console.log(this.auth,provider);
      const result = await signInWithPopup(this.auth, provider);
      
      return result;
    } catch (error: any) {
      return error;
    }
  }
}
