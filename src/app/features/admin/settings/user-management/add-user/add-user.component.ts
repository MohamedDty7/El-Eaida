import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, UserDto, RegisterRequestDto, UserResponseDto } from '../../../../../core/services/user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  @Output() userAdded = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  userDto: UserDto = {
    id: '',
    userName: '',
    email: '',
    address: '',
    phone: '',
    role: []
  };

  // كلمة مرور منفصلة للإنشاء
  password: string = '';

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  // متغيرات لعرض المستخدمين
  allUsers: UserResponseDto[] = [];
  isLoadingUsers = false;
  usersErrorMessage = '';
  showUsersList = false;
  searchQuery = '';
  currentView = 'cards'; // 'cards' or 'table'

  availableRoles = [
    { value: 'admin', label: 'مدير' },
    { value: 'doctor', label: 'طبيب' },
    { value: 'receptionist', label: 'موظف استقبال' },
    { value: 'patient', label: 'مريض' }
  ];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // تحميل المستخدمين عند بدء المكون
    this.loadAllUsers();
  }

  onRoleChange(role: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    
    if (checked) {
      if (!this.userDto.role.includes(role)) {
        this.userDto.role.push(role);
      }
    } else {
      this.userDto.role = this.userDto.role.filter(r => r !== role);
    }
  }

  isRoleSelected(role: string): boolean {
    return this.userDto.role.includes(role);
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // تحضير البيانات للتأكد من التنسيق الصحيح
    const userData: RegisterRequestDto = {
      Username: this.userDto.userName.trim(),
      Email: this.userDto.email.trim(),
      Password: this.password,
      Address: this.userDto.address?.trim() || undefined,
      Phone: this.userDto.phone.trim(),
      Role: this.userDto.role
    };

    console.log('Submitting user data:', userData);
    console.log('Role array:', userData.Role);
    console.log('Role type:', typeof userData.Role);
    console.log('Role length:', userData.Role.length);

    this.userService.createUser(userData).subscribe({
      next: (response) => {
        console.log('User created successfully:', response);
        this.successMessage = 'تم إنشاء المستخدم بنجاح!';
        this.isLoading = false;
        
        // تحديث قائمة المستخدمين
        this.refreshUsersList();
        
        // إظهار رسالة النجاح لمدة 2 ثانية ثم إغلاق النافذة
        setTimeout(() => {
          this.userAdded.emit();
        }, 2000);
      },
      error: (error) => {
        console.error('Error creating user:', error);
        console.error('Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error
        });
        
        // تسجيل مفصل لخطأ 400
        if (error.status === 400) {
          console.error('400 Error - Full error object:', error);
          console.error('400 Error - error.error:', error.error);
          if (error.error) {
            console.error('400 Error - error.error keys:', Object.keys(error.error));
            if (error.error.errors) {
              console.error('400 Error - ModelState errors:', error.error.errors);
              
              // تسجيل مفصل لكل حقل
              for (const field in error.error.errors) {
                console.error(`400 Error - ${field}:`, error.error.errors[field]);
              }
            }
            if (error.error.title) {
              console.error('400 Error - Title:', error.error.title);
            }
            if (error.error.detail) {
              console.error('400 Error - Detail:', error.error.detail);
            }
          }
        }
        
        if (error.status === 0) {
          this.errorMessage = 'لا يمكن الوصول إلى الخادم. تأكد من أن الباك إند يعمل على https://localhost:7246';
        } else if (error.status === 400) {
          // معالجة خطأ 400 Bad Request
          if (error.error && error.error.errors) {
            // ModelState errors من ASP.NET Core
            const errors = error.error.errors;
            const errorMessages = [];
            for (const field in errors) {
              if (errors[field] && errors[field].length > 0) {
                errorMessages.push(`${field}: ${errors[field].join(', ')}`);
              }
            }
            this.errorMessage = `خطأ في البيانات: ${errorMessages.join(' | ')}`;
          } else if (error.error && error.error.message) {
            this.errorMessage = `خطأ في البيانات: ${error.error.message}`;
          } else {
            this.errorMessage = 'خطأ في البيانات المرسلة. تحقق من صحة جميع الحقول';
          }
        } else if (error.status === 404) {
          this.errorMessage = 'API غير موجود. تأكد من أن endpoint /api/Auth/register متاح';
        } else if (error.status === 500) {
          this.errorMessage = 'خطأ في الخادم. تحقق من سجلات الباك إند';
        } else if (error.error && error.error.message) {
          this.errorMessage = `خطأ: ${error.error.message}`;
        } else {
          this.errorMessage = `حدث خطأ في إنشاء المستخدم (${error.status}). يرجى المحاولة مرة أخرى.`;
        }
        
        this.isLoading = false;
      }
    });
  }

  private validateForm(): boolean {
    if (!this.userDto.userName.trim()) {
      this.errorMessage = 'اسم المستخدم مطلوب';
      return false;
    }

    if (this.userDto.userName.length > 50) {
      this.errorMessage = 'اسم المستخدم يجب أن يكون أقل من 50 حرف';
      return false;
    }

    if (!this.userDto.email.trim()) {
      this.errorMessage = 'البريد الإلكتروني مطلوب';
      return false;
    }

    if (!this.isValidEmail(this.userDto.email)) {
      this.errorMessage = 'البريد الإلكتروني غير صحيح';
      return false;
    }

    if (this.userDto.email.length > 100) {
      this.errorMessage = 'البريد الإلكتروني يجب أن يكون أقل من 100 حرف';
      return false;
    }

    if (!this.password.trim()) {
      this.errorMessage = 'كلمة المرور مطلوبة';
      return false;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
      return false;
    }

    if (this.password.length > 100) {
      this.errorMessage = 'كلمة المرور يجب أن تكون أقل من 100 حرف';
      return false;
    }

    if (!this.userDto.phone.trim()) {
      this.errorMessage = 'رقم الهاتف مطلوب';
      return false;
    }

    if (this.userDto.phone.length > 20) {
      this.errorMessage = 'رقم الهاتف يجب أن يكون أقل من 20 رقم';
      return false;
    }

    if (this.userDto.address && this.userDto.address.length > 200) {
      this.errorMessage = 'العنوان يجب أن يكون أقل من 200 حرف';
      return false;
    }

    if (this.userDto.role.length === 0) {
      this.errorMessage = 'يجب اختيار دور واحد على الأقل';
      return false;
    }

    // التحقق من صحة الأدوار
    const validRoles = ['admin', 'doctor', 'receptionist', 'patient'];
    for (const role of this.userDto.role) {
      if (!validRoles.includes(role)) {
        this.errorMessage = `دور غير صحيح: ${role}`;
        return false;
      }
    }

    return true;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  resetForm(): void {
    this.userDto = {
      id: '',
      userName: '',
      email: '',
      address: '',
      phone: '',
      role: []
    };
    this.password = '';
    this.errorMessage = '';
    this.successMessage = '';
  }


  // تحميل جميع المستخدمين
  loadAllUsers(): void {
    this.isLoadingUsers = true;
    this.usersErrorMessage = '';
    
    // محاولة تحميل المستخدمين من API
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        console.log('تم تحميل المستخدمين:', users);
        this.allUsers = users;
        this.isLoadingUsers = false;
      },
      error: (error) => {
        console.error('خطأ في تحميل المستخدمين:', error);
        // في حالة فشل API، استخدم بيانات وهمية
        this.allUsers = this.getMockUsers();
        this.isLoadingUsers = false;
        this.usersErrorMessage = 'تم استخدام بيانات وهمية للاختبار';
      }
    });
  }

  // بيانات وهمية للاختبار
  private getMockUsers(): UserResponseDto[] {
    return [
      {
        id: '1',
        userName: 'أحمد محمد',
        email: 'ahmed@clinic.com',
        phone: '01234567890',
        address: 'القاهرة، مصر',
        role: ['admin'],
        isActive: true,
        createdAt: new Date('2024-01-01'),
        lastLogin: new Date('2024-01-15')
      },
      {
        id: '2',
        userName: 'د. سارة أحمد',
        email: 'sara@clinic.com',
        phone: '01234567891',
        address: 'الإسكندرية، مصر',
        role: ['doctor'],
        isActive: true,
        createdAt: new Date('2024-01-02'),
        lastLogin: new Date('2024-01-14')
      },
      {
        id: '3',
        userName: 'فاطمة علي',
        email: 'fatma@clinic.com',
        phone: '01234567892',
        address: 'الجيزة، مصر',
        role: ['receptionist'],
        isActive: true,
        createdAt: new Date('2024-01-03'),
        lastLogin: new Date('2024-01-13')
      },
      {
        id: '4',
        userName: 'عمر حسن',
        email: 'omar@clinic.com',
        phone: '01234567893',
        address: 'المنصورة، مصر',
        role: ['patient'],
        isActive: false,
        createdAt: new Date('2024-01-04'),
        lastLogin: new Date('2024-01-12')
      },
      {
        id: '5',
        userName: 'د. محمود السيد',
        email: 'mahmoud@clinic.com',
        phone: '01234567894',
        address: 'أسيوط، مصر',
        role: ['doctor'],
        isActive: true,
        createdAt: new Date('2024-01-05'),
        lastLogin: new Date('2024-01-11')
      }
    ];
  }

  // تبديل عرض قائمة المستخدمين
  toggleUsersList(): void {
    this.showUsersList = !this.showUsersList;
    if (this.showUsersList && this.allUsers.length === 0) {
      this.loadAllUsers();
    }
  }

  // الحصول على نص الدور
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

  // الحصول على نص الحالة
  getStatusText(isActive: boolean | undefined): string {
    return (isActive ?? true) ? 'نشط' : 'غير نشط';
  }

  // الحصول على كلاس الحالة
  getStatusClass(isActive: boolean | undefined): string {
    return (isActive ?? true) ? 'status-active' : 'status-inactive';
  }

  // الحصول على كلاس الدور
  getRoleClass(roles: string[]): string {
    if (roles.includes('admin')) return 'role-admin';
    if (roles.includes('doctor')) return 'role-doctor';
    if (roles.includes('receptionist')) return 'role-receptionist';
    if (roles.includes('patient')) return 'role-patient';
    return 'role-default';
  }

  // الحصول على أيقونة الدور
  getRoleIcon(roles: string[]): string {
    if (roles.includes('admin')) return 'fa-crown';
    if (roles.includes('doctor')) return 'fa-user-md';
    if (roles.includes('receptionist')) return 'fa-user-tie';
    if (roles.includes('patient')) return 'fa-user';
    return 'fa-user';
  }

  // تنسيق التاريخ
  formatDate(date: Date | string | undefined): string {
    if (!date) return 'غير محدد';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // تحديث قائمة المستخدمين بعد إضافة مستخدم جديد
  refreshUsersList(): void {
    this.loadAllUsers();
  }

  // تغيير طريقة العرض
  changeView(view: string): void {
    this.currentView = view;
  }

  // الذهاب إلى صفحة إدارة المستخدمين
  goToUserManagement(): void {
    this.router.navigate(['/admin/settings/user-management']);
  }

  // عرض تفاصيل المستخدم
  viewUserDetails(user: UserResponseDto): void {
    this.router.navigate(['/admin/settings/user-management'], { 
      queryParams: { userId: user.id } 
    });
  }

  // تصفية المستخدمين
  get filteredUsers(): UserResponseDto[] {
    if (!this.searchQuery) {
      return this.allUsers;
    }
    
    const query = this.searchQuery.toLowerCase();
    return this.allUsers.filter(user => 
      user.userName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phone.includes(query) ||
      (user.address && user.address.toLowerCase().includes(query)) ||
      user.role.some(role => role.toLowerCase().includes(query))
    );
  }
}
