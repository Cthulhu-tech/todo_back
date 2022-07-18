import { RowDataPacket } from 'mysql2';

export interface IReapeatUser extends RowDataPacket {

    id: string
    login: string
    password: string
    jwt: string

}