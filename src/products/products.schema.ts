import { Schema, Prop } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
const options: SchemaOptions = {
  timestamps: true,
}

// @Schema(options)
// export class Product extends Document {
//   @Prop()
//   name: string;

//   @Prop()

// }