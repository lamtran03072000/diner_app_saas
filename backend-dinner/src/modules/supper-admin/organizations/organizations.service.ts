import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization, OrganizationDocument } from './organizations.schema';
import {
  CreateOrganizationDto,
  OrganizationResponseDto,
  OrganizationsListResponseDto,
} from './dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

interface UserPayload {
  sub: string;
  role: string;
}

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name)
    private readonly orgModel: Model<OrganizationDocument>,
  ) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
    user?: UserPayload,
  ): Promise<OrganizationResponseDto> {
    console.log('user', user);
    console.log('createOrganizationDto', createOrganizationDto);

    // Extract user ID from the user parameter
    const actualUserId = user?.sub;

    const organization = new this.orgModel({
      ...createOrganizationDto,
      createdBy: actualUserId,
      updatedBy: actualUserId,
    });

    const savedOrganization = await organization.save();

    return {
      _id: savedOrganization._id.toString(),
      name: savedOrganization.name,
      emailBling: savedOrganization.emailBling,
      plan: savedOrganization.plan,
      isActive: savedOrganization.isActive,
      createdAt: savedOrganization.createdAt || new Date(),
      createdBy: savedOrganization.createdBy?.toString(),
      updatedAt: savedOrganization.updatedAt || new Date(),
      updatedBy: savedOrganization.updatedBy?.toString(),
    };
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<OrganizationsListResponseDto> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [organizations, total] = await Promise.all([
      this.orgModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.orgModel.countDocuments().exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    const data = organizations.map((org) => ({
      _id: org._id.toString(),
      name: org.name,
      emailBling: org.emailBling,
      plan: org.plan,
      isActive: org.isActive,
      createdAt: org.createdAt || new Date(),
      createdBy: org.createdBy?.toString(),
      updatedAt: org.updatedAt || new Date(),
      updatedBy: org.updatedBy?.toString(),
    }));

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
