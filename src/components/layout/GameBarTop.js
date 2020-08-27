import gamebartop from '../../styles/gamebartop.module.css'

export default function GameBox ({children}) {
    const level = children[0];
    const timer = children[1];
    const par = children[2];
    console.log('gamebartop',children)
    return (
        <div>
            <div className={`${gamebartop.row} ${gamebartop.gamebar}`}>
                <h1 className={`${gamebartop.timeItem}`}>
                    Level {level}
                </h1>
                <h2 className={`${gamebartop.timeItem} ${gamebartop.timer}`}>
                    {timer}
                </h2>
                <h2 className={`${gamebartop.timeItem} ${gamebartop.par}`}>
                    Par : {par} {par !== 1 ? 'seconds' : 'second'}
                </h2>
            </div>
        </div>
    )
}