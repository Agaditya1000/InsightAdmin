import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  api = inject(ApiService);
  metrics: any = null;

  public lineChartType: ChartType = 'line';
  public pieChartType: ChartType = 'pie';
  
  public pieChartData: ChartConfiguration['data'] = {
    datasets: [{ data: [], label: 'Roles' }],
    labels: []
  };

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const }
    }
  };

  errorMsg = '';

  ngOnInit() {
    this.api.getAnalytics().subscribe({
      next: (data) => {
        this.metrics = data;
        
        // Line Chart (User Growth)
        this.lineChartData = {
          datasets: [
            { 
              data: data.signUps, 
              label: 'New Sign-ups', 
              borderColor: 'rgba(59, 130, 246, 1)', 
              backgroundColor: 'rgba(59, 130, 246, 0.2)', 
              fill: true, 
              tension: 0.4 
            }
          ],
          labels: data.labels
        };

        // Pie Chart (Role Distribution)
        this.pieChartData = {
          labels: data.roleDistribution.labels,
          datasets: [{ 
            data: data.roleDistribution.counts,
            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B']
          }]
        };
      },
      error: (err: any) => {
        this.errorMsg = err.status === 403 ? 'You do not have administrative permission to view analytics.' : 'Error loading metrics.';
      }
    });
  }
}
