import React from 'react'
import {getPlayerGames, getAverage, getWhiteBlackAverage} from "../util";

function getTitle({whiteAvg, blackAvg}) {
    return `White: ${whiteAvg}, Black: ${blackAvg}`
}

export default function StatsRow({games, date, player}) {
    const playerGames = getPlayerGames({player, games})
    const resultAvgs = getWhiteBlackAverage({array: playerGames, property: 'result'})
    const percentageAvgs = getWhiteBlackAverage({array: playerGames, property: 'percentage', multipleByHundred: false})
    const ratingAvg = getAverage({array: playerGames, property: 'rating', multipleByHundred: false})

    return (
        <div className='stats-table__row'>
            <div className="stats-table__row-column">{date}</div>
            <div className="stats-table__row-column">{playerGames.length}</div>
            <div className="stats-table__row-column" title={getTitle(resultAvgs)}>{resultAvgs.totalAvg}</div>
            <div className="stats-table__row-column" title={getTitle(percentageAvgs)}>{percentageAvgs.totalAvg}</div>
            <div className="stats-table__row-column">{ratingAvg}</div>
        </div>
    )
}