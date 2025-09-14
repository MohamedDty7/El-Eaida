import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Initialize with mock user for development
    this.initializeMockUser();
  }

  private initializeMockUser(): void {
    const mockUser: User = {
      id: '1',
      username: 'admin',
      email: 'admin@clinic.com',
      firstName: 'أحمد',
      lastName: 'محمد',
      role: UserRole.ADMIN,
      avatar: 'https://via.placeholder.com/40x40/007bff/ffffff?text=أ',
      isActive: true,
      lastLogin: new Date(),
      permissions: [
        { id: '1', name: 'view_dashboard', description: 'عرض لوحة التحكم', resource: 'dashboard', action: 'read' },
        { id: '2', name: 'manage_patients', description: 'إدارة المرضى', resource: 'patients', action: 'all' },
        { id: '3', name: 'manage_appointments', description: 'إدارة المواعيد', resource: 'appointments', action: 'all' },
        { id: '4', name: 'manage_doctors', description: 'إدارة الأطباء', resource: 'doctors', action: 'all' },
        { id: '5', name: 'view_reports', description: 'عرض التقارير', resource: 'reports', action: 'read' }
      ]
    };
    this.currentUserSubject.next(mockUser);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    return user.permissions.some(p => p.name === permission);
  }

  hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  login(username: string, password: string): Observable<boolean> {
    // Mock login - in real app, this would call an API
    return new Observable(observer => {
      setTimeout(() => {
        // Simulate different users based on username
        let mockUser: User;
        switch (username.toLowerCase()) {
          case 'admin':
            mockUser = this.createMockUser(UserRole.ADMIN, 'أحمد', 'محمد');
            break;
          case 'doctor':
            mockUser = this.createMockUser(UserRole.DOCTOR, 'د. سارة', 'أحمد');
            break;
          case 'receptionist':
            mockUser = this.createMockUser(UserRole.RECEPTIONIST, 'فاطمة', 'علي');
            break;
          case 'patient':
            mockUser = this.createMockUser(UserRole.PATIENT, 'محمد', 'حسن');
            break;
          default:
            observer.next(false);
            observer.complete();
            return;
        }
        this.currentUserSubject.next(mockUser);
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  private createMockUser(role: UserRole, firstName: string, lastName: string): User {
    const basePermissions = [
      { id: '1', name: 'view_dashboard', description: 'عرض لوحة التحكم', resource: 'dashboard', action: 'read' }
    ];

    let rolePermissions = [];
    switch (role) {
      case UserRole.ADMIN:
        rolePermissions = [
          { id: '2', name: 'manage_patients', description: 'إدارة المرضى', resource: 'patients', action: 'all' },
          { id: '3', name: 'manage_appointments', description: 'إدارة المواعيد', resource: 'appointments', action: 'all' },
          { id: '4', name: 'manage_doctors', description: 'إدارة الأطباء', resource: 'doctors', action: 'all' },
          { id: '5', name: 'manage_receptionists', description: 'إدارة الاستقبال', resource: 'receptionists', action: 'all' },
          { id: '6', name: 'view_reports', description: 'عرض التقارير', resource: 'reports', action: 'read' },
          { id: '7', name: 'manage_settings', description: 'إدارة الإعدادات', resource: 'settings', action: 'all' }
        ];
        break;
      case UserRole.DOCTOR:
        rolePermissions = [
          { id: '2', name: 'view_patients', description: 'عرض المرضى', resource: 'patients', action: 'read' },
          { id: '3', name: 'manage_appointments', description: 'إدارة المواعيد', resource: 'appointments', action: 'all' },
          { id: '4', name: 'manage_medications', description: 'إدارة الأدوية', resource: 'medications', action: 'all' },
          { id: '5', name: 'view_reports', description: 'عرض التقارير', resource: 'reports', action: 'read' }
        ];
        break;
      case UserRole.RECEPTIONIST:
        rolePermissions = [
          { id: '2', name: 'manage_patients', description: 'إدارة المرضى', resource: 'patients', action: 'all' },
          { id: '3', name: 'manage_appointments', description: 'إدارة المواعيد', resource: 'appointments', action: 'all' }
        ];
        break;
      case UserRole.PATIENT:
        rolePermissions = [
          { id: '2', name: 'view_appointments', description: 'عرض المواعيد', resource: 'appointments', action: 'read' },
          { id: '3', name: 'view_medications', description: 'عرض الأدوية', resource: 'medications', action: 'read' }
        ];
        break;
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      username: role,
      email: `${role}@clinic.com`,
      firstName,
      lastName,
      role,
      avatar: `https://via.placeholder.com/40x40/007bff/ffffff?text=${firstName.charAt(0)}`,
      isActive: true,
      lastLogin: new Date(),
      permissions: [...basePermissions, ...rolePermissions]
    };
  }
}
