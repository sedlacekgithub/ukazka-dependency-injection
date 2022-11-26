import { InjectionToken } from '@angular/core';

export function udelejSnidaniProvider(): UdelejSnidaniService {
  return new UdelejSnidaniService();
}

export const UDELEJ_SNIDANI_TOKEN = new InjectionToken<UdelejSnidaniService>(
  'UDELEJ_SNIDANI_TOKEN'
);

export class UdelejSnidaniService {
  vajecnaOmeleta(pocetVajec: number) {
    return `Omeleta z ${pocetVajec} vajec`;
  }
}
