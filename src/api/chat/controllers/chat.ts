import { askAI } from "../../../AI";


export default {


async chat(ctx){


try{


const {message}=ctx.request.body;


console.log("收到:",message);



const reply = await askAI(message);



ctx.body={

reply

};



}catch(error){


console.log(error);


ctx.status=500;


ctx.body={

reply:"AI错误"

};


}


}


}