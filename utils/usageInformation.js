export const getConsumption=(reading)=>{
    return reading.reduce((acc,reading)=>{
        return acc+reading.value;
    },0)
    // let sum=0;
    // return reading.map(({value})=>value).reduce((acc,val)=>acc+val,0);
    // for (let i = 0; i < reading.length; i++) {
    //     sum+=reading[i].value;
    // }
    // return sum;
}
export const getCost=(consumption)=>{
    return Math.round(consumption* 0.138);
}
export const getFootPrint=(consumption)=>{
    return (consumption * 0.0002532).toFixed(4);
}
