import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions, selectors } from "./rulesSlice";
import styles from "./Rules.module.css";

export function Rules() {
  const dispatch = useDispatch();
  const rulesState = useSelector(selectors.rulesState);

  React.useEffect(() => {
    dispatch(actions.initFetch());
  }, [dispatch]);

  return (
    <div>
      <h3>Display Rules</h3>
      {rulesState.loading ? (
        "loading......"
      ) : (
        <div>
          <div>
            <h4>Inclusion Rules</h4>
          <div/>
          </div>
        </div>
      )}
    </div>
  );
}
