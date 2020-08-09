import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;

const schema = new Schema({
    email: String,
    is_suspended: {
        type: Boolean,
        default: false
    }
    
});

export default mongoose.model('users', schema);