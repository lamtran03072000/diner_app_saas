import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Customer, CustomerDocument } from '../schemas/customers.schema';
import { CreateCustomerDto } from '../dto/customers/create-customer.dto';
import { UpdateCustomerDto } from '../dto/customers/update-customer.dto';
import { QueryCustomerDto } from '../dto/customers/query-customer.dto';
import { SupperAdminCustomerUsersService } from './supper-admin-customer-users.service';

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class SupperAdminCustomersService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: Model<CustomerDocument>,
    private customerUsersService: SupperAdminCustomerUsersService,
  ) {}

  async create(dto: CreateCustomerDto): Promise<{ customer: Customer; owner: any }> {
    // Normalize billing email if provided
    const normalizedBillingEmail = dto.billingEmail?.toLowerCase().trim();

    // Create new customer
    const newCustomer = new this.customerModel({
      name: dto.orgName.trim(),
      billingEmail: normalizedBillingEmail,
      plan: dto.plan || 'basic',
      isActive: dto.isActive !== undefined ? dto.isActive : true,
    });

    const savedCustomer = await newCustomer.save();

    // Hash owner password
    const passwordHash = await bcrypt.hash(dto.ownerPassword, 10);

    // Create owner user
    const owner = await this.customerUsersService.createOwner(
      (savedCustomer._id as any).toString(),
      {
        fullName: dto.ownerFullName,
        email: dto.ownerEmail,
        passwordHash,
      }
    );

    // Sanitize owner response
    const sanitizedOwner = this.customerUsersService.sanitize(owner as any);

    return {
      customer: savedCustomer,
      owner: sanitizedOwner,
    };
  }

  async findMany(query: QueryCustomerDto): Promise<PaginatedResponse<Customer>> {
    const { page = 1, limit = 20, search, plan, isActive, sort = '-createdAt' } = query;

    // Build filter conditions
    const filter: any = {};

    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { billingEmail: { $regex: search, $options: 'i' } },
      ];
    }

    // Plan filter
    if (plan) {
      filter.plan = plan;
    }

    // Active status filter
    if (isActive !== undefined) {
      filter.isActive = isActive;
    }

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Execute queries
    const [items, total] = await Promise.all([
      this.customerModel
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.customerModel.countDocuments(filter).exec(),
    ]);

    return {
      items,
      total,
      page,
      limit,
    };
  }

  async findById(id: string): Promise<Customer> {
    const customer = await this.customerModel.findById(id).exec();
    
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async update(id: string, dto: UpdateCustomerDto): Promise<Customer> {
    // Check if customer exists
    const existingCustomer = await this.customerModel.findById(id).exec();
    if (!existingCustomer) {
      throw new NotFoundException('Customer not found');
    }

    // Prepare update data
    const updateData: any = {};

    if (dto.orgName !== undefined) {
      updateData.name = dto.orgName.trim();
    }

    if (dto.billingEmail !== undefined) {
      updateData.billingEmail = dto.billingEmail.toLowerCase().trim();
    }

    if (dto.plan !== undefined) {
      updateData.plan = dto.plan;
    }

    if (dto.isActive !== undefined) {
      updateData.isActive = dto.isActive;
    }

    // Update customer
    const updatedCustomer = await this.customerModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedCustomer) {
      throw new NotFoundException('Customer not found');
    }

    return updatedCustomer;
  }

  async remove(id: string, hardDelete: boolean = false): Promise<Customer> {
    const customer = await this.customerModel.findById(id).exec();
    
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    if (hardDelete) {
      // Hard delete - remove from database
      await this.customerModel.findByIdAndDelete(id).exec();
      return customer;
    } else {
      // Soft delete - set isActive to false
      const updatedCustomer = await this.customerModel
        .findByIdAndUpdate(id, { isActive: false }, { new: true })
        .exec();
      
      if (!updatedCustomer) {
        throw new NotFoundException('Customer not found');
      }
      
      return updatedCustomer;
    }
  }
}
