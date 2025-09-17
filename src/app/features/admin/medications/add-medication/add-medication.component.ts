import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-medication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.css']
})
export class AddMedicationComponent implements OnInit {
  medication = {
    name: '',
    dosage: '',
    form: '',
    manufacturer: '',
    price: 0,
    stock: 0,
    description: '',
    sideEffects: '',
    contraindications: ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      console.log('Medication created:', this.medication);
      this.router.navigate(['/admin/medications']);
    }, 2000);
  }

  private validateForm(): boolean {
    if (!this.medication.name) {
      this.errorMessage = 'يرجى إدخال اسم الدواء';
      return false;
    }
    if (!this.medication.dosage) {
      this.errorMessage = 'يرجى إدخال الجرعة';
      return false;
    }
    if (!this.medication.form) {
      this.errorMessage = 'يرجى إدخال شكل الدواء';
      return false;
    }
    if (!this.medication.manufacturer) {
      this.errorMessage = 'يرجى إدخال الشركة المصنعة';
      return false;
    }
    if (this.medication.price <= 0) {
      this.errorMessage = 'يرجى إدخال سعر صحيح';
      return false;
    }
    if (this.medication.stock < 0) {
      this.errorMessage = 'يرجى إدخال كمية صحيحة';
      return false;
    }
    return true;
  }

  onCancel(): void {
    this.router.navigate(['/admin/medications']);
  }
}

