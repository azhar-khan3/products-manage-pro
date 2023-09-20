import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from '../common-service.service';
import { Router } from '@angular/router';
import { User } from './user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 
  obj:User = new User();
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: CommonServiceService,
    private router: Router,
  ) { }

  ngOnInit():void{
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  

  register() {
    this.obj.name = this.form.value.name;
    this.obj.email = this.form.value.email;
    this.obj.password = this.form.value.password;
    this.service.register(this.obj).subscribe(
      (res: any) => {
        this.form.reset();
        alert("data saved");
        const url = "/login";
        this.router.navigate([url]);
      });
  }
}

