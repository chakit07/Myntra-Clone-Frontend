import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatusActions } from "../store/fetchStatusSlice";
import { itemsActions } from "../store/itemsSlice";

const FetchItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusActions.markFetchingStarted());

    fetch("http://localhost:3000/api/items-list", { signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const items = data.items || [];
        console.log("Fetched items", items);
        dispatch(fetchStatusActions.markFetchDone());
        dispatch(itemsActions.addInitialItems(items));
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted, no problem.");
        } else {
          console.error("Fetch error:", err);
        }
      })
      .finally(() => {
        dispatch(fetchStatusActions.markFetchingFinished());
      });

    return () => {
      controller.abort(); // clean up fetch
    };
  }, [fetchStatus.fetchDone, dispatch]);

  return null;
};

export default FetchItems;
