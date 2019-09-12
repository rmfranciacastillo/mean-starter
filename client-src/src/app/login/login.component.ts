import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {

  configSubscription: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.configSubscription = this.authService.getConfig()
      .subscribe((data) => {
        console.log(data);
      });
  }

  ngOnDestroy() {
    this.configSubscription.unsubscribe();
    console.log('Subscription Unsubscribed!');
  }

}
