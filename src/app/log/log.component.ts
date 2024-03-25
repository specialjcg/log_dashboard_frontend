import {Component, OnInit} from '@angular/core';
import {GetLogService} from "../../service/get-log.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  startDate: string | null | undefined;
  startTime: string | null | undefined;
  endDate: string | null | undefined;
  endTime: string | null | undefined;
  logs: any[]=[]; // Your logs
  filteredLogs: any[] =[];
  totalLogs: number = 0;
  constructor(private service: GetLogService,private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.fetchLogs();


  }
  applyFilters(): void {
    // Apply date and time filters to logs
    this.filteredLogs = this.logs.filter(log => {
      const logDateTime = new Date(log.timestamp);
      const startDateTime = new Date(`${this.startDate}T${this.startTime}`);
      const endDateTime = new Date(`${this.endDate}T${this.endTime}`);
      return logDateTime >= startDateTime && logDateTime <= endDateTime;
    });
  }
  fetchLogs(): void {

    this.service.getLogs().subscribe({
      next: (logs: any) => {
        this.logs = logs.logs.sort((a: { timestamp: string | number | Date; }, b: { timestamp: string | number | Date; }) => {
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        });
        this.totalLogs = logs.totalRecords;
        if (this.logs && this.logs.length > 0) {
          // Initialize start date and end time with the first and last log timestamps
          const firstLogTimestamp = this.logs[0].timestamp;
          const lastLogTimestamp = this.logs[this.logs.length - 1].timestamp;

          this.startDate = this.datePipe.transform(new Date(firstLogTimestamp), 'yyyy-MM-dd', 'Europe/Paris');
          this.startTime = this.datePipe.transform(new Date(firstLogTimestamp), 'HH:mm', 'Europe/Paris');

          this.endDate = this.datePipe.transform(new Date(lastLogTimestamp), 'yyyy-MM-dd', 'Europe/Paris');
          this.endTime = this.datePipe.transform(new Date(lastLogTimestamp), 'HH:mm', 'Europe/Paris');
        }
        this.applyFilters()
      },
      error: (error: any) => {
        console.error('Error fetching logs:', error);
      }
    });

  }

}
