import { HeaderComponent } from './../components/header/header.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScorecardComponent } from '../components/scorecard/scorecard.component';
import { AppComponent } from '../app.component';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'scorecard', component: ScorecardComponent},
  {path: 'home', component: AppComponent},
  {path: 'welcome', component: HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
