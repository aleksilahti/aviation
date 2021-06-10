import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Page components
import { HomeComponent } from './pages/home/home.component'
import { EchartsComponent } from './pages/echarts/echarts.component'
import { QuizComponent } from './pages/quiz/quiz.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'echarts', component: EchartsComponent },
  { path: 'quiz', component: QuizComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
