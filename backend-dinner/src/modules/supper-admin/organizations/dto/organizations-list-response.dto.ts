import { OrganizationResponseDto } from './organization-response.dto';

export class OrganizationsListResponseDto {
  data: OrganizationResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
