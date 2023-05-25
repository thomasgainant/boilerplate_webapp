import { HttpException, HttpStatus, Injectable, RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stripe } from 'stripe';
import * as dayjs from 'dayjs';
import { Payment } from './entity/payment.entity';
import { Product } from '../product/entity/product.entity';
import { env } from 'src/environment';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class PaymentService {
    stripe;
    
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ){
        this.stripe = new Stripe(env.paymentSecretKey, {
            apiVersion: env.paymentApiVersion
        });
    }

    async startPaymentProcess(request:Request, productId:number){
        let product = await this.productRepository.findOne({
            where: {
                id: productId
            }
        });

        let user;
        user = await this.userRepository.findOne({
            where: {
                name: (request as any).user.name
            }
        });
        if(!user)
            throw new HttpException('Invalid user.', HttpStatus.INTERNAL_SERVER_ERROR);

        if(product){
            let newPayment = new Payment();
            newPayment.parent = user;
            newPayment.product = product;
            newPayment.amount = product.price;
            newPayment.createDate = dayjs().unix();
            newPayment.status = Payment.Status.CREATED;
            newPayment = await this.paymentRepository.save(newPayment);

            if(newPayment){
                const session = await this.stripe.checkout.sessions.create({
                    line_items: [
                    {
                        price: product.payment_priceId,
                        quantity: 1,
                    },
                    ],
                    mode: 'payment',
                    success_url: env.paymentSuccessURL+"/"+newPayment.id,
                    cancel_url: env.paymentCancelURL+"/"+newPayment.id,
                });

                newPayment.payment_sessionId = session.id;
                newPayment = await this.paymentRepository.save(newPayment);

                return session.url;
            }
            else{
                throw new HttpException('Internal error while creating your payment.', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        
        throw new HttpException('Product does not exist.', HttpStatus.NOT_FOUND);
    }

    async handlePaymentProcessFeedback(request:RawBodyRequest<Request>){
        const sig = request.headers['stripe-signature'];
        const endpointSecret = env.paymentFeedbackEndpointSecret;

        let event;
        try {
            event = this.stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
        } catch (err) {
            console.error(err.message);
            throw new HttpException(`Webhook Error: ${err.message}`, HttpStatus.BAD_REQUEST);
        }

        if(event.type){
            const session = event.data.object;

            if(!session.id){
                console.error(`Webhook Error: no payment session id for this payment process.`);
                throw new HttpException(`Webhook Error: could not finish this payment process.`, HttpStatus.BAD_REQUEST);
            }

            let payment = await this.paymentRepository.findOne({
                where: {
                    payment_sessionId: session.id
                }
            });
            if(!payment){
                console.error(`Webhook Error: could not finish the payment process with payment session id ${session.id}.`);
                throw new HttpException(`Webhook Error: could not finish this payment process.`, HttpStatus.BAD_REQUEST);
            }

            switch (event.type) {
                case 'checkout.session.completed':                
                    //Marked as 'awaiting payment'
                    await this.markPaymentAsConfirmedAndAwaiting(payment);
                
                    //Check if the order is paid (for example, from a card payment)
                    //A delayed notification payment will have an `unpaid` status, as
                    //you're still waiting for funds to be transferred from the customer's
                    //account.
                    if (session.payment_status === 'paid') {
                        await this.markPaymentAsFullfilled(payment);
                    }        
                break;            
                case 'checkout.session.async_payment_succeeded':
                    await this.markPaymentAsFullfilled(payment);        
                break;            
                case 'checkout.session.async_payment_failed':
                    await this.markPaymentAsFailed(payment);        
                break;
            }
        }
    }

    private async markPaymentAsConfirmedAndAwaiting(payment:Payment){
        payment.status = Payment.Status.AWAITING;
        await this.paymentRepository.save(payment);
    }

    private async markPaymentAsFullfilled(payment:Payment){
        payment.status = Payment.Status.PAID;
        await this.paymentRepository.save(payment);
    }

    private async markPaymentAsFailed(payment:Payment){
        payment.status = Payment.Status.FAILED;
        await this.paymentRepository.save(payment);
    }
}
