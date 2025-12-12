"use client";

import { useRouter } from "next/navigation";
import { AIProfessorViewer } from "@/components/AIProfessorViewer";

export default function AIProfessorPage() {
  const router = useRouter();

  return <AIProfessorViewer onClose={() => router.push("/")} />;
}

