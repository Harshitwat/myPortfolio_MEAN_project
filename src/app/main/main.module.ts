import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { AngularMaterialModule } from "../angular-material.module";
import { ContactComponent } from "./contact/contact.component";
import { EducationComponent } from "./education/education.component";
import { ExperienceComponent } from "./experience/experience.component";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ExpertiseComponent } from "./expertise/expertise.component";
import { SkillsComponent } from "./skills/skills.component";
import { WorkComponent } from "./work/work.component";
import { MainComponent } from "./main.component";

@NgModule({
  declarations:[
    MainComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ExpertiseComponent,
    SkillsComponent,
    EducationComponent,
    ExperienceComponent,
    WorkComponent,
    ContactComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ],
  bootstrap:[MainComponent],
  exports:[]
})
export class MainModule{

}
