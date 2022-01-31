
export function setDelay(fn:()=>any){
    setTimeout(() => {
       fn()
      }, 1);
} 