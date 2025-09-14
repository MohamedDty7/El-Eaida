import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserRole } from '../../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'يرجى إدخال اسم المستخدم وكلمة المرور';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          const user = this.authService.getCurrentUser();
          if (user) {
            // Redirect based on user role
            switch (user.role) {
              case UserRole.ADMIN:
                this.router.navigate(['/admin/dashboard']);
                break;
              case UserRole.DOCTOR:
                this.router.navigate(['/doctor/dashboard']);
                break;
              case UserRole.RECEPTIONIST:
                this.router.navigate(['/receptionist/dashboard']);
                break;
              case UserRole.PATIENT:
                this.router.navigate(['/patient/dashboard']);
                break;
              default:
                this.router.navigate(['/dashboard']);
            }
          }
        } else {
          this.errorMessage = 'اسم المستخدم أو كلمة المرور غير صحيحة';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'حدث خطأ أثناء تسجيل الدخول';
        console.error('Login error:', error);
      }
    });
  }

  onDemoLogin(role: string): void {
    this.username = role;
    this.password = 'demo123';
    this.onLogin();
  }
}
