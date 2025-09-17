import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Patient {
  id: string;
  name: string;
  phone: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  appointment = {
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    type: '',
    notes: ''
  };

  patients: Patient[] = [];
  doctors: Doctor[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadMockData();
  }

  private loadMockData(): void {
    this.patients = [
      { id: '1', name: 'أحمد السيد', phone: '01234567890' },
      { id: '2', name: 'فاطمة حسن', phone: '01234567891' },
      { id: '3', name: 'علي محمود', phone: '01234567892' }
    ];

    this.doctors = [
      { id: '1', name: 'د. سارة أحمد', specialty: 'طب عام' },
      { id: '2', name: 'د. محمد علي', specialty: 'أسنان' },
      { id: '3', name: 'د. فاطمة محمد', specialty: 'عيون' }
    ];
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      console.log('Appointment created:', this.appointment);
      this.router.navigate(['/admin/appointments']);
    }, 2000);
  }

  private validateForm(): boolean {
    if (!this.appointment.patientId) {
      this.errorMessage = 'يرجى اختيار المريض';
      return false;
    }
    if (!this.appointment.doctorId) {
      this.errorMessage = 'يرجى اختيار الطبيب';
      return false;
    }
    if (!this.appointment.date) {
      this.errorMessage = 'يرجى اختيار التاريخ';
      return false;
    }
    if (!this.appointment.time) {
      this.errorMessage = 'يرجى اختيار الوقت';
      return false;
    }
    if (!this.appointment.type) {
      this.errorMessage = 'يرجى اختيار نوع الموعد';
      return false;
    }
    return true;
  }

  onCancel(): void {
    this.router.navigate(['/admin/appointments']);
  }
}

