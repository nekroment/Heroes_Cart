import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Hero extends Document {

    @Prop()
    _id: string;
    
    @Prop()
    nickname: string;

    @Prop()
    real_name: string;

    @Prop()
    origin_description: string;

    @Prop()
    catch_phrase: string;

    @Prop()
    image: string;
}

export const HeroSchema = SchemaFactory.createForClass(Hero);