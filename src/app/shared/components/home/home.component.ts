import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  appointments = [
    {
      id: 1,
      patientName: 'أحمد السيد',
      doctorName: 'د. محمد علي',
      time: '10:00',
      date: 'اليوم',
      status: 'مؤكد'
    },
    {
      id: 2,
      patientName: 'فاطمة حسن',
      doctorName: 'د. سارة أحمد',
      time: '11:30',
      date: 'اليوم',
      status: 'في الانتظار'
    },
    {
      id: 3,
      patientName: 'علي محمود',
      doctorName: 'د. خالد محمد',
      time: '14:00',
      date: 'اليوم',
      status: 'مؤكد'
    },
    {
      id: 4,
      patientName: 'نور الدين',
      doctorName: 'د. مريم سعد',
      time: '15:30',
      date: 'غداً',
      status: 'مجدول'
    }
  ];
}