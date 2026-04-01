import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, Chart, registerables } from 'chart.js';
import { RouterModule } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  api = inject(ApiService);
  private authService = inject(AuthService);
  private socketService = inject(SocketService);
  
  metrics: any = null;
  salesStats: any = null;
  userProfile: any = null;
  isAdmin = false;
  isLoading = true;

  public lineChartType: ChartType = 'line';
  public barChartType: ChartType = 'bar';
  public pieChartType: ChartType = 'pie';
  
  public pieChartData: ChartConfiguration['data'] = {
    datasets: [{ data: [], label: 'Roles' }],
    labels: []
  };

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  public salesChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const }
    }
  };

  errorMsg = '';

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
    
    if (this.isAdmin) {
      this.loadAdminData();
      this.setupRealTimeUpdates();
    } else {
      this.loadUserProfile();
    }
  }

  loadAdminData() {
    this.isLoading = true;
    this.loadAdminMetrics();
    this.loadSalesStats();
  }

  setupRealTimeUpdates() {
    this.socketService.onNewSale().subscribe(() => {
      console.log('Real-time update: New Sale recorded');
      this.loadSalesStats();
    });

    this.socketService.onNewUser().subscribe(() => {
      console.log('Real-time update: New User registered');
      this.loadAdminMetrics();
    });
  }

  loadAdminMetrics() {
    this.api.getAnalytics().subscribe({
      next: (data) => {
        this.metrics = data;
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

        this.pieChartData = {
          labels: data.roleDistribution.labels,
          datasets: [{ 
            data: data.roleDistribution.counts,
            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B']
          }]
        };
        this.checkLoading();
      },
      error: (err) => {
        this.errorMsg = 'Error loading metrics.';
        this.isLoading = false;
      }
    });
  }

  loadSalesStats() {
    this.api.getSalesStats().subscribe({
      next: (data) => {
        this.salesStats = data;
        this.salesChartData = {
          datasets: [
            {
              data: data.dailySales.amounts,
              label: 'Daily Revenue ($)',
              backgroundColor: 'rgba(16, 185, 129, 0.6)',
              borderColor: 'rgba(16, 185, 129, 1)',
              borderWidth: 1
            }
          ],
          labels: data.dailySales.labels
        };
        this.checkLoading();
      },
      error: (err) => {
        this.errorMsg = 'Error loading sales stats.';
        this.isLoading = false;
      }
    });
  }

  checkLoading() {
    if (this.metrics && this.salesStats) {
      this.isLoading = false;
    }
  }

  loadUserProfile() {
    this.isLoading = true;
    this.api.getProfile().subscribe({
      next: (data) => {
        this.userProfile = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMsg = 'Error loading profile.';
        this.isLoading = false;
      }
    });
  }
}
