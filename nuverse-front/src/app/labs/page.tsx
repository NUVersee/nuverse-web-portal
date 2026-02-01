"use client";

import { useRouter } from "next/navigation";
import { LabsOrchestrator } from "@/components/LabsOrchestrator";

export default function LabsPage() {
  const router = useRouter();

  return <LabsOrchestrator onClose={() => router.push("/")} />;
}

