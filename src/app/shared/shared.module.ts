import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QuestionComponent } from './question/question.component';
import { NumberCruncherQuestionComponent } from './number-cruncher-question/number-cruncher-question.component';
import { LevelSelectorComponent } from './level-selector/level-selector.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
    declarations: [QuestionComponent, NumberCruncherQuestionComponent, LevelSelectorComponent, KeyboardComponent, FooterComponent],
    imports: [
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        CommonModule,
        HttpClientModule
    ],
    exports: [
        QuestionComponent,
        NumberCruncherQuestionComponent,
        LevelSelectorComponent,
        KeyboardComponent,
        FooterComponent
    ],
    providers: [
        StatusBar,
        SplashScreen
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule { }
