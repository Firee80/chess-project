import React from 'react'
import _ from 'lodash'
import StatsRow from "./StatsRow";

export default function StatsTable({player, monthGroups}) {
    const dates = _.orderBy(Object.keys(monthGroups)).reverse()

    return (
        <section className='stats-table'>
            <header className='stats-table__header'>
                <div className="stats-table__header-column">Aika</div>
                <div className="stats-table__header-column">Pelit</div>
                <div className="stats-table__header-column">Voitto %</div>
                <div className="stats-table__header-column">Siirto %</div>
                <div className="stats-table__header-column">Pisteet</div>
            </header>
            {dates && _.map(dates, date => <StatsRow games={monthGroups[date]} date={date} player={player} key={date}/>)}
        </section>
    )
}
