import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

function JokeList({ numJokesToGet = 5 }) {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch jokes when the component mounts
  useEffect(() => {
    getJokes();
  }, []);

  // Fetch new jokes when the numJokesToGet prop changes
  useEffect(() => {
    getJokes();
  }, [numJokesToGet]);

  // Fetch jokes from the API
  async function getJokes() {
    try {
      let j = [];
      let seenJokes = new Set();

      while (j.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });
        let { ...jokeObj } = res.data;

        if (!seenJokes.has(jokeObj.id)) {
          seenJokes.add(jokeObj.id);
          j.push({ ...jokeObj, votes: 0 });
        } else {
          console.error("Duplicate found!");
        }
      }

      setJokes(j);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  // Fetch new jokes without using the jokes state array length
  function generateNewJokes() {
    setIsLoading(true);
    getJokes();
  }

  // Update the vote for a joke with a specific ID
  function vote(id, delta) {
    setJokes((prevJokes) =>
      prevJokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    );
  }

  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    );
  }

  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

  return (
    <div className="JokeList">
      <button className="JokeList-getmore" onClick={generateNewJokes}>
        Get New Jokes
      </button>

      {sortedJokes.map(({ joke, id, votes }) => (
        <Joke text={joke} key={id} votes={votes} vote={vote} />
      ))}
    </div>
  );
}

export default JokeList;
