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
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@ApiTags('Classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new travel class' })
  @ApiResponse({
    status: 201,
    description: 'The class has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all travel classes' })
  @ApiResponse({ status: 200, description: 'Return all classes.' })
  findAll() {
    return this.classesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a travel class by ID' })
  @ApiResponse({ status: 200, description: 'Return the class.' })
  @ApiResponse({ status: 404, description: 'Class not found.' })
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a travel class' })
  @ApiResponse({
    status: 200,
    description: 'The class has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Class not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(id, updateClassDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a travel class' })
  @ApiResponse({
    status: 200,
    description: 'The class has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Class not found.' })
  remove(@Param('id') id: string) {
    return this.classesService.remove(id);
  }
}
