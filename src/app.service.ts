import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { HttpHealthIndicator, HealthCheckService } from '@nestjs/terminus';
import { Request } from 'express';

type Greetings = {
  message: string;
};

type Status = {
  message: string;
  timestamp: number;
};

@Injectable()
export class AppService {
  #statusMessage: string;
  #greetingsMessage: string;
  #hostname: string;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private http: HttpHealthIndicator,
    private health: HealthCheckService,
  ) {
    this.#greetingsMessage = 'Hello World!';
    this.#statusMessage = 'Service is running';
    const protocol = this.request.protocol;
    const host = this.request.headers.host;

    this.#hostname = `${protocol}://${host}`;
  }

  greetings(): Greetings {
    return {
      message: this.#greetingsMessage,
    };
  }

  status(): Status {
    return {
      message: this.#statusMessage,
      timestamp: Date.now(),
    };
  }

  healthCheck() {
    return this.health.check([
      this.checkHealth<Greetings>('app-service', '/', 'message', this.#greetingsMessage),
      this.checkHealth<Status>('app-status', `/status`, 'message', this.#statusMessage),
    ]);
  }

  private checkHealth<T>(name: string, endpoint: string, dataField: keyof T, dataMatch: any) {
    const targetUrl = this.#hostname + endpoint;
    const path = new URL(targetUrl).pathname;
    const normalizedPath = path.replace(/\/{2,}/g, '/');
    const normalizedUrl = targetUrl.replace(path, normalizedPath);

    return () =>
      this.http.responseCheck<T>(
        name,
        normalizedUrl,
        (res) => res.status === 200 && res.data[dataField] === dataMatch,
      );
  }
}
