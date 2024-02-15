import User from "./user";
export default interface Message{
    Content: string ,
    CreatedAt: string ,
    Id: string ,
    IsUserSend: boolean ,
    MessageType: string ,
    Seen: boolean ,
    SupportId?: string ,
    UpdatedAt: string ,
    User: User ,
    UserId: string ,
    date: string ,
    time: string ,
    image?: string ,
}