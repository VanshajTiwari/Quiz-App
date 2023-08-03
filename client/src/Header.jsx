import reactLogo from './assets/react.svg'
export default function Header(){
    return(
        <header className="app-header">
            <img src={reactLogo} alt="React"/>
            <h1>The React Quiz</h1>
        </header>
    )
}