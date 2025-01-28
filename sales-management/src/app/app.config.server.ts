import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch()),
    provideRouter(routes),
    importProvidersFrom(BrowserModule)
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
