import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions, selectors } from "./rulesSlice";
import styles from "./Rules.module.css";

const Rule = ({ ruleType, rule, index }) => {
  const dispatch = useDispatch();
  const [warning, setWarning] = React.useState(false);

  return (
    <div className={styles.Rule}>
      <select
        className={styles.input}
        value={rule.rule}
        onChange={(e) =>
          dispatch(
            actions.modifyRule({
              ruleType,
              index,
              rule: { ...rule, rule: e.target.value },
            })
          )
        }
      >
        <option value="all">All Pages</option>
        <option value="home">Home Page</option>
        <option value="product">Product Page</option>
        <option value="password">Password Page</option>
        <option value="custom">Custom</option>
      </select>
      {rule.rule === "custom" ? (
        <>
          <select
            className={styles.input}
            value={rule.type}
            onChange={(e) =>
              dispatch(
                actions.modifyRule({
                  ruleType,
                  index,
                  rule: { ...rule, type: e.target.value },
                })
              )
            }
          >
            <option value="contains">Contains</option>
            <option value="exact">Exact</option>
          </select>
          <div>
            <input
              className={styles.input}
              type="text"
              value={rule.url}
              onFocus={() => {
                setWarning(false);
              }}
              onBlur={() => {
                if (rule.url === "") {
                  setWarning(true);
                }
              }}
              onChange={(e) =>
                dispatch(
                  actions.modifyRule({
                    ruleType,
                    index,
                    rule: { ...rule, url: e.target.value },
                  })
                )
              }
            ></input>
            {warning ? <div className={styles.warning}>URL is missing</div> : null}
          </div>
        </>
      ) : null}
      <button
        className={styles.x}
        onClick={(value) => dispatch(actions.removeRule({ ruleType, index }))}
      >
        <div className={styles.xContent}>x</div>
      </button>
    </div>
  );
};

const NewRule = ({onClick}) => {
  return <button className={styles.NewRule} onClick={onClick}>+ NEW RULE</button>;
};

export const Rules = () => {
  const dispatch = useDispatch();
  const rulesState = useSelector(selectors.rulesState);

  React.useEffect(() => {
    dispatch(actions.initFetch());
  }, [dispatch]);

  return (
    <div className={styles.Rules}>
      <div className={styles.header}>Display Rules</div>
      <div className={styles.divider} />
      {rulesState.loading ? (
        "loading......"
      ) : (
        <div>
          <div className={styles.card}>
            <div className={styles.header}>Inclusion Rules</div>
            <div className={styles.subheader}>
              Where would you like to display your campaign?
            </div>
            <div>
              {rulesState.inclusion.map((rule, i) => (
                <>
                  {i > 0 ? <div className={styles.or}>OR</div> : null}
                  <Rule ruleType="inclusion" index={i} key={i} rule={rule} />
                </>
              ))}
              <NewRule
                onClick={() =>
                  dispatch(actions.addRule({ ruleType: "inclusion" }))
                }
              />
            </div>
          </div>
          <div className={styles.card}>
            <div>Exclusion Rules</div>
            <div>
              {rulesState.exclusion.map((rule, i) => (
                <Rule ruleType="exclusion" index={i} key={i} rule={rule} />
              ))}
              <NewRule
                onClick={() =>
                  dispatch(actions.addRule({ ruleType: "exclusion" }))
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
