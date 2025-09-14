import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserRole } from '../models/user.model';
import { AuthService } from './auth.service';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  routerLink: string;
  permissions: string[];
  isVisible: boolean;
  children?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private authService: AuthService) {}

  getMenuItems(): Observable<MenuItem[]> {
    const user = this.authService.getCurrentUser();
    if (!user) return of([]);

    const allMenuItems: MenuItem[] = [
      // Dashboard
      {
        id: 'dashboard',
        label: 'لوحة التحكم',
        icon: 'fas fa-tachometer-alt',
        route: '/dashboard',
        routerLink: '/dashboard',
        permissions: ['view_dashboard'],
        isVisible: true
      },
      // Admin Menu
      {
        id: 'patients',
        label: 'المرضى',
        icon: 'fas fa-users',
        route: '/admin/patients',
        routerLink: '/admin/patients',
        permissions: ['manage_patients'],
        isVisible: user.role === UserRole.ADMIN || user.role === UserRole.RECEPTIONIST,
        children: [
          {
            id: 'patients-list',
            label: 'قائمة المرضى',
            icon: 'fas fa-list',
            route: '/admin/patients',
            routerLink: '/admin/patients',
            permissions: ['manage_patients'],
            isVisible: true
          },
          {
            id: 'add-patient',
            label: 'إضافة مريض',
            icon: 'fas fa-user-plus',
            route: '/admin/patients/add',
            routerLink: '/admin/patients/add',
            permissions: ['manage_patients'],
            isVisible: true
          }
        ]
      },
      {
        id: 'appointments',
        label: 'المواعيد',
        icon: 'fas fa-calendar-alt',
        route: '/appointments',
        routerLink: '/appointments',
        permissions: ['manage_appointments', 'view_appointments'],
        isVisible: true,
        children: [
          {
            id: 'appointments-list',
            label: 'قائمة المواعيد',
            icon: 'fas fa-list',
            route: '/appointments',
            routerLink: '/appointments',
            permissions: ['manage_appointments', 'view_appointments'],
            isVisible: true
          },
          {
            id: 'add-appointment',
            label: 'حجز موعد',
            icon: 'fas fa-calendar-plus',
            route: '/appointments/add',
            routerLink: '/appointments/add',
            permissions: ['manage_appointments'],
            isVisible: true
          }
        ]
      },
      {
        id: 'doctors',
        label: 'الأطباء',
        icon: 'fas fa-user-md',
        route: '/admin/doctors',
        routerLink: '/admin/doctors',
        permissions: ['manage_doctors'],
        isVisible: user.role === UserRole.ADMIN,
        children: [
          {
            id: 'doctors-list',
            label: 'قائمة الأطباء',
            icon: 'fas fa-list',
            route: '/admin/doctors',
            routerLink: '/admin/doctors',
            permissions: ['manage_doctors'],
            isVisible: true
          },
          {
            id: 'add-doctor',
            label: 'إضافة طبيب',
            icon: 'fas fa-user-plus',
            route: '/admin/doctors/add',
            routerLink: '/admin/doctors/add',
            permissions: ['manage_doctors'],
            isVisible: true
          }
        ]
      },
      {
        id: 'medications',
        label: 'الأدوية',
        icon: 'fas fa-pills',
        route: '/medications',
        routerLink: '/medications',
        permissions: ['manage_medications', 'view_medications'],
        isVisible: user.role === UserRole.ADMIN || user.role === UserRole.DOCTOR || user.role === UserRole.PATIENT,
        children: [
          {
            id: 'medications-list',
            label: 'قائمة الأدوية',
            icon: 'fas fa-list',
            route: '/medications',
            routerLink: '/medications',
            permissions: ['manage_medications', 'view_medications'],
            isVisible: true
          },
          {
            id: 'add-medication',
            label: 'إضافة دواء',
            icon: 'fas fa-plus',
            route: '/medications/add',
            routerLink: '/medications/add',
            permissions: ['manage_medications'],
            isVisible: true
          }
        ]
      },
      {
        id: 'reports',
        label: 'التقارير',
        icon: 'fas fa-chart-bar',
        route: '/reports',
        routerLink: '/reports',
        permissions: ['view_reports'],
        isVisible: user.role === UserRole.ADMIN || user.role === UserRole.DOCTOR,
        children: [
          {
            id: 'appointments-report',
            label: 'تقرير المواعيد',
            icon: 'fas fa-calendar',
            route: '/reports/appointments',
            routerLink: '/reports/appointments',
            permissions: ['view_reports'],
            isVisible: true
          },
          {
            id: 'patients-report',
            label: 'تقرير المرضى',
            icon: 'fas fa-users',
            route: '/reports/patients',
            routerLink: '/reports/patients',
            permissions: ['view_reports'],
            isVisible: true
          }
        ]
      },
      {
        id: 'settings',
        label: 'الإعدادات',
        icon: 'fas fa-cog',
        route: '/admin/settings',
        routerLink: '/admin/settings',
        permissions: ['manage_settings'],
        isVisible: user.role === UserRole.ADMIN,
        children: [
          {
            id: 'general-settings',
            label: 'الإعدادات العامة',
            icon: 'fas fa-cog',
            route: '/admin/settings/general',
            routerLink: '/admin/settings/general',
            permissions: ['manage_settings'],
            isVisible: true
          },
          {
            id: 'user-management',
            label: 'إدارة المستخدمين',
            icon: 'fas fa-users-cog',
            route: '/admin/settings/users',
            routerLink: '/admin/settings/users',
            permissions: ['manage_settings'],
            isVisible: true
          }
        ]
      }
    ];

    // Filter menu items based on user permissions
    const filteredMenuItems = allMenuItems.filter(item => {
      if (!item.isVisible) return false;
      
      // Check if user has any of the required permissions
      return item.permissions.some(permission => 
        this.authService.hasPermission(permission)
      );
    }).map(item => ({
      ...item,
      children: item.children?.filter(child => 
        child.isVisible && child.permissions.some(permission => 
          this.authService.hasPermission(permission)
        )
      )
    }));

    return of(filteredMenuItems);
  }

  getMenuItemsByRole(role: string): MenuItem[] {
    switch (role) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'لوحة التحكم', icon: 'fas fa-tachometer-alt', route: '/admin/dashboard', routerLink: '/admin/dashboard', permissions: ['view_dashboard'], isVisible: true },
          { 
            id: 'patients', 
            label: 'المرضى', 
            icon: 'fas fa-user-injured', 
            route: '/admin/patients', 
            routerLink: '/admin/patients', 
            permissions: ['manage_patients'], 
            isVisible: true,
            children: [
              { id: 'patients-list', label: 'قائمة المرضى', icon: 'fas fa-list', route: '/admin/patients/list', routerLink: '/admin/patients/list', permissions: ['manage_patients'], isVisible: true },
              { id: 'add-patient', label: 'إضافة مريض', icon: 'fas fa-plus', route: '/admin/patients/add', routerLink: '/admin/patients/add', permissions: ['manage_patients'], isVisible: true }
            ]
          },
          { 
            id: 'doctors', 
            label: 'الأطباء', 
            icon: 'fas fa-user-md', 
            route: '/admin/doctors', 
            routerLink: '/admin/doctors', 
            permissions: ['manage_doctors'], 
            isVisible: true,
            children: [
              { id: 'doctors-list', label: 'قائمة الأطباء', icon: 'fas fa-list', route: '/admin/doctors/list', routerLink: '/admin/doctors/list', permissions: ['manage_doctors'], isVisible: true },
              { id: 'add-doctor', label: 'إضافة طبيب', icon: 'fas fa-plus', route: '/admin/doctors/add', routerLink: '/admin/doctors/add', permissions: ['manage_doctors'], isVisible: true }
            ]
          },
          { 
            id: 'settings', 
            label: 'الإعدادات', 
            icon: 'fas fa-cog', 
            route: '/admin/settings', 
            routerLink: '/admin/settings', 
            permissions: ['manage_settings'], 
            isVisible: true,
            children: [
              { id: 'general-settings', label: 'الإعدادات العامة', icon: 'fas fa-cogs', route: '/admin/settings/general', routerLink: '/admin/settings/general', permissions: ['manage_settings'], isVisible: true },
              { id: 'user-management', label: 'إدارة المستخدمين', icon: 'fas fa-users-cog', route: '/admin/settings/users', routerLink: '/admin/settings/users', permissions: ['manage_settings'], isVisible: true }
            ]
          }
        ];
      case 'doctor':
        return [
          { id: 'dashboard', label: 'لوحة التحكم', icon: 'fas fa-tachometer-alt', route: '/doctor/dashboard', routerLink: '/doctor/dashboard', permissions: ['view_dashboard'], isVisible: true },
          { 
            id: 'appointments', 
            label: 'المواعيد', 
            icon: 'fas fa-calendar-alt', 
            route: '/doctor/appointments', 
            routerLink: '/doctor/appointments', 
            permissions: ['manage_appointments'], 
            isVisible: true,
            children: [
              { id: 'appointments-list', label: 'قائمة المواعيد', icon: 'fas fa-list', route: '/doctor/appointments/list', routerLink: '/doctor/appointments/list', permissions: ['manage_appointments'], isVisible: true },
              { id: 'add-appointment', label: 'إضافة موعد', icon: 'fas fa-plus', route: '/doctor/appointments/add', routerLink: '/doctor/appointments/add', permissions: ['manage_appointments'], isVisible: true }
            ]
          },
          { 
            id: 'patients', 
            label: 'المرضى', 
            icon: 'fas fa-user-injured', 
            route: '/doctor/patients', 
            routerLink: '/doctor/patients', 
            permissions: ['view_patients'], 
            isVisible: true,
            children: [
              { id: 'patients-list', label: 'قائمة المرضى', icon: 'fas fa-list', route: '/doctor/patients/list', routerLink: '/doctor/patients/list', permissions: ['view_patients'], isVisible: true }
            ]
          },
          { 
            id: 'medications', 
            label: 'الأدوية', 
            icon: 'fas fa-pills', 
            route: '/doctor/medications', 
            routerLink: '/doctor/medications', 
            permissions: ['manage_medications'], 
            isVisible: true,
            children: [
              { id: 'medications-list', label: 'قائمة الأدوية', icon: 'fas fa-list', route: '/doctor/medications/list', routerLink: '/doctor/medications/list', permissions: ['manage_medications'], isVisible: true },
              { id: 'add-medication', label: 'إضافة دواء', icon: 'fas fa-plus', route: '/doctor/medications/add', routerLink: '/doctor/medications/add', permissions: ['manage_medications'], isVisible: true }
            ]
          }
        ];
      case 'receptionist':
        return [
          { id: 'dashboard', label: 'لوحة التحكم', icon: 'fas fa-tachometer-alt', route: '/receptionist/dashboard', routerLink: '/receptionist/dashboard', permissions: ['view_dashboard'], isVisible: true },
          { 
            id: 'patients', 
            label: 'المرضى', 
            icon: 'fas fa-user-injured', 
            route: '/receptionist/patients', 
            routerLink: '/receptionist/patients', 
            permissions: ['manage_patients'], 
            isVisible: true,
            children: [
              { id: 'patients-list', label: 'قائمة المرضى', icon: 'fas fa-list', route: '/receptionist/patients/list', routerLink: '/receptionist/patients/list', permissions: ['manage_patients'], isVisible: true },
              { id: 'add-patient', label: 'إضافة مريض', icon: 'fas fa-plus', route: '/receptionist/patients/add', routerLink: '/receptionist/patients/add', permissions: ['manage_patients'], isVisible: true }
            ]
          },
          { 
            id: 'appointments', 
            label: 'المواعيد', 
            icon: 'fas fa-calendar-alt', 
            route: '/receptionist/appointments', 
            routerLink: '/receptionist/appointments', 
            permissions: ['manage_appointments'], 
            isVisible: true,
            children: [
              { id: 'appointments-list', label: 'قائمة المواعيد', icon: 'fas fa-list', route: '/receptionist/appointments/list', routerLink: '/receptionist/appointments/list', permissions: ['manage_appointments'], isVisible: true },
              { id: 'add-appointment', label: 'إضافة موعد', icon: 'fas fa-plus', route: '/receptionist/appointments/add', routerLink: '/receptionist/appointments/add', permissions: ['manage_appointments'], isVisible: true }
            ]
          }
        ];
      case 'patient':
        return [
          { id: 'dashboard', label: 'لوحة التحكم', icon: 'fas fa-tachometer-alt', route: '/patient/dashboard', routerLink: '/patient/dashboard', permissions: ['view_dashboard'], isVisible: true },
          { id: 'my-appointments', label: 'مواعيدي', icon: 'fas fa-calendar-check', route: '/patient/appointments/my', routerLink: '/patient/appointments/my', permissions: ['view_appointments'], isVisible: true },
          { id: 'my-medications', label: 'أدويتي', icon: 'fas fa-prescription-bottle-alt', route: '/patient/medications/my', routerLink: '/patient/medications/my', permissions: ['view_medications'], isVisible: true }
        ];
      default:
        return [];
    }
  }
}
