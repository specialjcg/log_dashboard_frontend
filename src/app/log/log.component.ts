import {Component, OnInit} from '@angular/core';
import {GetLogService} from "../../service/get-log.service";

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  logs: any[] = [];

  constructor(private service: GetLogService) { }

  ngOnInit(): void {
    this.fetchLogs();
  }

  fetchLogs(): void {

    this.service.getLogs().subscribe({
      next: (logs: any[]) => {
        this.logs = logs;
      },
      error: (error: any) => {
        console.error('Error fetching logs:', error);
      }
    });
  }
}
