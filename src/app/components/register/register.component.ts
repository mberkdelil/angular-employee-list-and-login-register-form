import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(3)]),
    phone: new FormControl(0, [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  })

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value).subscribe((res) => {
      alert("Sign Up Successfully.");
      this.signupForm.reset();
      this.router.navigate(["/login"])
    }, err => {
      alert(err)
    })
  }

}
