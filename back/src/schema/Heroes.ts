import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Heroes extends Document {
    
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

export const HeroesSchema = SchemaFactory.createForClass(Heroes);