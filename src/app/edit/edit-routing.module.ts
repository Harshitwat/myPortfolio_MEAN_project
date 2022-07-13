import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { EditAboutComponent } from "./edit-about/edit-about.component";
import { EditContactComponent } from "./edit-contact/edit-contact.component";
import { EditEducationComponent } from "./edit-education/edit-education.component";
import { EditExperienceComponent } from "./edit-experience/edit-experience.component";
import { EditExpertiseComponent } from "./edit-expertise/edit-expertise.component";
import { EditProjectsComponent } from "./edit-projects/edit-projects.component";
import { EditSkillsComponent } from "./edit-skills/edit-skills.component";

const routes:Routes=[
      {path:'about/:id',component:EditAboutComponent},
      {path:'expertise/:id',component:EditExpertiseComponent},
      {path:'skills/:id',component:EditSkillsComponent},
      {path:'education/:id',component:EditEducationComponent},
      {path:'experience/:id',component:EditExperienceComponent},
      {path:'projects/:id',component:EditProjectsComponent},
      {path:'contact/:id',component:EditContactComponent},

]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule],
  providers:[AuthGuard]
})
export class EditRoutingModule{

}
