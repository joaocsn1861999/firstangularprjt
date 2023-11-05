import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DaysValueCalculatorComponent } from './component/days-value-calculator/days-value-calculator.component';
import { DateChangingComponent } from './component/date-changing/date-changing.component';
import { MfooterComponent } from './component/mfooter/mfooter.component';
import { MheaderComponent } from './component/mheader/mheader.component';
import { AboutComponent } from './component/about/about.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    DaysValueCalculatorComponent,
    DateChangingComponent,
    MfooterComponent,
    MheaderComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
