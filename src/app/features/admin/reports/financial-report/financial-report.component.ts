import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FinancialData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

@Component({
  selector: 'app-financial-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.css']
})
export class FinancialReportComponent implements OnInit {
  selectedPeriod = 'year';
  totalRevenue = 450000;
  totalExpenses = 320000;
  totalProfit = 130000;
  financialData: FinancialData[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadFinancialData();
  }

  private loadFinancialData(): void {
    this.financialData = [
      { month: 'يناير', revenue: 38000, expenses: 25000, profit: 13000 },
      { month: 'فبراير', revenue: 42000, expenses: 28000, profit: 14000 },
      { month: 'مارس', revenue: 45000, expenses: 30000, profit: 15000 },
      { month: 'أبريل', revenue: 48000, expenses: 32000, profit: 16000 },
      { month: 'مايو', revenue: 52000, expenses: 35000, profit: 17000 },
      { month: 'يونيو', revenue: 55000, expenses: 37000, profit: 18000 }
    ];
  }

  onPeriodChange(): void {
    this.loadFinancialData();
  }

  getProfitMargin(): number {
    return this.totalRevenue > 0 ? Math.round((this.totalProfit / this.totalRevenue) * 100) : 0;
  }

  getExpenseRatio(): number {
    return this.totalRevenue > 0 ? Math.round((this.totalExpenses / this.totalRevenue) * 100) : 0;
  }
}









