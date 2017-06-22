import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './routes/home-guard';
import { UnauthenticatedGuard } from './routes/unauthenticated-guard';


const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent , canActivate: [UnauthenticatedGuard]},
    { path: 'register', component: RegisterComponent, canActivate: [UnauthenticatedGuard] },
    
    { path: '', redirectTo:'login',pathMatch:'prefix' }


]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

