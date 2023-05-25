import { Controller, Get, HttpCode, HttpStatus, Param, Post, RawBodyRequest, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { PaymentService } from './payment.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('/:productId')
    async startPaymentProcess(@Req() request: Request, @Param('productId') productId: number){
        return await this.paymentService.startPaymentProcess(request, productId);
    }

    @Post('feedback')
    @HttpCode(HttpStatus.OK)
    async handlePaymentProcessFeedback(@Req() request: RawBodyRequest<Request>){
        return await this.paymentService.handlePaymentProcessFeedback(request);
    }
}
