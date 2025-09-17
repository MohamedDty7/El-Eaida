import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AppointmentData {
  date: string;
  total: number;
  completed: number;
  cancelled: number;
  noShow: number;
}

@Component({
  selector: 'app-appointments-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments-report.component.html',
  styleUrl: './appointments-report.component.css'
})
export class AppointmentsReportComponent implements OnInit {
  selectedPeriod = 'month';
  appointmentData: AppointmentData[] = [];
  totalAppointments = 0;
  completedAppointments = 0;
  cancelledAppointments = 0;
  noShowAppointments = 0;

  constructor() {}

  ngOnInit(): void {
    this.loadAppointmentData();
  }

  private loadAppointmentData(): void {
    // Mock data
    this.appointmentData = [
      { date: '2024-01-01', total: 25, completed: 22, cancelled: 2, noShow: 1 },
      { date: '2024-01-02', total: 30, completed: 28, cancelled: 1, noShow: 1 },
      { date: '2024-01-03', total: 28, completed: 26, cancelled: 1, noShow: 1 },
      { date: '2024-01-04', total: 32, completed: 30, cancelled: 1, noShow: 1 },
      { date: '2024-01-05', total: 27, completed: 25, cancelled: 1, noShow: 1 }
    ];

    this.calculateTotals();
  }

  private calculateTotals(): void {
    this.totalAppointments = this.appointmentData.reduce((sum, day) => sum + day.total, 0);
    this.completedAppointments = this.appointmentData.reduce((sum, day) => sum + day.completed, 0);
    this.cancelledAppointments = this.appointmentData.reduce((sum, day) => sum + day.cancelled, 0);
    this.noShowAppointments = this.appointmentData.reduce((sum, day) => sum + day.noShow, 0);
  }

  onPeriodChange(): void {
    this.loadAppointmentData();
  }

  getCompletionRate(): number {
    return this.totalAppointments > 0 ? Math.round((this.completedAppointments / this.totalAppointments) * 100) : 0;
  }

  getCancellationRate(): number {
    return this.totalAppointments > 0 ? Math.round((this.cancelledAppointments / this.totalAppointments) * 100) : 0;
  }

  getNoShowRate(): number {
    return this.totalAppointments > 0 ? Math.round((this.noShowAppointments / this.totalAppointments) * 100) : 0;
  }
}

