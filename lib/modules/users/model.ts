import { ModificationNote } from "../common/model";

export interface IStudent {
    _id?: String;
    email: String;
    is_suspended?: Boolean;
    modification_notes?: ModificationNote[]
}

export const IStudent = {
    email: String,
    is_suspended: Boolean
}