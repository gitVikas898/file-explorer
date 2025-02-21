import { useState } from "react";
import "./App.css";
import json from "./constants/data.json";

function App() {
  const [data, setData] = useState(json);

  return (
    <div>
      <h1>File Folder Structure</h1>
      <div className="border">
        <List list={data} setData={setData} data={data} />
      </div>
    </div>
  );
}

const List = ({ list, setData, data }) => {
  return (
    <div className="">
      {list.map((node) => (
        <Treenode node={node} key={node.name} data={data} setData={setData} />
      ))}
    </div>
  );
};

const Treenode = ({ node, data, setData }) => {
  const [expanded, setExpanded] = useState(true);
  const handleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const handleAddFolder = () => {
    const folderName = prompt("Enter the folder name");
    if (!folderName) {
      return;
    }
    const newFolder = {
      name: folderName,
      isfolder: true,
      children: [],
      type: "generic",
    };

    const updateTree = (tree) => {
      return tree.map((child) => {
        if (child.name === node.name) {
          return {
            ...child,
            children: [...child.children, newFolder],
          };
        }
        if (child.children) {
          return {
            ...child,
            children: updateTree(child.children),
          };
        }
        return child;
      });
    };
    setData(updateTree(data));
  };

  return (
    <div className="node">
      {node?.isfolder && (
        <>
          {" "}
          <span className="plus" onClick={handleAddFolder}>
            {" "}
            ➕
          </span>
          <span className="click" onClick={handleExpand}>
            {expanded ? "🔽" : "▶️"}
          </span>
        </>
      )}
      <span onClick={handleExpand}>
        <img
          src={`/public/${node?.type || node?.children?.type}.png`}
          className="icon"
        ></img>
        {node.name}
      </span>
      {node?.isfolder && <span className="del">🗑️</span>}
      {expanded && node?.children && (
        <List list={node.children} setData={setData} data={data} />
      )}
    </div>
  );
};

export default App;
