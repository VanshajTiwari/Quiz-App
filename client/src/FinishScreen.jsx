export default function FinishScreen({Score,points,maxPoints,dispatch}){
    const percentage=(points/maxPoints)*100;
    return(
        <>
        <p>
            You Scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
        </p>
        <h1>Highscore: {Score}</h1>
        <button onClick={()=>dispatch({type:"restart"})}>Restart</button>
        </>
    )
}