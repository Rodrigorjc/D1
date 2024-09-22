import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import path from 'path';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [
    {
        path: 'inicio', component:  InicioComponent
    }
];
