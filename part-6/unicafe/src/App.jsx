import { useState } from "react";
import { Statistics } from "./components/Statistics";
import { createStore } from "redux";
import counterReducer from "./reducer";

const store = createStore(counterReducer);

function App() {
  const [votes, setVotes] = useState(store.getState());

  const counterAction = (actionType) => {
    return {
      type: actionType,
    };
  };

  store.subscribe(() => {
    const storeNow = store.getState();
    console.log(storeNow);
    setVotes(storeNow);
  });
  return (
    <div>
      <h2>Give Feedback</h2>
      <div>
        <button onClick={() => store.dispatch(counterAction("GOOD"))}>
          good
        </button>
        <button onClick={() => store.dispatch(counterAction("NEUTRAL"))}>
          neutral
        </button>
        <button onClick={() => store.dispatch(counterAction("BAD"))}>
          bad
        </button>
        <button onClick={() => store.dispatch(counterAction("RESET"))}>
          reset
        </button>
      </div>

      <h2>Statistics</h2>
      {votes.good || votes.bad || votes.neutral ? (
        <Statistics good={votes.good} bad={votes.bad} neutral={votes.neutral} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
}

export default App;
