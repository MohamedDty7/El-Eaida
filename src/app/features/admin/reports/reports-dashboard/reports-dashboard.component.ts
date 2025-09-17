import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ReportCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  route: string;
  stats: {
    value: string;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
  };
}

@Component({
  selector: 'app-reports-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports-dashboard.component.html',
  styleUrls: ['./reports-dashboard.component.css']
})
export class ReportsDashboardComponent implements OnInit {
  reportCards: ReportCard[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadReportCards();
  }

  private loadReportCards(): void {
    this.reportCards = [
      {
        id: 'appointments',
        title: 'تقرير المواعيد',
        description: 'عرض إحصائيات المواعيد اليومية والشهرية',
        icon: 'fas fa-calendar-alt',
        color: 'primary',
        route: '/admin/reports/appointments',
        stats: {
          value: '156',
          change: '+12%',
          changeType: 'positive'
        }
      },
      {
        id: 'patients',
        title: 'تقرير المرضى',
        description: 'إحصائيات المرضى الجدد والمتابعين',
        icon: 'fas fa-users',
        color: 'success',
        route: '/admin/reports/patients',
        stats: {
          value: '1,234',
          change: '+8%',
          changeType: 'positive'
        }
      },
      {
        id: 'financial',
        title: 'التقرير المالي',
        description: 'الإيرادات والمصروفات الشهرية',
        icon: 'fas fa-chart-line',
        color: 'warning',
        route: '/admin/reports/financial',
        stats: {
          value: '45,000 ر.س',
          change: '+15%',
          changeType: 'positive'
        }
      },
      {
        id: 'medications',
        title: 'تقرير الأدوية',
        description: 'استهلاك الأدوية والمخزون',
        icon: 'fas fa-pills',
        color: 'info',
        route: '/admin/reports/medications',
        stats: {
          value: '89%',
          change: '-3%',
          changeType: 'negative'
        }
      }
    ];
  }

  navigateToReport(route: string): void {
    this.router.navigate([route]);
  }
}

