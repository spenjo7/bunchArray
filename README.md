# Quick Description:
This JavaScript function allows elemements of an Array to be 'bunched' together into 'sections' based on a 'Logic function' which is passed in as an argument. 
  For example: Turning [1,2,3,4] into [ [1,2], [3,4] ] 

# Example Use Cases: 
1. Converting a single long array into a series of 'Tupples'
2. "Word Wrapping" data. If you have a long array of text data, you might want to 'bunch' the data at specific points and insert line breaks to make it more human readable
3. Dividing Text based on specific key words or Regular Expression Patterns.
4. Breaking Text into [n] quantity of Columns
	
	NOTE: It is possible to use the bunchArray() function on the output of another bunchArray() function. Creating columns might do this ( once to break the overall text into large chunks ( such as thirds of the original string ) and then again to break each chunk into smaller column sized sub-sections.  

# bunchArray function Parameters: 

 1. An Array* (required).
  * So far this has only been tested with Single Dimension Arrays, though it might be possible for Multi-Dimensional Arrays to be used. 
  
 2. A 'Logic function' (Optional). 
  - This function must return a boolean:
    -- On TRUE, the current array element is 'bunched' in with the current 'section' ( as defined by the 'format function' )
    -- On FALSE, the current array element starts a new 'section'

  - The Logic function will be passed the following arguments ( though it doesn't need to use all/any of them ):
    -- The Current Element from the Array
    -- The Current Section
    -- The Index of the Current Element from the Original Array
    -- The Original Array; this can be used for 'Self' type comparisons such as splitting the array into fractions
    
  - The Default Logic function always returns true
    --   const defaultLogicFunc = ( x, y, i ) => { return true }

# Code Examples:


    bunchArray([1,2,3,4,5,6]) 
        // returns: [21]
            /// No bunching into sections occurs

    bunchArray([1,2,3,4,5,6], (x,y,i) => i%2 )
        // returns: [   [1, 2], [3, 4], [5, 6]  ]
            /// Bunches when the INDEX value is a multiple of 2 

    bunchArray([1,2,3,4,5,6,7,8,9,10,11,12,13], (x,y,i,r) => y.length < Math.ceil(r.length/3) )
    // returns: [ [1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13]   ]
        /// Bunches into an 'nth' of the overall array size  
 
    bunchArray([1,2,3,4,5,6], (x) => x%5 )
        // returns [    [1, 2, 3, 4], [5, 6]    ]
            /// Bunches when the ELEMENT value is a multiple of 5
 
    bunchArray(['see','spot','run', 'he', 'is', 'so', 'very', 'fast' ], (x,y,i) => (x.length + y.join().length) < 8 )  
        // returns: [    ["see", "spot"], ["run", "he"], ["is", "so"], ["very"], ["fast"]    ]
            /// Bunches if adding the current element to the section would exceed 8 characters

    bunchArray(['see','spot','run', 'he', 'is', 'so', 'very', 'fast' ], (x,y,i) => /^[^s]/i.test(x) )
        // returns: [   ["see"], ["spot", "run", "he", "is"], ["so", "very", "fast"] ]
            /// Bunches on words that start with an 's'        

    bunchArray( 
        ['see','spot','run', 'he', 'is', 'so', 'very', 'fast', 'today' ], 
        (x,y,i,r) =>  y.join().length < Math.ceil( r.join().length / 2 ) 
    )

        // Returns: [ ["see", "spot", "run", "he", "is", "so"],["very", "fast", "today"]    ]
            /// Bunches on an 'nth' of the total text characters 
                // // Usefull for converting Blocks of Text into Columns
