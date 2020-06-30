import React from 'react'
import classNames from "classnames";

export default function GameStatsPlayer({player, setSelectedPlayer}) {
    return (
        <div className='game-stats__player'>
                <span
                    className={classNames({'game-stats_player--selected': player === 'firee80'})}
                    onClick={() => setSelectedPlayer('firee80')}
                >firee80</span>
            <span
                className={classNames({'game-stats_player--selected': player === 'akusammakko'})}
                onClick={() => setSelectedPlayer('akusammakko')}
            >akusammakko</span>
        </div>
    )
}
