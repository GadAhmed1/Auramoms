// models/Payment.js
import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    orderID: { type: String, required: true },
    payerID: { type: String, required: true },
    paymentID: { type: String, required: true },
    paymentSource: { type: String, required: true },
    billingToken: { type: String, default: null },
    status: { type: String, required: true },
    payer: {
        name: {
            given_name: { type: String, required: true },
            surname: { type: String, required: true },
        },
        email_address: { type: String, required: true },
        address: {
            country_code: { type: String, required: true },
        },
    },
    purchase_units: { type: Array, default: [] },
    create_time: { type: Date, required: true },
    update_time: { type: Date, required: true },
}, { timestamps: true });

const Payment = mongoose.model('Payment', PaymentSchema) || mongoose.models.payment;

export default Payment;
