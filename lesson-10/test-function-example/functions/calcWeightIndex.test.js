import calcWeightIndex from "./calcWeightIndex.js";

/*
1. Given height in metr and weight in kg.
2. Return weight / (height * height) round to 2.
3. If given invalid arguments throw error with correct message.

1.9, 90 => 24.93
90, 1.9 => error with message 'height must be first argument and weight - second'
190, 90 => error with message 'height must be in metr'
-1.9, -90 => error with message 'height and weight must be greate then 0'
 => error with message 'height and weight required'
'1.9', '90' => error with message 'height and weight must be number'
 */

describe("test calcWeightIndex function", ()=> {
    test("1.9, 90 => 24.93", ()=> {
        const result = calcWeightIndex(1.9, 90);
        expect(result).toBe(24.93);
        /*
        const expect = result => {
            return {
                result,
                toBe(value) {
                    if(value === this.result) {
                        inform jest test passed
                    }
                    inform jest test failed
                }
            }
        }
        */
    })

    test("90, 1.9 => error with message 'height must be first argument and weight - second'", ()=> {
        expect(()=> calcWeightIndex(90, 1.9)).toThrow('height must be first argument and weight - second');
    })

    it("190, 90 => error with message 'height must be in metr'", ()=> {
        expect(()=> calcWeightIndex(190, 90)).toThrow('height must be in metr')
    })

    test("-1.9, -90 => error with message 'height and weight must be greate then 0'", ()=> {
        expect(()=> calcWeightIndex(-1.9, -90)).toThrow('height and weight must be greate then 0')
    })

    test(" => error with message 'height and weight required'", ()=> {
        expect(()=> calcWeightIndex()).toThrow('height and weight required')
    })

    test("'1.9', '90' => error with message 'height and weight must be number'", ()=> {
        expect(()=> calcWeightIndex('1.9', '90')).toThrow('height and weight must be number')
    })
})