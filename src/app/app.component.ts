import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myPortfolio';
  main:boolean;
  constructor(private authService:AuthService){
    this.main=true;
  }
ngOnInit(): void {

    this.authService.autoAuthUser();
}
}
// export class AppComponent {
//   title = 'myPortfolio';
//   main:boolean;
//   constructor(){
//     this.main=true;
//   }
// }
