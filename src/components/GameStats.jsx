import React, {useState} from 'react'
import {getChartData, getMonthGroups} from '../util'
import Player from "./Player";
import StatsTable from "./StatsTable";
import GameStatsPlayer from "./GameStatsPlayer";
import Chart from "./Chart";

export default function GameStats({player}) {
    const [selectedPlayer, setSelectedPlayer] = useState(player)
    const {monthGroups, games} = getMonthGroups({player: selectedPlayer})
    const data = getChartData({monthGroups})

    return (
        <div className='game-stats'>
            <GameStatsPlayer player={selectedPlayer} setSelectedPlayer={setSelectedPlayer} />
            <Player player={selectedPlayer} games={games} />
            <Chart data={data} />
            <StatsTable player={selectedPlayer} monthGroups={monthGroups} />
        </div>
    )
}
