import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-print-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './print-reports.component.html',
  styleUrl: './print-reports.component.css'
})
export class PrintReportsComponent implements OnInit {
  selectedReportType = 'appointments';
  selectedDateRange = 'today';
  startDate = '';
  endDate = '';
  selectedDoctor = 'all';
  selectedStatus = 'all';
  
  reportTypes = [
    { value: 'appointments', label: 'تقرير المواعيد' },
    { value: 'patients', label: 'تقرير المرضى' },
    { value: 'daily', label: 'التقرير اليومي' },
    { value: 'monthly', label: 'التقرير الشهري' }
  ];

  dateRanges = [
    { value: 'today', label: 'اليوم' },
    { value: 'week', label: 'هذا الأسبوع' },
    { value: 'month', label: 'هذا الشهر' },
    { value: 'custom', label: 'فترة مخصصة' }
  ];

  doctors = [
    { value: 'all', label: 'جميع الأطباء' },
    { value: '1', label: 'د. محمد علي' },
    { value: '2', label: 'د. سارة أحمد' },
    { value: '3', label: 'د. أحمد السيد' },
    { value: '4', label: 'د. فاطمة حسن' }
  ];

  statuses = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'confirmed', label: 'مؤكد' },
    { value: 'pending', label: 'في الانتظار' },
    { value: 'completed', label: 'مكتمل' },
    { value: 'cancelled', label: 'ملغي' }
  ];

  reportData: any[] = [];
  isGenerating = false;

  constructor() {}

  ngOnInit(): void {
    this.setDefaultDates();
  }

  setDefaultDates(): void {
    const today = new Date();
    this.startDate = today.toISOString().split('T')[0];
    this.endDate = today.toISOString().split('T')[0];
  }

  onDateRangeChange(): void {
    const today = new Date();
    
    switch (this.selectedDateRange) {
      case 'today':
        this.startDate = today.toISOString().split('T')[0];
        this.endDate = today.toISOString().split('T')[0];
        break;
      case 'week':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        this.startDate = weekStart.toISOString().split('T')[0];
        this.endDate = today.toISOString().split('T')[0];
        break;
      case 'month':
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        this.startDate = monthStart.toISOString().split('T')[0];
        this.endDate = today.toISOString().split('T')[0];
        break;
    }
  }

  generateReport(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isGenerating = true;
    
    // Simulate report generation
    setTimeout(() => {
      this.reportData = this.getMockReportData();
      this.isGenerating = false;
    }, 2000);
  }

  validateForm(): boolean {
    if (this.selectedDateRange === 'custom') {
      return !!(this.startDate && this.endDate);
    }
    return true;
  }

  getMockReportData(): any[] {
    // Mock data based on report type
    switch (this.selectedReportType) {
      case 'appointments':
        return [
          {
            id: 1,
            patientName: 'أحمد السيد',
            doctorName: 'د. محمد علي',
            date: '2024-01-20',
            time: '10:00',
            status: 'مؤكد',
            type: 'استشارة'
          },
          {
            id: 2,
            patientName: 'فاطمة حسن',
            doctorName: 'د. سارة أحمد',
            date: '2024-01-20',
            time: '11:30',
            status: 'مؤكد',
            type: 'متابعة'
          }
        ];
      case 'patients':
        return [
          {
            id: 1,
            name: 'أحمد السيد',
            email: 'ahmed@example.com',
            phone: '01234567890',
            age: 35,
            gender: 'ذكر',
            status: 'نشط',
            lastVisit: '2024-01-15'
          },
          {
            id: 2,
            name: 'فاطمة حسن',
            email: 'fatima@example.com',
            phone: '01234567891',
            age: 28,
            gender: 'أنثى',
            status: 'نشط',
            lastVisit: '2024-01-14'
          }
        ];
      default:
        return [];
    }
  }

  printReport(): void {
    window.print();
  }

  exportToPDF(): void {
    console.log('تصدير إلى PDF');
    // Implement PDF export
  }

  exportToExcel(): void {
    console.log('تصدير إلى Excel');
    // Implement Excel export
  }

  getReportTitle(): string {
    const reportType = this.reportTypes.find(type => type.value === this.selectedReportType);
    return reportType ? reportType.label : 'تقرير';
  }
}









