// receives array, par
// contains timer, par, gameplay area
// wrapped in gamestart, gamestartfault, gameendfault, gameend

export default function GameBox ({children}) {
    return (
        <>
            <div>
                Timer
                Par
            </div>
            <div>Gameplay Area</div>
            <div>button</div>
        </>
    )
}