import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop({required: true})
    name: string;

    @Prop({required: true, unique: true})
    dateCreated: string;

    @Prop({required: true})
    state: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);