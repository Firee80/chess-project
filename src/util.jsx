import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import _ from 'lodash'
import {chessGames} from './chess-games'

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

function getLocalStorageGameData() {
    if (chessGames) {
        return chessGames
    }

    const data = window.localStorage.getItem('chessGames')
    return data ? JSON.parse(data) : {}
}

export function getMonthGroups({player}) {
    const existingData = getLocalStorageGameData()
    const games = existingData[player.toLowerCase()]
    const dates = Object.keys(games).map(key => games[key].white.date)
    const monthGroups = _.groupBy(games, game => moment(game.white.date, 'YYYY-MM-DD').startOf('month').format('YYYY-MM'))

    return {
        firstDate: _.min(dates),
        lastDate: _.max(dates),
        monthGroups
    }
}

export function getChartData({player, monthGroups}) {
    const dates = _.orderBy(Object.keys(monthGroups))
    return dates.map(date => {
        const games = monthGroups[date]
        const all = games.map(game => [game.white, game.black]).flat()
        const playerGames = all.filter(game => game.player.toLowerCase() === player)
        const elos = playerGames.map(game => game.rating)
        const elo = _.sum(elos)/elos.length

        return {
            avg: Math.floor(elo),
            max: _.max(elos),
            min: _.min(elos),
            date
        }
    })
}

export function getPlayerGames({player, games}) {
    const allGames = Object.keys(games).map(key => [games[key].white, games[key].black]).flat()
    return allGames.filter(game => game.player.toLowerCase() === player)
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

export function getPlayerData({player}) {
    const existingData = getLocalStorageGameData()
    const games = existingData[player.toLowerCase()]
    const playerGames = getPlayerGames({player, games})

    return {
        games: playerGames.length,
        winPercentAvg: getAverage({array: playerGames, property: 'result'}),
        percentageAvg: getAverage({array: playerGames, property: 'percentage', multipleByHundred: false})
    }
}