import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-receptionist-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receptionist-dashboard.component.html',
  styleUrl: './receptionist-dashboard.component.css'
})
export class ReceptionistDashboardComponent implements OnInit {
  currentUser: User | null = null;
  
  todayAppointments = [
    {
      id: 1,
      patientName: 'أحمد السيد',
      doctorName: 'د. محمد علي',
      time: '10:00',
      status: 'مؤكد'
    },
    {
      id: 2,
      patientName: 'فاطمة حسن',
      doctorName: 'د. سارة أحمد',
      time: '11:30',
      status: 'في الانتظار'
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }
}
