const calcWeightIndex = (height, weight)=> {
    if(height === undefined || weight === undefined) {
        throw new Error('height and weight required');
    }

    if(typeof height !== "number" || typeof weight !== "number") {
        throw new Error('height and weight must be number')
    }

    if(height <= 0 || weight <= 0) {
        throw new Error('height and weight must be greate then 0')
    }
 
    if(height > 3 && weight > 3) {
        throw new Error('height must be in metr');
    }
    if(height > weight) {
        throw new Error('height must be first argument and weight - second');
    }

    const result = weight / (height ** 2);
    return Number(result.toFixed(2));
}

export default calcWeightIndex;