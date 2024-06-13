import { Injectable } from '@angular/core';
import { ConfigBasic, ConfigService } from '@credhub/relying-party-frontend';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { SessionsApiService } from './api';

export class IssuerConfig extends ConfigBasic {
  issuerUrl!: string;
  credentialId!: string;
}

export interface SessionCreationResponse {
  uri: string;
  session: {
    preAuthorizedCode: string;
  };
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class IssuerService {
  private loop?: ReturnType<typeof setInterval>;
  statusEvent: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private sessionApiService: SessionsApiService,
    private configService: ConfigService<IssuerConfig>
  ) {}

  /**
   * Gets the url for a new session from the issuer and returns it.
   */
  async getUrl(
    credentialId: string = this.configService.getConfig('credentialId'),
    credentialSubject: Record<string, unknown>
  ): Promise<string> {
    if (this.loop) clearInterval(this.loop);
    const res = await firstValueFrom(
      this.sessionApiService.issuerControllerRequest({
        credentialId,
        credentialSubject,
        pin: false,
      })
    );
    this.loop = setInterval(() => this.getStatus(res.id), 2000);
    return res.uri;
  }

  /**
   * Gets the status of a session by id and updates the statusEvent.
   * @param id
   */
  async getStatus(id: string) {
    await firstValueFrom(
      this.sessionApiService.issuerControllerGetSession(id)
    ).then(
      (response) => {
        if (this.statusEvent.value !== response.status) {
          this.statusEvent.next(response.status);
        }
        if (response.status === 'CREDENTIAL_ISSUED') clearInterval(this.loop);
      },
      (err) => {
        console.error(err);
        clearInterval(this.loop);
      }
    );
  }

  stop() {
    clearInterval(this.loop);
  }
}