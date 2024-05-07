import { JWTPayload } from '@sphereon/oid4vci-common';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class ProofRequest {
  @IsString()
  @IsOptional()
  kid: string;

  @IsObject()
  payload: JWTPayload;
}
