export default function NextButton({dispatch,answer,index,length}){
    console.log(index,length)
    if(answer===null)return null;
    return(
        <button style={{margin:"1rem"}} onClick={()=>{index!==length-1?dispatch({type:"nextQuestion"}):dispatch({type:"finished"})}}>Next</button>
    )
}