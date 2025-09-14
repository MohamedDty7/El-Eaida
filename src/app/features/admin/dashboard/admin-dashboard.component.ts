import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  currentUser: User | null = null;
  
  stats = [
    {
      title: 'إجمالي المرضى',
      value: '1,234',
      icon: 'fas fa-users',
      color: 'primary',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'المواعيد اليوم',
      value: '89',
      icon: 'fas fa-calendar-check',
      color: 'success',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'الأطباء النشطين',
      value: '15',
      icon: 'fas fa-user-md',
      color: 'info',
      change: '+2',
      changeType: 'positive'
    },
    {
      title: 'الإيرادات الشهرية',
      value: '45,000 ر.س',
      icon: 'fas fa-chart-line',
      color: 'warning',
      change: '+15%',
      changeType: 'positive'
    }
  ];

  recentActivities = [
    {
      id: 1,
      type: 'appointment',
      title: 'موعد جديد',
      description: 'تم حجز موعد للمريض أحمد السيد',
      time: 'منذ 5 دقائق',
      icon: 'fas fa-calendar-plus'
    },
    {
      id: 2,
      type: 'patient',
      title: 'مريض جديد',
      description: 'تم تسجيل مريض جديد: فاطمة حسن',
      time: 'منذ 15 دقيقة',
      icon: 'fas fa-user-plus'
    },
    {
      id: 3,
      type: 'doctor',
      title: 'طبيب جديد',
      description: 'تم إضافة طبيب جديد: د. سارة أحمد',
      time: 'منذ ساعة',
      icon: 'fas fa-user-md'
    },
    {
      id: 4,
      type: 'report',
      title: 'تقرير شهري',
      description: 'تم إنشاء التقرير الشهري',
      time: 'منذ يومين',
      icon: 'fas fa-chart-bar'
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }
}
