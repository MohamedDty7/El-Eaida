import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-medication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-medication.component.html',
  styleUrl: './add-medication.component.css'
})
export class AddMedicationComponent implements OnInit {
  medication = {
    name: '',
    genericName: '',
    category: '',
    dosage: '',
    form: '',
    manufacturer: '',
    description: '',
    price: null,
    stock: null,
    minStock: 10,
    sideEffects: '',
    contraindications: '',
    interactions: '',
    storageConditions: '',
    expiryDate: '',
    prescriptionRequired: true
  };

  categories = [
    'مسكنات',
    'مضادات حيوية',
    'مضادات الحموضة',
    'فيتامينات',
    'أدوية القلب',
    'أدوية السكري',
    'أدوية الضغط',
    'أدوية الحساسية',
    'أدوية الجهاز الهضمي',
    'أدوية الجهاز التنفسي'
  ];

  forms = [
    'أقراص',
    'كبسولات',
    'شراب',
    'حقن',
    'مرهم',
    'كريم',
    'قطرات',
    'بخاخ',
    'تحاميل',
    'لصقات'
  ];

  isSubmitting = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.validateForm()) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Medication data:', this.medication);
        this.isSubmitting = false;
        this.router.navigate(['/doctor/medications']);
      }, 2000);
    }
  }

  validateForm(): boolean {
    return !!(this.medication.name && this.medication.genericName && 
              this.medication.category && this.medication.dosage && 
              this.medication.form && this.medication.manufacturer);
  }

  onCancel(): void {
    this.router.navigate(['/doctor/medications']);
  }
}