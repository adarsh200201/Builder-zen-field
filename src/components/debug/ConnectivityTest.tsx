import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ConnectivityTest() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult("");

    try {
      const apiUrl =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      console.log("Testing connection to:", apiUrl);

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${apiUrl}/health`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        setResult(`✅ Backend connected successfully: ${JSON.stringify(data)}`);
      } else {
        setResult(
          `❌ Backend responded with error: ${response.status} ${response.statusText}`,
        );
      }
    } catch (error) {
      setResult(`❌ Connection failed: ${error.message}`);
      console.error("Connection test failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const testUsageCheck = async () => {
    setLoading(true);
    setResult("");

    try {
      const apiUrl =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(
        `${apiUrl}/usage/check-limit?sessionId=test123`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        setResult(`✅ Usage check successful: ${JSON.stringify(data)}`);
      } else {
        setResult(
          `❌ Usage check failed: ${response.status} ${response.statusText}`,
        );
      }
    } catch (error) {
      setResult(`❌ Usage check failed: ${error.message}`);
      console.error("Usage check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold mb-3">Backend Connectivity Test</h3>
      <div className="space-x-2 mb-3">
        <Button onClick={testConnection} disabled={loading} size="sm">
          Test Health Endpoint
        </Button>
        <Button
          onClick={testUsageCheck}
          disabled={loading}
          size="sm"
          variant="outline"
        >
          Test Usage Check
        </Button>
      </div>
      {result && (
        <div className="mt-3 p-3 bg-white border rounded text-sm font-mono whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
}
