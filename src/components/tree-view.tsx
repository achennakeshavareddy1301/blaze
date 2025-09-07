import React from "react";
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { useState } from "react";

interface TreeViewProps {
  data: (string | string[])[];
  value?: string | null;
  onSelect?: (value: string) => void;
}

export const TreeView = ({ data, value, onSelect }: TreeViewProps) => {
  return (
    <div className="w-full h-full overflow-auto bg-gray-100 dark:bg-gray-800 p-2">
      {data.map((item, index) => {
        if (Array.isArray(item)) {
          return (
            <TreeFolder
              key={index}
              folderName={item[0]}
              children={item.slice(1)} // <-- FIXED HERE
              value={value}
              onSelect={onSelect}
            />
          );
        } else {
          return (
            <TreeFile
              key={index}
              fileName={item}
              value={value}
              onSelect={onSelect}
            />
          );
        }
      })}
    </div>
  );
};

interface TreeFolderProps {
  folderName: string;
  children: string[];
  value?: string | null;
  onSelect?: (value: string) => void;
}

const TreeFolder = ({
  folderName,
  children,
  value,
  onSelect,
}: TreeFolderProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        className="cursor-pointer flex items-center gap-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={() => setOpen((prev) => !prev)}
      >
        <ChevronRightIcon
          className={`w-4 h-4 transition-transform ${open ? "rotate-90" : ""}`}
        />
        <FolderIcon className="w-4 h-4" />
        <span>{folderName}</span>
      </div>
      {open && (
        <div className="ml-4">
          {children.map((child, index) => (
            <TreeFile
              key={index}
              fileName={child}
              value={value}
              onSelect={onSelect}
              parentPath={folderName}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface TreeFileProps {
  fileName: string;
  value?: string | null;
  onSelect?: (value: string) => void;
  parentPath?: string;
}

const TreeFile = ({
  fileName,
  value,
  onSelect,
  parentPath = "",
}: TreeFileProps) => {
  const filePath = parentPath ? `${parentPath}/${fileName}` : fileName;
  const isSelected = value === filePath;

  return (
    <div
      className={`cursor-pointer flex items-center gap-2 p-1 ${
        isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
      onClick={() => onSelect && onSelect(filePath)}
    >
      <FileIcon className="w-4 h-4" />
      <span>{fileName}</span>
    </div>
  );
};