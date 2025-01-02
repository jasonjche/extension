import React from "react";
import { EvaluationForm } from "../EvaluationForm";
import { ExtensionTab } from "../ExtensionTab";
import { useExtensionState } from "../../hooks/useExtensionState";

export const ExtensionUI = () => {
  const { isExpanded, toggleExpansion } = useExtensionState();

  return (
    <div
      className={`extension-container bg-white rounded-l-lg shadow-lg ${
        isExpanded ? "w-[450px]" : "w-14"
      } ${isExpanded ? "slide-enter" : "slide-exit"}`}
    >
      <div className="flex flex-col">
        <ExtensionTab isExpanded={isExpanded} onToggle={toggleExpansion} />
        {isExpanded && (
          <div className="overflow-y-auto" style={{ maxHeight: "calc(600px - 4rem)" }}>
            <EvaluationForm />
          </div>
        )}
      </div>
    </div>
  );
};