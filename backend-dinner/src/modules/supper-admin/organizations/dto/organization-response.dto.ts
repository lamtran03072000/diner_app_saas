export class OrganizationResponseDto {
  _id: string;
  name: string;
  emailBling?: string;
  plan: 'pro' | 'basic';
  isActive: boolean;
  createdAt: Date;
  createdBy?: string;
  updatedAt: Date;
  updatedBy?: string;
}
