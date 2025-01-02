import React from "react";
import EvaluationForm from "./EvaluationForm";
import ExtensionTab from "./ExtensionTab";
import { useExtensionState } from "../hooks/useExtensionState";

const ExtensionUI: React.FC = () => {
  const { isExpanded, toggleExpansion } = useExtensionState();

  return (
    <div
      className={`bg-white rounded-l-lg shadow-lg transition-all duration-300 ease-in-out fixed top-80 right-0 ${
        isExpanded ? "w-[400px]" : "w-12"
      }`}
      style={{
        maxHeight: "calc(100vh - 100px)",
        overflowY: "auto",
        pointerEvents: "auto",
      }}
    >
      <ExtensionTab isExpanded={isExpanded} onToggle={toggleExpansion} />
      {isExpanded && <EvaluationForm />}
    </div>
  );
};

export default ExtensionUI;
