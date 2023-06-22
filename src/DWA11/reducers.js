const reservationHistory = (oldCounterValue = [], action) => {
if(action.type === "ADD_A_VALUE"){
    console.log(counterValue);
    return [...oldCounterValue, action.payload];
}else if (action.type === "SUB_A_VALUE"){
    return oldCounterValue.filter(record => {return record !== action.payload.name;
    })
}
    
};
 const resetHistory = 

