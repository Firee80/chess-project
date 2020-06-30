import React from 'react'
import {getAverage, getWhiteBlackAverage} from "../util";

function getTitle({whiteAvg, blackAvg}) {
    return `White: ${whiteAvg}, Black: ${blackAvg}`
}

export default function StatsRow({games, date}) {
    const resultAvgs = getWhiteBlackAverage({array: games, property: 'result'})
    const percentageAvgs = getWhiteBlackAverage({array: games, property: 'percentage', multipleByHundred: false})
    const ratingAvg = getAverage({array: games, property: 'rating', multipleByHundred: false})

    return (
        <div className='stats-table__row'>
            <div className="stats-table__row-column">{date}</div>
            <div className="stats-table__row-column">{games.length}</div>
            <div className="stats-table__row-column" title={getTitle(resultAvgs)}>{resultAvgs.totalAvg}</div>
            <div className="stats-table__row-column" title={getTitle(percentageAvgs)}>{percentageAvgs.totalAvg}</div>
            <div className="stats-table__row-column">{ratingAvg}</div>
        </div>
    )
}