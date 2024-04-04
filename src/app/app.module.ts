import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DaysValueCalculatorComponent } from './component/days-value-calculator/days-value-calculator.component';
import { DateChangingComponent } from './component/date-changing/date-changing.component';
import { FooterComponent } from './component/footer/footer.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { AboutComponent } from './component/about/about.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MainContainerComponent } from './component/main-container/main-container.component';
import { ButtonBackToMenuComponent } from './component/button-back-to-menu/button-back-to-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    DaysValueCalculatorComponent,
    DateChangingComponent,
    FooterComponent,
    NavigationComponent,
    AboutComponent,
    MainContainerComponent,
    ButtonBackToMenuComponent
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
