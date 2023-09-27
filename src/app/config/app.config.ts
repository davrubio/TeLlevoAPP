import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideAnimations } from '@angular/platform-browser/animations';
import { firebaseProviders } from '../../app/config/firebase.config';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { routes } from "../app.routes";

const appConfig: ApplicationConfig = {
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        importProvidersFrom(IonicModule.forRoot({})),
        provideRouter(routes),
        firebaseProviders,
        provideAnimations(),
    ]
}

export { appConfig }