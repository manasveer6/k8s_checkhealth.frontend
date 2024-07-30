// lib/kubernetes.ts
import * as k8s from "@kubernetes/client-node";

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);

export const checkPodsHealth = async () => {
  try {
    const res = await k8sApi.listPodForAllNamespaces();
    const podsHealth = res.body.items.map((pod) => {
      const podName = pod.metadata?.name;
      const namespace = pod.metadata?.namespace;
      const conditions = pod.status?.conditions || [];
      const readyCondition = conditions.find((cond) => cond.type === "Ready");
      const isReady = readyCondition?.status === "True";

      return {
        podName,
        namespace,
        isReady,
      };
    });

    return podsHealth;
  } catch (err) {
    console.error("Error fetching pod information:", err);
    throw err;
  }
};

export const listDeploymentsStatus = async () => {
  try {
    const res = await appsV1Api.listDeploymentForAllNamespaces();
    return res.body.items.map((deployment) => {
      const name = deployment.metadata?.name || "";
      const namespace = deployment.metadata?.namespace || "";
      const replicas = deployment.status?.replicas || 0;
      const readyReplicas = deployment.status?.readyReplicas || 0;
      const availableReplicas = deployment.status?.availableReplicas || 0;
      const status =
        readyReplicas === replicas && availableReplicas === replicas
          ? "Ready"
          : "Not Ready";

      return {
        name,
        namespace,
        // replicas,
        // readyReplicas,
        // availableReplicas,
        status,
      };
    });
  } catch (err) {
    console.error("Error fetching deployments:", err);
    throw err;
  }
};

export const listDeployments = async () => {
  try {
    const res = await appsV1Api.listDeploymentForAllNamespaces();
    const brr = res.body.items.map((deployment) => {
      const name = deployment.metadata?.name || "";
      const namespace = deployment.metadata?.namespace || "";
      const replicas = deployment.status?.replicas || 0;
      const readyReplicas = deployment.status?.readyReplicas || 0;
      const availableReplicas = deployment.status?.availableReplicas || 0;
      const status =
        readyReplicas === replicas && availableReplicas === replicas
          ? "Ready"
          : "Not Ready";

      return {
        name,
        namespace,
        replicas,
        readyReplicas,
        availableReplicas,
        status,
      };
    });
    console.log(brr);
    return brr;
  } catch (err) {
    console.error("Error fetching deployments:", err);
    throw err;
  }
};
