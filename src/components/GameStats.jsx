import React, {useEffect, useState} from 'react'
import _ from 'lodash'
import classnames from 'classnames'
import charts from 'highcharts'
import {getChartData, getMonthGroups} from '../util'
import Player from "./Player";
import StatsTable from "./StatsTable";

export default function GameStats({player}) {
    const [selectedPlayer, setSelectedPlayer] = useState('firee80')
    const {monthGroups} = getMonthGroups({player: selectedPlayer})
    const elos = getChartData({player: selectedPlayer, monthGroups})

    useEffect(() => {
        charts.chart('chart-container', {
            chart: {width: 600, type: 'areaspline'},
            title: false,
            yAxis: {title: {text: ''}, min: Math.floor(_.minBy(elos, elo => elo.avg).avg/100)*100-100},
            xAxis: {categories: elos.map(elo => elo.date)},
            legend: {align: 'center', verticalAlign: 'top'},
            series: [
                {name: 'Max ELO', data: elos.map(elo => elo.max), type: 'areaspline', color: '#740979', fillOpacity: 0.75},
                {name: 'Avg ELO', data: elos.map(elo => elo.avg), type: 'areaspline', fillOpacity: 0.75},
                {name: 'Min ELO', data: elos.map(elo => elo.min), type: 'areaspline', fillOpacity: 0.5, fillColor: '#FFFFFF'}
            ],
        })
    })

    return (
        <div className='game-stats'>
            <div className='game-stats__player'>
                <span
                    className={classnames({'game-stats_player--selected': selectedPlayer === 'firee80'})}
                    onClick={() => setSelectedPlayer('firee80')}
                >firee80</span>
                <span
                    className={classnames({'game-stats_player--selected': selectedPlayer === 'akusammakko'})}
                    onClick={() => setSelectedPlayer('akusammakko')}
                >akusammakko</span>
            </div>
            <Player player={selectedPlayer} />
            <figure>
                <div id="chart-container">Chart</div>
            </figure>
            <StatsTable player={selectedPlayer} monthGroups={monthGroups}/>
        </div>
    )
}
