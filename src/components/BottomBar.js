import React from 'react'

export const BottomBar = props => {
    return (
        <div className="bottomBar">
            { props.canRestart &&
                <button className="restartButton" onClick={() => props.restart()}>
                    Restart
                </button>
            }

            { props.canNext && 
                <button className="nextButton" onClick={() => props.next()}>
                    Next
                </button>
            }
        </div>
    )
}
