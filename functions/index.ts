import * as k8s from "@kubernetes/client-node";
import axios from "axios";

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

export const checkPods = async () => {
  try {
    const res = await k8sApi.listPodForAllNamespaces();
    res.body.items.forEach((pod) => {
      const podName = pod.metadata?.name;
      const namespace = pod.metadata?.namespace;
      const conditions = pod.status?.conditions;

      if (conditions) {
        const readyCondition = conditions.find((cond) => cond.type === "Ready");

        if (readyCondition && readyCondition.status !== "True") {
          console.log(`Pod ${podName} in namespace ${namespace} is not ready`);
        }
      }
    });
  } catch (err) {
    console.error("Error fetching pod information:", err);
  }
};

// const monitorInterval = 60000; // Check every 60 seconds
//
// setInterval(checkPods, monitorInterval);
//
// // Initial check
// checkPods();
