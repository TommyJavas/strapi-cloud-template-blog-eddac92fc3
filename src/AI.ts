import { OpenRouter } from "@openrouter/sdk";


const openrouter = new OpenRouter({

  apiKey: process.env.OPENROUTER_API_KEY

});


export async function askAI(message:string){


try{


const result:any = await openrouter.chat.send({

chatRequest:{


model:"cohere/north-mini-code:free",


messages:[

{
role:"system",
content:"你是网站AI助手，请用中文回答,简洁回答"
},

{
role:"user",
content:message
}

],


stream:false


}


});



console.log("AI返回:",result);



return (

result?.choices?.[0]?.message?.content

||

"AI没有生成回复"

);



}catch(error){


console.error("AI错误:",error);


return "AI连接失败";


}



}