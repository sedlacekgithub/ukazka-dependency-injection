import { Component, Inject, OnInit } from '@angular/core';
import {
  udelejSnidaniProvider,
  UDELEJ_SNIDANI_TOKEN,
  UdelejSnidaniService,
} from '../udelej-snidani.service';

@Component({
  selector: 'hladovy-clovek',
  template: '<h1>Priklad-1</h1>',
  providers: [
    {
      provide: UDELEJ_SNIDANI_TOKEN,
      useFactory: udelejSnidaniProvider,
      deps: [],
    },
  ],
})
export class HladovyClovekComponent implements OnInit {
  constructor(
    @Inject(UDELEJ_SNIDANI_TOKEN)
    private udelejSnidaniService: UdelejSnidaniService
  ) {}

  // https://angular-university.io/lesson/angular-simplified-provider-configuration
  ngOnInit() {
    const omeleta = this.udelejSnidaniService.vajecnaOmeleta(6);
    this.snez(omeleta);
  }

  snez(omeleta: string) {
    console.log(`${omeleta} . Nom nom nom, moc dobry`);
  }
}
