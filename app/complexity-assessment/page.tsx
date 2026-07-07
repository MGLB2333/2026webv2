import type { Metadata } from "next";
import ComplexityAssessment from "@/components/ComplexityAssessment";
import "@/styles/complexity-assessment.css";

export const metadata: Metadata = {
  title: "TV Planning Complexity Assessment",
  description:
    "A quick 5-question diagnostic that scores how complex your TV planning process is — mapping the inventory, buying routes, audiences, measurement sources and manual workflow steps inside a single campaign.",
  alternates: { canonical: "/complexity-assessment" },
};

export default function ComplexityAssessmentPage() {
  return <ComplexityAssessment />;
}
