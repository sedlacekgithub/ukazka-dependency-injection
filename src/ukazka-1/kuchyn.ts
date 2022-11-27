import { InjectionToken } from '@angular/core';

export function kuchynProviderFunction(): Kuchyn {
  return new Kuchyn();
}

export const KUCHYN_TOKEN = new InjectionToken<Kuchyn>('KUCHYN_TOKEN');

export class Kuchyn {
  uvarVajecnouOmeletu(pocetVajec: number) {
    return `Omeleta z ${pocetVajec} vajec`;
  }
}
