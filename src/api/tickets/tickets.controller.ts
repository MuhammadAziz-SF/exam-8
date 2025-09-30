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
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiResponse({
    status: 201,
    description: 'The ticket has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tickets' })
  @ApiResponse({ status: 200, description: 'Return all tickets.' })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a ticket by ID' })
  @ApiResponse({ status: 200, description: 'Return the ticket.' })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a ticket' })
  @ApiResponse({
    status: 200,
    description: 'The ticket has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ticket' })
  @ApiResponse({
    status: 200,
    description: 'The ticket has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }
}
