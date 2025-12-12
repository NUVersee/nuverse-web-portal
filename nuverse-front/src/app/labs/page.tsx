"use client";

import { useRouter } from "next/navigation";
import { LabsViewer } from "@/components/LabsViewer";

export default function LabsPage() {
  const router = useRouter();

  return <LabsViewer onClose={() => router.push("/")} />;
}

