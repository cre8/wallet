import { Routes } from '@angular/router';
import { authGuard } from '../../../shared/auth/auth.guard';
import { CredentialsListComponent } from '../../../shared/credentials/credentials-list/credentials-list.component';
import { CredentialsShowComponent } from '../../../shared/credentials/credentials-show/credentials-show.component';
import { KeysListComponent } from '../../../shared/keys-list/keys-list.component';
import { SettingsComponent } from '../../../shared/settings/settings.component';
import { ScannerComponent } from './scanner/scanner.component';
import { LoginComponent } from '../../../shared/login/login.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/credentials',
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'scan',
        component: ScannerComponent,
      },
      {
        path: 'keys',
        component: KeysListComponent,
      },
      {
        path: 'credentials',
        component: CredentialsListComponent,
      },
      {
        path: 'credentials/:id',
        component: CredentialsShowComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
