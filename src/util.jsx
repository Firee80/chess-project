import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import {akusammakko} from "./akusammakko"
import {firee80} from "./firee80"

export function renderElement({container, existingSelector, Element, params = {}}) {
    const existingNode = container.querySelector(existingSelector)
    const child = document.createElement("div")

    if (!existingNode) {
        container.appendChild(child)
    }

    ReactDOM.render(<Element {...params}/>, existingNode ? existingNode : child)
}

export function renderComponent({check = () => true, container, Element, params}) {
    check() && renderElement({container, Element, params})
}

export function getMonthGroups({player}) {
    switch (player) {
        case 'firee80':
            return firee80
        case 'akusammakko':
            return akusammakko
        default:
            return {}
    }
}

export function getChartData({monthGroups}) {
    const dates = _.orderBy(Object.keys(monthGroups))
    return dates.map(date => {
        const games = monthGroups[date]
        const elos = games.map(game => game.rating)
        const elo = _.sum(elos)/elos.length

        return {
            avg: Math.floor(elo),
            max: _.max(elos),
            min: _.min(elos),
            date
        }
    })
}

export function getAverage({array, property, multipleByHundred = true}) {
    const items = _.filter(array, item => !_.isUndefined(item[property]))
    const sum = _.sumBy(items, item => item[property])/items.length
    const multiplier = multipleByHundred ? 100 : 1
    return Math.floor(sum * multiplier)
}

export function getWhiteBlackAverage({array, property, multipleByHundred = true}) {
    const whiteGames = array.filter(item => item.color === 'white')
    const blackGames = array.filter(item => item.color === 'black')

    return {
        whiteAvg: getAverage({array: whiteGames, property, multipleByHundred}),
        blackAvg: getAverage({array: blackGames, property, multipleByHundred}),
        totalAvg: getAverage({array, property, multipleByHundred})
    }
}

export function getPlayerData({games}) {
    const ids = Object.keys(games)
    const array = _.map(ids, id => games[id])

    return {
        gameCount: ids.length,
        winPercentAvg: getAverage({array, property: 'result'}),
        percentageAvg: getAverage({array, property: 'percentage', multipleByHundred: false})
    }
}
