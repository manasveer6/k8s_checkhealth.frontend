// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface PodHealth {
  name: string;
  namespace: string;
  status: string;
}

const Home = () => {
  const [podsHealth, setPodsHealth] = useState<PodHealth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchPodsHealth();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mx-40 px-10">
      <h1 className="text-lg text-center my-10">Kubernetes Pod Health</h1>
      <ul>
        {podsHealth.map((pod) => (
          <li key={`${pod.namespace}-${pod.name}`}>
            {pod.name} - {pod.status}
          </li>
        ))}
      </ul>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Class
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Heading
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Heading
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-200 dark:border-white/10">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Default
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                  </tr>
                  <tr className="border-b border-primary-200 bg-primary-100 text-neutral-800">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Primary
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                  </tr>
                  <tr className="border-b border-secondary-200 bg-secondary-100 text-neutral-800">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Secondary
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                  </tr>
                  <tr className="border-b border-success-200 bg-success-100 text-neutral-800">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Success
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                  </tr>
                  <tr className="border-b border-danger-200 bg-danger-100 text-neutral-800">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Danger
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                  </tr>
                  <tr className="border-b border-warning-200 bg-warning-100 text-neutral-800">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Warning
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                  </tr>
                  <tr className="border-b border-info-200 bg-info-100 text-neutral-800">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Info
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                  </tr>
                  <tr className="border-b border-neutral-100 bg-neutral-50 text-neutral-800 dark:bg-neutral-50">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Light
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                  </tr>
                  <tr className="border-b border-neutral-700 bg-neutral-800 text-neutral-50 dark:border-neutral-600 dark:bg-neutral-700">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Dark
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                    <td className="whitespace-nowrap px-6 py-4">Cell</td>
                  </tr>
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
