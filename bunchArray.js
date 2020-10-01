/*
2020-10-01: [v1.1]  Removing the formating options
    -- The sole focus should be splitting data; formating can be handled elsewhere.
    -- Updated the Examples and added some new ones

2020-09-30: [v1.0] Original Creation (stable)
*/

let bunchArray = (arr = [], logicFunc = null ) => { 
    logicFunc = logicFunc?? ( () => { return true } )
    
    let output = []
    let section = null

    arr.forEach( (el,ind) => {
        if(!section){ section = [el] } 
        else if( logicFunc( el, section, ind ) ){
            section.push(el) 
        } else {
            output.push(section)
            section = [el]
        }
    })
    
    output.push(section) // need to shore up the last section
    return output
}

/* //EXAMPLES: 
console.log(

    bunchArray([1,2,3,4,5,6]) 
        // returns: [21]
            /// No bunching into sections occurs
,
    bunchArray([1,2,3,4,5,6], (x,y,i) => i%2 )
        // returns: [3, 7, 11] 
            /// Bunches when the INDEX value is a multiple of 2 
, 
    bunchArray([1,2,3,4,5,6], (x) => x%5 )
        // returns [    [1, 2, 3, 4], [5, 6]    ]
            /// Bunches when the ELEMENT value is a multiple of 5
, 
    bunchArray(['see','spot','run', 'he', 'is', 'so', 'very', 'fast' ], (x,y,i) => (x.length + y.join().length) < 8 )  
        // returns: [    ["see", "spot"], ["run", "he"], ["is", "so"], ["very"], ["fast"]    ]
            /// Bunches if adding the current element to the section would exceed 8 characters
,
    bunchArray(['see','spot','run', 'he', 'is', 'so', 'very', 'fast' ], (x,y,i) => /^[^s]/i.test(x) )
        // returns: [   ["see"], ["spot", "run", "he", "is"], ["so", "very", "fast"] ]
            /// Bunches on words that start with an 's'        
)
*/