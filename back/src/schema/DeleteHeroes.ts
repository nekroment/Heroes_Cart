import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class DeleteHeroes extends Document {
    
    @Prop()
    _id: string

    @Prop()
    image: string;
}

export const DeleteHeroesSchema = SchemaFactory.createForClass(DeleteHeroes);