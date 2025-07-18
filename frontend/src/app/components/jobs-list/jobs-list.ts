import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobService, Job } from '../../services/job.service';

@Component({
  selector: 'app-jobs-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './jobs-list.html',
  styleUrl: './jobs-list.scss',
})
export class JobsList implements OnInit {
  jobList: Job[] = [];
  selectedSort: string = '';
  isAscending: boolean = true;

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.jobService.getAllJobs().subscribe((jobs: Job[]) => {
      this.jobList = jobs;
    });
  }

  sortJobs() {
    if (!this.selectedSort) return;

    this.jobList.sort((a, b) => {
      const aValue = a[this.selectedSort as keyof Job];
      const bValue = b[this.selectedSort as keyof Job];

      if (aValue < bValue) return this.isAscending ? -1 : 1;
      if (aValue > bValue) return this.isAscending ? 1 : -1;
      return 0;
    });
  }

  toggleSortDirection() {
    this.isAscending = !this.isAscending;
    this.sortJobs();
  }

  addJob() {}
}
