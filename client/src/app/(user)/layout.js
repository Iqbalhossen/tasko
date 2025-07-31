"use client";
import ProtectedRoute from "@/component/ProtectedRoute/ProtectedRoute";

export default function MiddlewareProtectedRoute({ children }) {
  return (
    <>
      <ProtectedRoute>{children}</ProtectedRoute>
    </>
  );
}

