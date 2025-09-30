import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlanesService } from './planes.service';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { UpdatePlaneDto } from './dto/update-plane.dto';

@ApiTags('Planes')
@Controller('planes')
export class PlanesController {
  constructor(private readonly planesService: PlanesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new plane' })
  @ApiResponse({
    status: 201,
    description: 'The plane has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  create(@Body() createPlaneDto: CreatePlaneDto) {
    return this.planesService.create(createPlaneDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all planes' })
  @ApiResponse({ status: 200, description: 'Return all planes.' })
  findAll() {
    return this.planesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a plane by ID' })
  @ApiResponse({ status: 200, description: 'Return the plane.' })
  @ApiResponse({ status: 404, description: 'Plane not found.' })
  findOne(@Param('id') id: string) {
    return this.planesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a plane' })
  @ApiResponse({
    status: 200,
    description: 'The plane has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Plane not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  update(@Param('id') id: string, @Body() updatePlaneDto: UpdatePlaneDto) {
    return this.planesService.update(id, updatePlaneDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a plane' })
  @ApiResponse({
    status: 200,
    description: 'The plane has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Plane not found.' })
  remove(@Param('id') id: string) {
    return this.planesService.remove(id);
  }
}
