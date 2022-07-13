import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { MainComponent } from './main/main.component';
import { MyPortfoliosComponent } from './my-portfolios/my-portfolios.component';
import { AuthGuard } from './auth/auth.guard';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path:'create',component:CreateComponent, canActivate:[AuthGuard]},
  {path:'allPortfolios',component:MyPortfoliosComponent},
  {path:'myPortfolios',component:MyPortfoliosComponent, canActivate:[AuthGuard]},
  {path:'auth',loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)},
  {path:'edit/:id',component:EditComponent,loadChildren:()=>import('./edit/edit.module').then(m=>m.EditModule),canActivate:[AuthGuard]},
  {path:':id',component:MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
