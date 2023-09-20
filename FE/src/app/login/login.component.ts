import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from '../common-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup
  error = false;
  constructor(
    private fb: FormBuilder,
    private service: CommonServiceService,
    private router: Router
  ) {
  }

  

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.service.login(value.email, value.password).subscribe(
        data => {
          this.router.navigate(['/products']);
        },
        error => {
          this.error = true;
          alert("Error")
        }
      );
    }
  }
}


