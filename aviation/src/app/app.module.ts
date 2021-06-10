import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomeComponent } from './pages/home/home.component';
import { EchartComponent } from './components/echart/echart.component';
import { EchartsComponent } from './pages/echarts/echarts.component';
import { QuestionComponent } from './components/question/question.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuizComponent } from './pages/quiz/quiz.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    EchartComponent,
    EchartsComponent,
    QuestionComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
