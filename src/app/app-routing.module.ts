import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component'; // todo: remove home page
import { StructurePageComponent } from './structure-page/structure-page.component';
import { SubjectPageComponent } from './subject-page/subject-page.component';
import { GenerationPageComponent } from './generation-page/generation-page.component';
import { HelpPageComponent } from './help-page/help-page.component';

const routes: Routes = [
  { path: 'home', component: GenerationPageComponent },
  { path: 'structure', component: StructurePageComponent },
  { path: 'subject', component: SubjectPageComponent },
  { path: 'generate', component: GenerationPageComponent },
  { path: 'help', component: HelpPageComponent },
  { path: '**', component: GenerationPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
