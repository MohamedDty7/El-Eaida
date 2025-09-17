import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PatientData {
  ageGroup: string;
  count: number;
  percentage: number;
}

@Component({
  selector: 'app-patients-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients-report.component.html',
  styleUrls: ['./patients-report.component.css']
})
export class PatientsReportComponent implements OnInit {
  selectedPeriod = 'month';
  totalPatients = 1234;
  newPatients = 89;
  returningPatients = 1145;
  patientData: PatientData[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadPatientData();
  }

  private loadPatientData(): void {
    this.patientData = [
      { ageGroup: '0-18', count: 156, percentage: 12.6 },
      { ageGroup: '19-35', count: 389, percentage: 31.5 },
      { ageGroup: '36-50', count: 445, percentage: 36.1 },
      { ageGroup: '51-65', count: 198, percentage: 16.1 },
      { ageGroup: '65+', count: 46, percentage: 3.7 }
    ];
  }

  onPeriodChange(): void {
    this.loadPatientData();
  }

  getNewPatientRate(): number {
    return this.totalPatients > 0 ? Math.round((this.newPatients / this.totalPatients) * 100) : 0;
  }

  getReturningPatientRate(): number {
    return this.totalPatients > 0 ? Math.round((this.returningPatients / this.totalPatients) * 100) : 0;
  }
}









