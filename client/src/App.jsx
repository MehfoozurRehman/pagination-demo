import { useEffect, useRef, useState } from "react";

import useQuery from "../hooks/useQuery";

export default function App() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(500);

  const { data, isLoading, error } = useQuery(
    `http://localhost:3000/?page=${page}&limit=${limit}`
  );

  const { data: users, totalPages = 50 } = data;

  const [completeData, setCompleteData] = useState([]);

  useEffect(() => {
    if (users) {
      setCompleteData((prevData) => [...prevData, ...users]);
    }
  }, [users]);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", () => {
        if (
          scrollContainer.scrollTop + scrollContainer.clientHeight >=
          scrollContainer.scrollHeight
        ) {
          setPage((prevPage) =>
            prevPage >= totalPages ? totalPages : prevPage + 1
          );
        }
      });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", () => {});
      }
    };
  }, [totalPages]);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setPage(page <= 1 ? 1 : page - 1);
          }}
        >
          prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((i) => i >= page - 2 && i <= page + 2)
          .map((i) => (
            <button
              key={i}
              onClick={() => {
                setPage(i);
              }}
            >
              {i}
            </button>
          ))}
        <button
          onClick={() => {
            setPage(page >= totalPages ? totalPages : page + 1);
          }}
        >
          next
        </button>
      </div>
      <select
        name=""
        id=""
        value={limit}
        onChange={(e) => {
          setLimit(e.target.value);
        }}
      >
        <option value="5">50</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      App
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <div
          style={{
            height: "500px",
            overflow: "auto",
          }}
          ref={scrollContainerRef}
        >
          <pre>{JSON.stringify(completeData, null, 2)}</pre>
          {isLoading && <div>Loading...</div>}
          {page >= totalPages && <div>No more data</div>}
        </div>
      )}
    </div>
  );
}
