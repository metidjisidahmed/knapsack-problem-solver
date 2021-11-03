export let objects =[
    {
        weight : 2,
        value : 5
    },
    {
        weight : 1,
        value :3
    },
    {
        weight :4 ,
        value :7
    },
    {
        weight :3 ,
        value :1
    },
    {
        weight :5 ,
        value :6
    },
];
export let maxCapacity = 10+1;

export  function solver(objects , maxCapacity){
    let nbObjects = objects.length;
    let P = Array(nbObjects).fill().map(()=>Array(maxCapacity).fill(0));
    for (let i = 1 ; i<= nbObjects-1 ; i++){
        for(let j = 1 ; j<= maxCapacity-1 ; j++){
            console.log(' I =', i, 'J = ', j);
            let wi=objects[i].weight;
            let vi = objects[i].value;
            if( j < wi ){
                P[i][j] = P[i - 1][j];
            }else{
                P[i][j] = Math.max(P[i - 1][j], P[i - 1][j - wi] + vi);
            }
        }
    }
    return P
}


