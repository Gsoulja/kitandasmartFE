import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {AdvancedPieChartComponent, NgxChartsModule, ScaleType} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    NgxChartsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  // Chart configuration
  categoryView: [number, number] = [340, 300];
  typeView: [number, number] = [340, 240];

  // Sample data
  categoryData = [
    { name: 'Housing', value: 1200 },
    { name: 'Food', value: 600 },
    { name: 'Transportation', value: 400 },
    { name: 'Entertainment', value: 300 },
    { name: 'Utilities', value: 250 },
  ];

  // Should be in this exact structure
  spendingTypeData = [
    {
      name: 'Essential',
      value: 2450  // Must be a number
    },
    {
      name: 'Discretionary',
      value: 735   // Must be a number
    }
  ];

  // Correct color schemes
  categoryColorScheme = {
    name: 'categoryScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#3366CC']
  };

  typeColorScheme = {
    name: 'typeScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#28a745', '#ffc107']
  };

  // Rest of the component
  categoryTooltipText = (item: any) => `${item.name}: $${item.value}`;
  typeTooltipText = (item: any) => `${item.name}: $${item.value} (${item.percentage.toFixed(1)}%)`;

  totalToday = 125.50;
  totalWeek = 845.00;
  totalMonth = 3185.00;
}
