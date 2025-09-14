import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent implements OnInit {
  currentUser: User | null = null;
  
  todayAppointments = [
    {
      id: 1,
      patientName: 'أحمد السيد',
      time: '10:00',
      type: 'فحص دوري',
      status: 'مؤكد'
    },
    {
      id: 2,
      patientName: 'فاطمة حسن',
      time: '11:30',
      type: 'استشارة',
      status: 'في الانتظار'
    },
    {
      id: 3,
      patientName: 'علي محمود',
      time: '14:00',
      type: 'متابعة',
      status: 'مؤكد'
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }
}
