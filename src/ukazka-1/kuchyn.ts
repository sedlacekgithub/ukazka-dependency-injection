import { InjectionToken } from '@angular/core';

export function kuchynProviderFunction(): Kuchyn {
  return new Kuchyn();
}

export const KUCHYN_TOKEN = new InjectionToken<Kuchyn>('KUCHYN_TOKEN');

// Je fajn si vsimnout ze chybi dekorator Injectable
export class Kuchyn {
  uvarVajecnouOmeletu(pocetVajec: number) {
    return `Omeleta z ${pocetVajec} vajec`;
  }
}
