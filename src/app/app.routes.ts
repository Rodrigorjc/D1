import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { InicioComponent } from './inicio/inicio.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import exp from 'constants';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { VistaRutaComponent } from './vista-ruta/vista-ruta.component';

export const routes: Routes = [
    {
        path: 'inicio', component:  InicioComponent
    },
    {
        path: 'sobre-nosotros', component:  SobreNosotrosComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'registro', component: RegistroComponent
    },
    {
        path: '', component: InicioComponent
    },
    {
        path: 'ruta/:id', component: VistaRutaComponent
    }
];

export const routing = RouterModule.forRoot(routes);