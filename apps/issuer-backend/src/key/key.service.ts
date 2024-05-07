import { OnModuleInit } from '@nestjs/common';
import { Signer } from '@sd-jwt/types';
import { JWK, JWTHeaderParameters, JWTPayload } from 'jose';

/**
 * Generic interface for a key service
 */
export abstract class KeyService implements OnModuleInit {
  public abstract signer: Signer;

  async onModuleInit() {
    await this.init();
  }

  /**
   * Initialize the key service
   */
  abstract init(): Promise<void>;

  /**
   * Get the key id
   * @returns
   */
  abstract getKid(): Promise<string>;

  /**
   * Get the public key
   * @returns
   */
  abstract getPublicKey(): Promise<JWK>;

  /**
   * Returns the signature of the given value
   * @param value
   */
  // abstract sign(value: string): Promise<string>;

  abstract signJWT(
    payload: JWTPayload,
    header: JWTHeaderParameters
  ): Promise<string>;
}
