import mongoose from 'mongoose';
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  company: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
 const Customer = mongoose.model('Customer', customerSchema);

 export default Customer;