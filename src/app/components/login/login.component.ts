import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  });

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.http.get<any>("http://localhost:3000/signupUsers").subscribe((res) => {
      const user = res.find((x: any) => {
        return x.email === this.loginForm.value.email && x.password === this.loginForm.value.password
      });
      if (user) {
        alert("Login Successfully.");
        this.loginForm.reset();
        this.router.navigate(["/dashboard"]);
      } else {
        alert("User Not Found.")
      }
    }, err => {
      alert(err);
    })
  }

}
