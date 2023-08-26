let arr=[22,34,84,67,89,84];

arr.forEach((item,ind,arr)=>{
    if(item==56){
        arr[ind]++;
    }
})

console.log(arr);