import {Component, OnInit} from '@angular/core';
import {GetLogService} from "../../service/get-log.service";
import {DatePipe} from "@angular/common";
import {Timestamp} from "rxjs";

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
      const logDateTime = new Date(log.timestamp.secs_since_epoch*1000+log.timestamp.nanos_since_epoch/100000);
      const startDateTime = new Date(`${this.startDate}T${this.startTime}`);
      const endDateTime = new Date(`${this.endDate}T${this.endTime}`);
      return logDateTime >= startDateTime && logDateTime <= endDateTime;
    });
  }
  fetchLogs(): void {

    this.service.getLogs().subscribe({
      next: (logs: any) => {
        this.logs = logs.sort((a: { timestamp: {secs_since_epoch: number,nanos_since_epoch:number} }, b:{timestamp: {secs_since_epoch: number,nanos_since_epoch:number}}) => {
          return a.timestamp.secs_since_epoch*1000 + a.timestamp.nanos_since_epoch/100000- b.timestamp.secs_since_epoch*1000 - b.timestamp.nanos_since_epoch/100000;
        });
        this.totalLogs = logs.totalRecords;
        if (this.logs && this.logs.length > 0) {
          // Initialize start date and end time with the first and last log timestamps
          const firstLogTimestamp = this.logs[0].timestamp;
          const lastLogTimestamp = this.logs[this.logs.length - 1].timestamp;

          this.startDate = this.datePipe.transform(new Date(firstLogTimestamp.secs_since_epoch*1000+firstLogTimestamp.nanos_since_epoch/100000), 'yyyy-MM-dd', 'Europe/Paris');
          this.startTime = this.datePipe.transform(new Date(firstLogTimestamp.secs_since_epoch*1000+firstLogTimestamp.nanos_since_epoch/100000), 'HH:mm', 'Europe/Paris');

          this.endDate = this.datePipe.transform(new Date(lastLogTimestamp.secs_since_epoch*1000+lastLogTimestamp.nanos_since_epoch/100000), 'yyyy-MM-dd', 'Europe/Paris');
          this.endTime = this.datePipe.transform(new Date(lastLogTimestamp.secs_since_epoch*1000+lastLogTimestamp.nanos_since_epoch/100000), 'HH:mm', 'Europe/Paris');
        }
        this.applyFilters()
      },
      error: (error: any) => {
        console.error('Error fetching logs:', error);
      }
    });

  }

  changeTime(timestamp:  {secs_since_epoch: number,nanos_since_epoch:number} ) {
    return new Date(timestamp.secs_since_epoch*1000+timestamp.nanos_since_epoch/100000);
  }
}
