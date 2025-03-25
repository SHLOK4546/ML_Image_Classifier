import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";
import Navbar from "./Navbar";
import PlayerCard from "./PlayerCard";
import Results from "./Results";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";

const players = [
  {
    id: "andrew garfield",
    name: "andrew garfield",
    image: "/images/andrew garfield9.png",
  },
  {
    id: "lionel messi",
    name: "lionel messi",
    image: "/images/lionel messi5.png",
  },
  {
    id: "maria sharapova",
    name: "maria sharapova",
    image: "/images/maria sharapova1.png",
  },
  {
    id: "selena gomez",
    name: "selena gomez",
    image: "/images/selena gomez7.png",
  },
  {
    id: "virat kohli",
    name: "virat kohli",
    image: "/images/virat kohli - Google Search1.png",
  },
];

const App = () => {
  const [error, setError] = useState(false);
  const [bestMatch, setBestMatch] = useState(null);
  const [scores, setScores] = useState({});
  const dropzoneRef = useRef(null);

  useEffect(() => {
    const initDropzone = () => {
      Dropzone.autoDiscover = false;
      const dz = new Dropzone(dropzoneRef.current, {
        url: "https://ml-image-classifier.onrender.com",
        maxFiles: 1,
        addRemoveLinks: true,
        autoProcessQueue: false,
        dictDefaultMessage: "Drop files here or click to upload",
      });

      dz.on("addedfile", (file) => {
        if (dz.files.length > 1) dz.removeFile(dz.files[0]);
      });

      dz.on("complete", async (file) => {
        try {
          const reader = new FileReader();
          reader.onload = async (e) => {
            const imageData = e.target.result;

            const response = await fetch(
              "https://ml-image-classifier.onrender.com",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ image_data: imageData }),
              }
            );

            if (!response.ok) throw new Error(response.statusText);

            const data = await response.json();

            if (!data || data.length === 0) {
              setError(true);
              return;
            }

            let bestScore = -1;
            let match = null;
            data.forEach((item) => {
              const currentScore = Math.max(...item.class_probability);
              if (currentScore > bestScore) {
                bestScore = currentScore;
                match = item;
              }
            });

            if (match) {
              setError(false);
              setBestMatch(match.class);
              const scoresData = {};
              Object.keys(match.class_dictionary).forEach((name) => {
                const index = match.class_dictionary[name];
                scoresData[name] = match.class_probability[index].toFixed(2);
              });
              setScores(scoresData);
            }
          };
          reader.readAsDataURL(file);
        } catch (err) {
          console.error("Error:", err);
          setError(true);
        }
      });

      return dz;
    };

    const dz = initDropzone();
    return () => dz.destroy();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>

        <div className="row mt-4">
          <div className="col-sm-4">
            <div ref={dropzoneRef} className="dropzone"></div>
            <div className="row mt-3">
              <div className="col-3 mx-auto">
                <button
                  onClick={() => dropzoneRef.current?.dropzone?.processQueue()}
                  className="btn btn-success"
                >
                  Classify
                </button>
              </div>
            </div>
          </div>

          <Results
            error={error}
            bestMatch={bestMatch}
            scores={scores}
            players={players}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
