import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { routes } from "../app.routes";
import { environment } from "src/environments/environment";
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

const appConfig: ApplicationConfig = {
    providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations()
]
}

export { appConfig }