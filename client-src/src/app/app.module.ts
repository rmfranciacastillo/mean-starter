import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { PostComponent } from './post/post.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    HomepageComponent,
    FooterComponent,
    AboutComponent,
    PostComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
