import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { kuchynProviderFunction, KUCHYN_TOKEN, Kuchyn } from '../kuchyn';

@Component({
  selector: 'hladovy-clovek',
  template: '<h1>Priklad-1</h1>',
  providers: [
    {
      provide: KUCHYN_TOKEN,
      useFactory: kuchynProviderFunction,
      deps: [],
    },
  ],
})
export class HladovyClovekComponent implements OnInit {
  constructor(
    @Inject(KUCHYN_TOKEN)
    private kuchyn: Kuchyn
  ) {}

  ngOnInit() {
    const omeleta = this.kuchyn.uvarVajecnouOmeletu(6);
    this.snez(omeleta);

    this.vytvorInstanci();
  }

  snez(omeleta: string) {
    console.log(`${omeleta} . Nom nom nom, moc dobry`);
  }

  vytvorInstanci() {
    const injector1 = Injector.create({
      providers: [
        {
          provide: KUCHYN_TOKEN,
          useFactory: kuchynProviderFunction,
        },
      ],
    });
    const udelejSnidaniInstance = injector1.get(KUCHYN_TOKEN);
    console.log('Injector vytvoril instanci ', udelejSnidaniInstance);
  }
}

