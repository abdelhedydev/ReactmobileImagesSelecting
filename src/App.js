<import React from "react";
import { map, indexOf, filter } from "lodash";
import "./styles.css";

const data = [
  {
    id: 1,
    src: "https://image.flaticon.com/icons/svg/2490/2490641.svg"
  },
  {
    id: 2,
    src: "https://image.flaticon.com/icons/svg/263/263109.svg"
  },
  {
    id: 3,
    src: "https://image.flaticon.com/icons/svg/710/710606.svg"
  },
  {
    id: 4,
    src: "https://image.flaticon.com/icons/svg/732/732190.svg"
  },
  {
    id: 5,
    src: "https://image.flaticon.com/icons/svg/1051/1051377.svg"
  }
];
const App = () => {
  const [ids, SetIds] = React.useState([]);
  const [selectMode, setSelectMode] = React.useState(false);

  // Hook
  const [startLongPress, setStartLongPress] = React.useState(false);
  React.useEffect(() => {
    let timerId;
    if (startLongPress) {
      timerId = setTimeout(handleLongPress, 500);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [startLongPress]);

  // End Hook

  function isExist(id) {
    return indexOf(ids, id) !== -1;
  }

  function handleId(e, id) {
    if (!isExist(id)) {
      e.currentTarget.classList.add("selected");
      const newIds = ids;
      newIds.push(id);
      SetIds(newIds);
    } else {
      e.currentTarget.classList.remove("selected");
      const newIds = filter(ids, item => item !== id);
      SetIds(newIds);
    }
  }

  function handleLongPress(e, id) {
    setSelectMode(true);
    if (selectMode) {
      handleId(e, id);
    }
  }

  function reset() {
    setSelectMode(false);
    SetIds([]);
  }
  return (
    <div className="App">
      <div>
        <div>
          {selectMode && (
            <div>
              <button type="button" onClick={() => reset()}>
                Exit
              </button>
              <button type="button" onClick={() => console.log(ids)}>
                get Ids
              </button>
            </div>
          )}
        </div>
        <div>
          <h1>Mode d'affichage : {selectMode ? "Oui" : "No"}</h1>
        </div>
      </div>
      <div className="container">
        {map(data, item => (
          <div
            className={!selectMode ? "img" : "native"}
            key={item.id}
            onClick={e => (selectMode ? handleLongPress(e, item.id) : null)}
            // Hook Code
            onMouseDown={() => (!selectMode ? setStartLongPress(true) : null)}
            onMouseUp={() => (!selectMode ? setStartLongPress(false) : null)}
            onMouseLeave={() => (!selectMode ? setStartLongPress(false) : null)}
            onTouchStart={() => (!selectMode ? setStartLongPress(true) : null)}
            onTouchEnd={() => (!selectMode ? setStartLongPress(false) : null)}
          >
            <img src={item.src} alt="test" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
