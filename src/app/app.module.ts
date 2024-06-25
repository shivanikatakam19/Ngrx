import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CounterComponent } from './counter/counter/counter.component';
import { CounterButtonsComponent } from './counter/counter-buttons/counter-buttons.component';
import { CounterOutputComponent } from './counter/counter-output/counter-output.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ResizableDirective } from './resizable.directive';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { AppReducer } from './app.state';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { MatIconModule } from '@angular/material/icon';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoaderComponent } from './components/loader/loader.component';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { ReportComponent } from './power-bi/report/report.component';

@NgModule({
    declarations: [
        AppComponent,
        CounterComponent,
        CounterButtonsComponent,
        CounterOutputComponent,
        HomeComponent,
        HeaderComponent,
        PostsListComponent,
        ResizableDirective,
        AddPostComponent,
        EditPostComponent,
        LoaderComponent,
        ReportComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        StoreModule.forRoot(AppReducer),
        AppRoutingModule,
        MatIconModule,
        EffectsModule.forRoot([]),
        HttpClientModule,
        StoreDevtoolsModule.instrument({
            maxAge: 10,
            logOnly: true
        }),
        PowerBIEmbedModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
