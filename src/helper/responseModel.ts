export class ResponseModel{
    isValid: boolean
    data: any
    errors: any
 
    constructor(isValid: boolean, data: any, errors: any){
 
     this.isValid= isValid;
     this.data= data;
     this.errors= errors;
    }
 
    public static getValidResponse(data: any){
      return new ResponseModel(true, data, null)
    }
    public static getInvalidResponse(errors: any){
     return new ResponseModel(false, null, errors)
   }
 
 }