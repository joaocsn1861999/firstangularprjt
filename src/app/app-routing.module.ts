import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaysValueCalculatorComponent } from './component/days-value-calculator/days-value-calculator.component';
import { DateChangingComponent } from './component/date-changing/date-changing.component';
import { AboutComponent } from './component/about/about.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'days-value-calculator',
    pathMatch: 'full'
  },
  {
    path:'days-value-calculator',
    component: DaysValueCalculatorComponent
  },
  {
    path:'date-changing',
    component: DateChangingComponent
  },
  {
    path:'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
