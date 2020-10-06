import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema } from '@nestjs/mongoose';

@Schema()
export class Limit extends Document {

    @Prop()
    limit: number;

    @Prop()
    skip: number;

}

export const LimitSchema = SchemaFactory.createForClass(Limit);