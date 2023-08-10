import React from "react";
import "./Joke.css";

function Joke({ vote, votes, text }) {
  function handleUpVote() {
    vote(1); // Call vote with delta +1 for upvote
  }

  function handleDownVote() {
    vote(-1); // Call vote with delta -1 for downvote
  }

  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={handleUpVote}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={handleDownVote}>
          <i className="fas fa-thumbs-down" />
        </button>

        {votes}
      </div>

      <div className="Joke-text">{text}</div>
    </div>
  );
}

export default Joke;
