import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './login/login.component';
import { UserPanelComponent } from './user-panel/user-panel.component';

export const routes: Routes = [
    {path:'app',component: AppComponent},
    {path:'adminpanel' ,component:AdminPanelComponent},
    {path:'userpanel' ,component:UserPanelComponent},
    {path:'login',component:LoginComponent},
    {path:'**',redirectTo:'login'}
];
