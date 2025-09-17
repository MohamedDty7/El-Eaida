import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, UserResponseDto } from '../../../../../core/services/user.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  user: UserResponseDto | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUserDetails(userId);
    } else {
      this.errorMessage = 'معرف المستخدم غير صحيح';
    }
  }

  loadUserDetails(userId: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        console.log('Loaded user details:', user);
        this.user = user;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user details:', error);
        this.errorMessage = 'حدث خطأ في تحميل تفاصيل المستخدم';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/settings/users']);
  }

  editUser(): void {
    if (this.user) {
      this.router.navigate(['/admin/settings/users/edit', this.user.id]);
    }
  }

  toggleUserStatus(): void {
    if (this.user) {
      this.userService.toggleUserStatus(this.user.id).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
        },
        error: (error) => {
          console.error('Error toggling user status:', error);
          this.errorMessage = 'حدث خطأ في تغيير حالة المستخدم';
        }
      });
    }
  }

  deleteUser(): void {
    if (this.user && confirm(`هل أنت متأكد من حذف المستخدم ${this.user.userName}؟`)) {
      this.userService.deleteUser(this.user.id).subscribe({
        next: () => {
          this.router.navigate(['/admin/settings/users']);
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.errorMessage = 'حدث خطأ في حذف المستخدم';
        }
      });
    }
  }

  getRoleText(roles: string[]): string {
    if (!roles || roles.length === 0) return 'غير محدد';
    
    const roleLabels: { [key: string]: string } = {
      'admin': 'مدير',
      'doctor': 'طبيب',
      'receptionist': 'موظف استقبال',
      'patient': 'مريض'
    };
    
    return roles.map(role => roleLabels[role] || role).join(', ');
  }

  getStatusText(isActive: boolean | undefined): string {
    return (isActive ?? true) ? 'نشط' : 'غير نشط';
  }

  getStatusClass(isActive: boolean | undefined): string {
    return (isActive ?? true) ? 'status-active' : 'status-inactive';
  }

  getRoleClass(roles: string[]): string {
    if (roles.includes('admin')) return 'role-admin';
    if (roles.includes('doctor')) return 'role-doctor';
    if (roles.includes('receptionist')) return 'role-receptionist';
    if (roles.includes('patient')) return 'role-patient';
    return 'role-default';
  }

  getRoleIcon(roles: string[]): string {
    if (roles.includes('admin')) return 'fa-crown';
    if (roles.includes('doctor')) return 'fa-user-md';
    if (roles.includes('receptionist')) return 'fa-user-tie';
    if (roles.includes('patient')) return 'fa-user';
    return 'fa-user';
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return 'غير محدد';
    const d = new Date(date);
    return d.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

