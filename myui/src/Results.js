import React from "react";
import PlayerCard from "./PlayerCard";

const Results = ({ error, bestMatch, scores, players }) => {
  return (
    <div className="col-sm-8">
      {error && (
        <div className="error">
          <p>
            Can't classify image. Classifier was not able to detect face and two
            eyes properly
          </p>
        </div>
      )}

      {bestMatch && (
        <div className="row">
          <div className="col-sm-4" id="resultHolder">
            <PlayerCard player={players.find((p) => p.id === bestMatch)} />
          </div>
          <div className="col-sm-8">
            <table className="table">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Probability Score</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => {
                  // Get the score or default to 0
                  const score = Number(scores[player.id]) || 0;
                  return (
                    <tr key={player.id}>
                      <td>{player.name}</td>
                      <td>
                        {typeof score === "number" ? score.toFixed(2) : "0.00"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
