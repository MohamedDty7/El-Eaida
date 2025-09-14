import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.css'
})
export class AddAppointmentComponent implements OnInit {
  appointment = {
    patientId: '',
    patientName: '',
    patientPhone: '',
    doctorId: '',
    doctorName: '',
    date: '',
    time: '',
    type: '',
    duration: 30,
    room: '',
    notes: '',
    priority: 'عادي'
  };

  appointmentTypes = [
    { value: 'استشارة', label: 'استشارة' },
    { value: 'متابعة', label: 'متابعة' },
    { value: 'فحص', label: 'فحص' },
    { value: 'علاج', label: 'علاج' },
    { value: 'جراحة', label: 'جراحة' }
  ];

  priorities = [
    { value: 'عادي', label: 'عادي' },
    { value: 'عاجل', label: 'عاجل' },
    { value: 'طوارئ', label: 'طوارئ' }
  ];

  durations = [
    { value: 15, label: '15 دقيقة' },
    { value: 30, label: '30 دقيقة' },
    { value: 45, label: '45 دقيقة' },
    { value: 60, label: '60 دقيقة' },
    { value: 90, label: '90 دقيقة' }
  ];

  doctors = [
    { id: 1, name: 'د. محمد علي', specialty: 'أمراض القلب' },
    { id: 2, name: 'د. سارة أحمد', specialty: 'طب الأطفال' },
    { id: 3, name: 'د. أحمد السيد', specialty: 'الجراحة العامة' },
    { id: 4, name: 'د. فاطمة حسن', specialty: 'النساء والولادة' }
  ];

  patients = [
    { id: 1, name: 'أحمد السيد', phone: '01234567890' },
    { id: 2, name: 'فاطمة حسن', phone: '01234567891' },
    { id: 3, name: 'علي محمود', phone: '01234567892' },
    { id: 4, name: 'سارة أحمد', phone: '01234567893' }
  ];

  rooms = ['A101', 'A102', 'A103', 'A104', 'B101', 'B102', 'B103'];

  isSubmitting = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set default date to today
    this.appointment.date = new Date().toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.validateForm()) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Appointment data:', this.appointment);
        this.isSubmitting = false;
        this.router.navigate(['/receptionist/appointments']);
      }, 2000);
    }
  }

  validateForm(): boolean {
    return !!(this.appointment.patientName && this.appointment.patientPhone && 
              this.appointment.doctorName && this.appointment.date && 
              this.appointment.time && this.appointment.type);
  }

  onCancel(): void {
    this.router.navigate(['/receptionist/appointments']);
  }

  onPatientSelect(patient: any): void {
    this.appointment.patientId = patient.id;
    this.appointment.patientName = patient.name;
    this.appointment.patientPhone = patient.phone;
  }

  onDoctorSelect(doctor: any): void {
    this.appointment.doctorId = doctor.id;
    this.appointment.doctorName = doctor.name;
  }
}