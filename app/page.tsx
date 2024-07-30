// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface PodHealth {
  name: string;
  namespace: string;
  status: string;
}

const TableRow = ({ pod }: { pod: PodHealth }) => {
  return (
    <tr
      className={`border-b ${pod.status === "Ready" ? "border-neutral-100 bg-neutral-50 text-neutral-800" : "border-warning-200 bg-warning-100 text-neutral-800"} `}
    >
      <td className="whitespace-nowrap px-6 py-4 font-medium">{pod.name}</td>
      <td className="whitespace-nowrap px-6 py-4">{pod.namespace}</td>
      <td className="whitespace-nowrap px-6 py-4">{pod.status}</td>
    </tr>
  );
};

const Home = () => {
  const [podsHealth, setPodsHealth] = useState<PodHealth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPodsHealth = async () => {
    try {
      const response = await axios.get<PodHealth[]>("/api/pods-health");
      setPodsHealth(response.data);
    } catch (err) {
      setError("Failed to fetch pod health");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPodsHealth();

    const intervalId = setInterval(fetchPodsHealth, 10000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mx-40 px-10 w-100">
      <h1 className="text-2xl text-center my-10">Kubernetes Pod Health</h1>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="w-[80vw] text-center text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Namespace
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {podsHealth.map((pod, index) => {
                    return <TableRow key={index} pod={pod} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
