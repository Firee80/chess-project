import React, {useEffect} from 'react'
import _ from 'lodash'
import charts from 'highcharts'

export default function Chart({data}) {
    useEffect(() => {
        charts.chart('chart-container', {
            chart: {width: 600, type: 'areaspline'},
            title: false,
            yAxis: {title: {text: ''}, min: Math.floor(_.minBy(data, elo => elo.avg).avg/100)*100-100},
            xAxis: {categories: data.map(elo => elo.date)},
            legend: {align: 'center', verticalAlign: 'top'},
            series: [
                {name: 'Max ELO', data: data.map(elo => elo.max), type: 'areaspline', color: '#740979', fillOpacity: 0.75},
                {name: 'Avg ELO', data: data.map(elo => elo.avg), type: 'areaspline', fillOpacity: 0.75},
                {name: 'Min ELO', data: data.map(elo => elo.min), type: 'areaspline', fillOpacity: 0.5, fillColor: '#FFFFFF'}
            ],
        })
    }, [data])

    return (
        <div id="chart-container">Chart</div>
    )
}
