import { error } from "console";

class APIError{
    message:string;
    code: number;

    constructor(message:string,code:number)
    {
        this.message=message;
        this.code=code;
    }
    static badRequest(message:string="Bad Request")
    {
        return new APIError(message,400);
    }
    static NotFound(message:string= "Not Found")
    {
        return new APIError(message,404);
    }
    static Unauthorized(message:string="Unauthorized")
    {
        return new APIError(message,401);
    }
    static internalServerError(message:string="Something Went Wrong")
    {
        console.log(error)
        return new APIError(message,500);
    }
    static PaymentRequired(message:string="Payment Not Yet Done!")
    {
        return new APIError(message,402);
    }
    static RequestTimeout(message:string="Request Timeout")
    {
        return new APIError(message,408);
    }
    static NetworkAuthenticationRequired(message:string="Network Error!")
    {
        return new APIError(message,511);
    }
}

export default APIError;
