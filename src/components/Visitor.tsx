import { useEffect, useState } from "react";
import axios from "axios";

export default function VisitorCounter() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    axios
      .post<{ count: number }>("/api/visitor")
      .then((response) => setCount(response.data.count))
      .catch((error) => console.error("Error fetching visitor count:", error));
  }, []);

  return (
    <div className="mb-4">
      <p className="text-xl">👀 <span className="font-semibold" >Visitor Count</span>: {count}</p>
    </div>
  );
}
