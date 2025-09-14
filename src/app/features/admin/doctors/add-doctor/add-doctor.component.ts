import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})
export class AddDoctorComponent implements OnInit {
  doctor = {
    name: '',
    email: '',
    phone: '',
    specialty: '',
    experience: null,
    licenseNumber: '',
    address: '',
    schedule: {
      startTime: '09:00',
      endTime: '17:00',
      workingDays: [] as string[]
    },
    education: '',
    certifications: '',
    notes: ''
  };

  specialties = [
    'أمراض القلب',
    'طب الأطفال',
    'الجراحة العامة',
    'طب العيون',
    'طب الأسنان',
    'النساء والولادة',
    'الطب الباطني',
    'الطب النفسي',
    'الجراحة التجميلية',
    'طب الأعصاب',
    'الأنف والأذن والحنجرة',
    'الجلدية'
  ];

  workingDays = [
    { name: 'السبت', value: 'saturday', checked: false },
    { name: 'الأحد', value: 'sunday', checked: false },
    { name: 'الاثنين', value: 'monday', checked: false },
    { name: 'الثلاثاء', value: 'tuesday', checked: false },
    { name: 'الأربعاء', value: 'wednesday', checked: false },
    { name: 'الخميس', value: 'thursday', checked: false },
    { name: 'الجمعة', value: 'friday', checked: false }
  ];

  isSubmitting = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.validateForm()) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Doctor data:', this.doctor);
        this.isSubmitting = false;
        this.router.navigate(['/admin/doctors']);
      }, 2000);
    }
  }

  validateForm(): boolean {
    return !!(this.doctor.name && this.doctor.email && this.doctor.phone && 
              this.doctor.specialty && this.doctor.experience && this.doctor.licenseNumber);
  }

  onCancel(): void {
    this.router.navigate(['/admin/doctors']);
  }

  onWorkingDayChange(day: any): void {
    day.checked = !day.checked;
    this.doctor.schedule.workingDays = this.workingDays
      .filter(d => d.checked)
      .map(d => d.value) as string[];
  }
}