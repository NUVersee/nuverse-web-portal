"use client";

import { useRouter } from "next/navigation";
import { Tour360Viewer } from "@/components/Tour360Viewer";

export default function TourPage() {
  const router = useRouter();

  return <Tour360Viewer onClose={() => router.push("/")} />;
}

