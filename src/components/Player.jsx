import React from 'react'
import {getPlayerData} from "../util";

export default function Player({player}) {
    const {games, winPercentAvg, percentageAvg} = getPlayerData({player})

    return (
        <div className='player'>
            <div className='player__block'>
                <div className='player__block-image-container'>
                    <img  className='player__block-image' src='player.png' alt=''/>
                </div>
                <div className='player__block-bio'>
                    <div className='player__block-bio-user'>{player}</div>
                </div>
            </div>
            <div className='player__stats'>
                <div className='player__stats-block'>
                    <div className='player__stats-block-text'>Pelit</div>
                    <div className='player__stats-block-number'>{games}</div>
                </div>
                <div className='player__stats-block'>
                    <div className='player__stats-block-text'>Voitto %</div>
                    <div className='player__stats-block-number'>{winPercentAvg}</div>
                </div>
                <div className='player__stats-block'>
                    <div className='player__stats-block-text'>Siirto %</div>
                    <div className='player__stats-block-number'>{percentageAvg}</div>
                </div>
            </div>
        </div>
    )
}
