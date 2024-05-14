import Dashboard from "@/components/Dashboard/Dashboard";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";

export default function Home() {
  return (
    <>
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    </>
  );
}
