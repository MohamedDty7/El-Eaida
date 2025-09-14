import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})
export class AddPatientComponent implements OnInit {
  patient = {
    name: '',
    email: '',
    phone: '',
    age: null,
    gender: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalHistory: '',
    allergies: '',
    notes: ''
  };

  isSubmitting = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.validateForm()) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Patient data:', this.patient);
        this.isSubmitting = false;
        this.router.navigate(['/admin/patients']);
      }, 2000);
    }
  }

  validateForm(): boolean {
    return !!(this.patient.name && this.patient.email && this.patient.phone && 
              this.patient.age && this.patient.gender);
  }

  onCancel(): void {
    this.router.navigate(['/admin/patients']);
  }
}