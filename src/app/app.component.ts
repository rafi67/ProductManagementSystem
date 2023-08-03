import { Component, Injectable, OnInit } from '@angular/core';
import { JwtHelper } from 'src/services/jwt-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class AppComponent implements OnInit {

  constructor(private jwtHelper: JwtHelper) {}

  token: string | null = '';

  title = 'ProductManagementSystemUI';

  ngOnInit(): void {
    this.token = this.jwtHelper.getToken();
  }

}
