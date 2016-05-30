import React from 'react';
import StatsItem from './StatsItem.jsx';

const PokemonStatsInfo = ({stats}) => {

    stats = stats ? stats : [];
    console.log("PokemonStatsInfo");

    return (
        <div className="pokemon-stats-info">
            <h3 className="stats-info-title">Stats</h3>
            <ul className="stats-info-diagram">
                { stats.map((data, index) =>  <StatsItem {...data} key={index}/>) }
            </ul>

        </div>
    )
};

export default PokemonStatsInfo;