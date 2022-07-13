import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material.module";
import { EditAboutComponent } from "./edit-about/edit-about.component";
import { EditContactComponent } from "./edit-contact/edit-contact.component";
import { EditEducationComponent } from "./edit-education/edit-education.component";
import { EditExperienceComponent } from "./edit-experience/edit-experience.component";
import { EditExpertiseComponent } from "./edit-expertise/edit-expertise.component";
import { EditProjectsComponent } from "./edit-projects/edit-projects.component";
import { EditRoutingModule } from "./edit-routing.module";
import { EditSkillsComponent } from "./edit-skills/edit-skills.component";

@NgModule({
  declarations:[
    EditAboutComponent,
    EditContactComponent,
    EditEducationComponent,
    EditExperienceComponent,
    EditExpertiseComponent,
    EditProjectsComponent,
    EditSkillsComponent
  ],
  imports:[
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    EditRoutingModule,
    ReactiveFormsModule
  ]
})
export class EditModule{

}
