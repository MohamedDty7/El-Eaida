import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent implements OnInit {
  currentUser: User | null = null;
  
  myAppointments = [
    {
      id: 1,
      doctorName: 'د. أحمد محمد',
      date: '2024-01-15',
      time: '10:00',
      status: 'مؤكد'
    },
    {
      id: 2,
      doctorName: 'د. سارة أحمد',
      date: '2024-01-20',
      time: '14:30',
      status: 'مجدول'
    }
  ];

  myMedications = [
    {
      id: 1,
      name: 'باراسيتامول',
      dosage: '500mg',
      frequency: '3 مرات يومياً',
      duration: '7 أيام'
    },
    {
      id: 2,
      name: 'فيتامين د',
      dosage: '1000 IU',
      frequency: 'مرة يومياً',
      duration: '30 يوم'
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }
}
