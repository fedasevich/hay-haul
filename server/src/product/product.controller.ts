import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AllowedRoles } from 'src/lib/decorators/roles-auth.decorator';
import { AuthenticatedRequest } from 'src/lib/types/user.request.type';
import { UserRole } from 'src/user/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@UseGuards(JwtAuthGuard)
@AllowedRoles(UserRole.Farmer)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/filter')
  async filter(
    @Query() query: ProductQueryDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.productService.filterAll(query, request);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.findOne(id);
  }

  @Post('/facility/:facilityId/productType/:productTypeId')
  async create(
    @Param('facilityId', ParseUUIDPipe) facilityId: string,
    @Param('productTypeId', ParseUUIDPipe) productTypeId: string,
    @Body() dto: CreateProductDto,
  ) {
    return this.productService.create({ dto, facilityId, productTypeId });
  }

  @Put('/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.productService.update(id, updateProductDto, request);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.remove(id);
  }
}
