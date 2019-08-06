import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { PostComponent } from './post/post.component';
import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'post', component: PostComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
