//  function mul(val){
//     if(typeof val =='undefined') return ;
//     function nextmul(nextval){
//         if(typeof nextvalval =='undefined') return val;
//         val=val*nextval;
//         return nextmul;
//     }
//     return nextmul;
//  }

function mul(x){
    function cuury(y){
        if(typeof y ==='undefined') return x;
        else{
            return cuury(x*y);
        }
    }
    return cuury;
}

 x=mul(2)(4)(6);
 console.log(x);