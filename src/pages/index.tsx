import React from 'react'
import { env } from '~/env'

const install = () => {
  return (
    <a style={{
        textDecoration: 'underline',
        color: 'blue',
    }} href={`javascript:var url="${env.NEXT_PUBLIC_APP_URL}/dashboard?"+window.location.href,p=window.open(url,"popUpWindow","height=500,width=400,left=100,top=100,resizable=no,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes");function Whisper(e){Send("whisper",e);}function Send(e,n){p.postMessage({name:e,content:n},url);}function Received({name:e,content:n}){let t="Error: Unknown command";try{switch(e){case"GET":t=document.querySelector(n).outerHTML;break;case"EXEC":t=Evaluate(n);}}catch(e){console.error(e);t=e;}Send(e,t);}function Evaluate(e){var n=document.createElement("script");n.innerHTML=e;document.body.insertAdjacentElement("beforeend",n);return"Script executed successfully.";}window.addEventListener("message",({data:e})=>{if(e.hasOwnProperty("name")&&e.hasOwnProperty("content")){Received(e);}});`}>Control Panel</a>
  )
}

export default install