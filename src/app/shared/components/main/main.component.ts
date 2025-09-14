import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  @Input() sidebarCollapsed = false;

  stats = [
    {
      title: 'إجمالي المرضى',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: '👥',
      color: '#667eea'
    },
    {
      title: 'المواعيد اليوم',
      value: '45',
      change: '+8%',
      changeType: 'positive',
      icon: '📅',
      color: '#f093fb'
    },
    {
      title: 'المواعيد المكتملة',
      value: '38',
      change: '+15%',
      changeType: 'positive',
      icon: '✅',
      color: '#4facfe'
    },
    {
      title: 'الإيرادات الشهرية',
      value: '45,600 ر.س',
      change: '+23%',
      changeType: 'positive',
      icon: '💰',
      color: '#43e97b'
    }
  ];

  recentAppointments = [
    {
      id: 1,
      patientName: 'أحمد السيد',
      time: '10:00 ص',
      type: 'فحص دوري',
      status: 'مؤكد',
      doctor: 'د. محمد علي'
    },
    {
      id: 2,
      patientName: 'فاطمة حسن',
      time: '10:30 ص',
      type: 'متابعة',
      status: 'في الانتظار',
      doctor: 'د. أحمد محمد'
    },
    {
      id: 3,
      patientName: 'محمد عبدالله',
      time: '11:00 ص',
      type: 'استشارة',
      status: 'مؤكد',
      doctor: 'د. سارة أحمد'
    },
    {
      id: 4,
      patientName: 'نورا محمد',
      time: '11:30 ص',
      type: 'فحص طبي',
      status: 'مؤجل',
      doctor: 'د. خالد سعد'
    }
  ];

  quickActions = [
    {
      title: 'إضافة مريض جديد',
      icon: '👤',
      color: '#667eea',
      action: 'addPatient'
    },
    {
      title: 'حجز موعد',
      icon: '📅',
      color: '#f093fb',
      action: 'bookAppointment'
    },
    {
      title: 'إضافة دواء',
      icon: '💊',
      color: '#4facfe',
      action: 'addMedication'
    },
    {
      title: 'طباعة تقرير',
      icon: '🖨️',
      color: '#43e97b',
      action: 'printReport'
    },
    {
      title: 'إضافة فاتورة',
      icon: '🧾',
      color: '#fa709a',
      action: 'addInvoice'
    },
    {
      title: 'إدارة المخزون',
      icon: '📦',
      color: '#ffecd2',
      action: 'manageInventory'
    }
  ];

  onQuickAction(action: string) {
    console.log('Quick action:', action);
    // Handle quick actions here
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'مؤكد':
        return 'status-confirmed';
      case 'في الانتظار':
        return 'status-pending';
      case 'مؤجل':
        return 'status-postponed';
      default:
        return 'status-default';
    }
  }
}
