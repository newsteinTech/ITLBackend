export class ResponseModel{

    public isValid:any;
    public data:any;
    public error:any;

    public constructor(isValid:any,data:any,error:any){

        this.isValid = isValid;
        this.data = data;
        this.error = error;

    }

    public static isValidResponse(data:any){

        return new ResponseModel(true,data,null);

    }

    public static isInValidResponse(error:any){

        return new ResponseModel(false,null,error);

    }

}
