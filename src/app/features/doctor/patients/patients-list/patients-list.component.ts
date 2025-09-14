import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [CommonModule],
  template: '<div class="patients-list"><h2>قائمة المرضى</h2><p>صفحة قائمة المرضى - قيد التطوير</p></div>',
  styles: ['.patients-list { padding: 2rem; }']
})
export class PatientsListComponent {}
