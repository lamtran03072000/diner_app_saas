import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organizations.schema';
import { CreateOrganizationDto, OrganizationsListResponseDto } from './dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

describe('OrganizationsService', () => {
  let service: OrganizationsService;
  let mockModel: any;

  beforeEach(async () => {
    const mockSave = jest.fn().mockResolvedValue({
      _id: '507f1f77bcf86cd799439011',
      name: 'Test Org',
      emailBling: 'test@example.com',
      plan: 'basic',
      isActive: true,
      createdAt: new Date(),
      createdBy: '507f1f77bcf86cd799439012',
      updatedAt: new Date(),
      updatedBy: '507f1f77bcf86cd799439012',
    });

    const mockFind = {
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([
        {
          _id: '507f1f77bcf86cd799439011',
          name: 'Test Org',
          emailBling: 'test@example.com',
          plan: 'basic',
          isActive: true,
          createdAt: new Date(),
          createdBy: '507f1f77bcf86cd799439012',
          updatedAt: new Date(),
          updatedBy: '507f1f77bcf86cd799439012',
        },
      ]),
    };

    const mockCountDocuments = {
      exec: jest.fn().mockResolvedValue(1),
    };

    mockModel = jest.fn().mockImplementation(() => ({
      save: mockSave,
    }));

    mockModel.find = jest.fn().mockReturnValue(mockFind);
    mockModel.countDocuments = jest.fn().mockReturnValue(mockCountDocuments);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        {
          provide: getModelToken(Organization.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an organization', async () => {
      const createDto: CreateOrganizationDto = {
        name: 'Test Org',
        emailBling: 'test@example.com',
        plan: 'basic',
        isActive: true,
      };

      const userId = '507f1f77bcf86cd799439012';

      const result = await service.create(createDto, userId);

      expect(result).toBeDefined();
      expect(result.name).toBe(createDto.name);
      expect(result.emailBling).toBe(createDto.emailBling);
      expect(result.plan).toBe(createDto.plan);
      expect(result.isActive).toBe(createDto.isActive);
      expect(result.createdBy).toBe(userId);
      expect(result.updatedBy).toBe(userId);
    });
  });

  describe('findAll', () => {
    it('should return paginated list of organizations', async () => {
      const paginationDto: PaginationDto = {
        page: 1,
        limit: 20,
      };

      const result = await service.findAll(paginationDto);

      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
      expect(result.totalPages).toBe(1);
    });

    it('should handle custom pagination parameters', async () => {
      const paginationDto: PaginationDto = {
        page: 2,
        limit: 10,
      };

      await service.findAll(paginationDto);

      expect(mockModel.find).toHaveBeenCalled();
      expect(mockModel.countDocuments).toHaveBeenCalled();
    });
  });
});
