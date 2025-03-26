import userTable from "./user.js";
import vendorTable from "./vendor.js";

class entityManager{
    constructor(){
        userTable();
        vendorTable();
    }
}

export default entityManager;