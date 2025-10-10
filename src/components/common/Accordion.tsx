import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "../../icons";

interface AccordionProps {
  items: Array<{
    question: string;
    answer: string;
  }>;
  allowMultiple?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div 
          key={index}
          className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <h3 className="font-medium text-gray-800 dark:text-white/90 pr-4">
              {item.question}
            </h3>
            {openIndices.includes(index) ? (
              <ChevronUpIcon className="size-5 text-gray-500 flex-shrink-0 transition-transform" />
            ) : (
              <ChevronDownIcon className="size-5 text-gray-500 flex-shrink-0 transition-transform" />
            )}
          </button>
          {openIndices.includes(index) && (
            <div className="px-6 py-4 bg-white dark:bg-white/[0.03]">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;

