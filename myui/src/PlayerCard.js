import React from "react";
import "./Styles.css";

const PlayerCard = ({ player }) => (
  <div className="col card-wrapper" data-player={player.id}>
    <div className="card border-0">
      <div className="position-relative rounded-circle overflow-hidden mx-auto custom-circle-image">
        <img className="w-100 h-100" src={player.image} alt={player.name} />
      </div>
      <div className="card-body text-center mt-4">
        <h4 className="text-uppercase card-title">{player.name}</h4>
      </div>
    </div>
  </div>
);

export default PlayerCard;
