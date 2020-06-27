import React, {useEffect} from 'react'
import _ from 'lodash'
import charts from 'highcharts'
import {getChartData, getMonthGroups} from '../util'
import Player from "./Player";
import StatsTable from "./StatsTable";

export default function GameStats({player}) {
    const {monthGroups} = getMonthGroups({player})
    const elos = getChartData({player, monthGroups})

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
            <Player player={player} />
            <figure>
                <div id="chart-container">Chart</div>
            </figure>
            <StatsTable player={player} monthGroups={monthGroups}/>
        </div>
    )
}
