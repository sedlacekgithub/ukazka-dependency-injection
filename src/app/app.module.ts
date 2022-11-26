import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HladovyClovekComponent } from '../ukazka-1/HladovyClovekComponent/hladovy-clovek.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HladovyClovekComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
