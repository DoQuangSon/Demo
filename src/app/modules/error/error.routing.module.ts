import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        children: [
          {
            path: '404',
            component: PageNotFoundComponent
          },
          {
            path: '**',
            component: PageNotFoundComponent
          }
        ]
    }
];

export const ErrorRouting: ModuleWithProviders = RouterModule.forChild(routes);
