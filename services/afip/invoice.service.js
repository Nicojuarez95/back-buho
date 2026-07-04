import afipAuthService from "./auth.service.js";

class InvoiceService{

    async createInvoice(data){

        const token = await afipAuthService.login();

        console.log(token);

        console.log(data);

        return {
            success:true
        }

    }

}

export default new InvoiceService();