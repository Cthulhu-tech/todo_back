import { RowDataPacket } from 'mysql2';

export interface IReapeatUser extends RowDataPacket {

    id: string
    login: string
    password: string
    jwt: string

}

export interface ITodoData extends RowDataPacket {

    user_id: number
    todo_time_start: string
    todo_time_end: string
    todo_text: string

}
