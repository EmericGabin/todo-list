import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../shared/models/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  private formBuilder: FormBuilder;
  private authSvc: AuthService;
  private router: Router;
  private messagerieSvc: MessageService;

  constructor() {
    this.formBuilder = inject(FormBuilder);
    this.authSvc = inject(AuthService);
    this.router = inject(Router);
    this.messagerieSvc = inject(MessageService)
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      console.log('Form submitted successfully!', this.loginForm.value);
      const { email, password } = this.loginForm.value;
      this.authSvc.login(email, password)?.subscribe(
        response => {
          console.log(response);
          if(response !== null){
            this.authSvc.logIn();
            sessionStorage.setItem('user', JSON.stringify(response));
            this.router.navigate(['home']);
          } else {
            this.messagerieSvc.add({ severity: 'error', summary: 'Error', detail: 'email or password is wrong' });
          }
        },
        error => {
          console.log(error);
          this.messagerieSvc.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        }
      )
    } else {
      console.log('Form has errors. Please check again.');
    }
  }
}
