// 1) Importa Zone.js **antes** de Angular
import 'zone.js';                    

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter }        from '@angular/router';
import { provideHttpClient }    from '@angular/common/http';

import { App }     from './app/app';
import { routes }  from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),     // para RouterOutlet
    provideHttpClient()        // para HttpClient
  ]
})
.catch(err => console.error(err));
