import { ComponentFixture, TestBed } from '@angular/core/testing';

import {GetLogService} from "../../service/get-log.service";
import {HttpClientModule} from "@angular/common/http";

describe('LogComponent', () => {
  let service: GetLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Add HttpClientTestingModule to imports array
      imports: [HttpClientModule],
      providers: [GetLogService]
    });
    service = TestBed.inject(GetLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
