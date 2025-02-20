// src/app/translate.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@Injectable({ providedIn: 'root' })
export class TranslateConfigService {
  constructor(private translate: TranslateService, private http: HttpClient) {
    translate.addLangs(['en', 'te']); // Add supported languages (te for Telugu)
    translate.setDefaultLang('en');
  }

  useLanguage(language: string) {
   return this.translate.use(language);
  }
}