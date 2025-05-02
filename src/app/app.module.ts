import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// angular material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { StructurePageComponent } from './structure-page/structure-page.component';
import { SubjectPageComponent } from './subject-page/subject-page.component';
import { SideMenuComponent } from './shared/components/side-menu/side-menu.component';
import { GenerationPageComponent } from './generation-page/generation-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { ElectronService } from './shared/service/electron.service';
import { AlertComponent } from './shared/components/alert/alert.component';
import { FilesHandlerComponent } from './shared/components/files-handler/files-handler.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    StructurePageComponent,
    SubjectPageComponent,
    SideMenuComponent,
    GenerationPageComponent,
    HelpPageComponent,
    AlertComponent,
    FilesHandlerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    DragDropModule,
    MatCheckboxModule,
    HttpClientModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
