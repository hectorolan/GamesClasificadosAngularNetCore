import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, LoadChildrenCallback, Route } from '@angular/router';
import { BaseModule } from './app.base.module';
// Components
import { AppComponent } from '../components/app/app.component';
// Services
import { TogglenavService } from '../services/togglenav.service';
import { UserService } from '../services/user.service';
import { AdService } from '../services/ad.service';
import { ConsoleService } from '../services/console.service';
import { SectionService } from '../services/section.service';
import { AuthService } from '../services/auth.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { ImageService } from '../services/image.service';
// App Modules
import { MainModule } from '../components/main/main.module';
import { AdminModule } from '../components/admin/admin.module';
import { LoginModule } from '../components/login/login.module';
import { TermOfServiceComponent } from '../components/termsofservice/term-of-service.component';
import { PolicyComponent } from '../components/policy/policy.component';
import { ContactUsComponent } from '../components/contactus/contactus.component';

var routes: Route[] = [
    {
        path: 'games',
        loadChildren: '../components/main/main.module#MainModule'
    },
    { path: '', redirectTo: 'games', pathMatch: 'full' },
    { 
        path: 'admin',
        loadChildren: '../components/admin/admin.module#AdminModule',
        canLoad: [AuthGuardService]
    },
    { path: '**', redirectTo: 'games' }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BaseModule,
        HttpClientModule,
        MainModule,
        AdminModule,
        LoginModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        TogglenavService,
        UserService,
        AdService,
        ConsoleService,
        SectionService,
        AuthService,
        ImageService
    ]
})
export class AppModuleShared {
}
