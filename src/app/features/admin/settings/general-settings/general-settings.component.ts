import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-general-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './general-settings.component.html',
  styleUrl: './general-settings.component.css'
})
export class GeneralSettingsComponent implements OnInit {
  settings = {
    clinicName: 'عيادة الأييدا',
    clinicAddress: 'شارع الملك فهد، الرياض',
    clinicPhone: '0112345678',
    clinicEmail: 'info@elaida.com',
    workingHours: {
      start: '08:00',
      end: '20:00'
    },
    timezone: 'Asia/Riyadh',
    language: 'ar',
    currency: 'SAR',
    appointmentDuration: 30,
    maxAppointmentsPerDay: 50,
    autoConfirmAppointments: false,
    sendSMSReminders: true,
    sendEmailReminders: true,
    reminderTime: 24
  };

  timezones = [
    { value: 'Asia/Riyadh', label: 'الرياض (GMT+3)' },
    { value: 'Asia/Dubai', label: 'دبي (GMT+4)' },
    { value: 'Asia/Kuwait', label: 'الكويت (GMT+3)' },
    { value: 'Asia/Bahrain', label: 'البحرين (GMT+3)' }
  ];

  languages = [
    { value: 'ar', label: 'العربية' },
    { value: 'en', label: 'English' }
  ];

  currencies = [
    { value: 'SAR', label: 'ريال سعودي (SAR)' },
    { value: 'USD', label: 'دولار أمريكي (USD)' },
    { value: 'EUR', label: 'يورو (EUR)' }
  ];

  isSaving = false;

  ngOnInit(): void {}

  onSave(): void {
    this.isSaving = true;
    
    // Simulate API call
    setTimeout(() => {
      console.log('Settings saved:', this.settings);
      this.isSaving = false;
      // Show success message
    }, 2000);
  }

  onReset(): void {
    if (confirm('هل أنت متأكد من إعادة تعيين جميع الإعدادات؟')) {
      // Reset to default values
      this.ngOnInit();
    }
  }
}