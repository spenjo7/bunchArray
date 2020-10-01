let bunchArray = (arr = [], logicFunc = null, formatFunc = null, finalFunc = null ) => {
    const defaultLogicFunc = ( x, y, i ) => { return true }
    const defaultFormatFunc = ( z, c, i ) => { return c == null? z : c + z }
    const defaultFinalFunc = ( arr ) => { return arr }    

    logicFunc = logicFunc?? defaultLogicFunc
    formatFunc = formatFunc?? defaultFormatFunc 
    finalFunc = finalFunc??  defaultFinalFunc

    let output = []
    let current = null

    arr.forEach( (el,ind) => {
        if(!current){ current = el } 
        else if( logicFunc(el,current,ind) ){
             current = formatFunc( el, current, ind )   
        } else {
            output.push(formatFunc(current))
            current = el
        }
    })
    output.push(formatFunc(current,null))
    return finalFunc(output.flat(1))
}

/* //EXAMPLES: 
console.log(

	bunchArray([1,2,3,4,5,6]) 
		// returns:	[21]
,
	bunchArray([1,2,3,4,5,6], (x,y,i)=>i%2 )
		// returns:	[3, 7, 11] 

,
	bunchArray([1,2,3,4,5,6], (x,y,i)=>i%2, (z,c,i)=>c?[c,z]:[z] )
		// returns:	[	[1, 2], [3, 4], [5, 6]	]

,
	bunchArray([1,2,3,4,5,6], (x,y,i)=>i%2, (z,c,i)=>c?[c,z]:[z], (r)=> r.map( el => el.join('<>') ) )
		// returns: [ "1<>2", "3<>4", "5<>6" ] 
,	
	bunchArray([1,2,3,4,5,6], (x,y,i)=>i%2, (z,c,i)=>c?[c,z]:[z], (r)=> r.map( el => el.join('<>') ).join('@') )
		// returns: "1<>2@3<>4@5<>6"

)
*/