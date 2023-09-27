import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDocument } from './schemas/tasks.schemas';
import { Task } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectUnsubscribedError } from 'rxjs';

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task.name) private taskModel: 
  Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto) {
    const createUser = new this.taskModel(createTaskDto);
    return await createUser.save();
  }

  findAll(): Promise<TaskDocument[]> {
    return this.taskModel.find().exec();
  }

  findOne(id: string): Promise<TaskDocument> {
    return this.taskModel.findById(id).exec();
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskDocument> {
    return this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, {new: true})
      .exec();
  }

  remove(id: string): Promise<TaskDocument> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
