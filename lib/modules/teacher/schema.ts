import * as mongoose from 'mongoose';
import { IStudent } from '../users/model';

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    email: String,
    students: [{ type: Schema.Types.ObjectId, ref: 'users' }]
});

export default mongoose.model('teachers', teacherSchema);