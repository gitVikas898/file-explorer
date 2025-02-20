import { useState } from "react";
import "./App.css";
import json from "./constants/data.json";

function App() {
  const [data, setData] = useState(json);

  return (
    <div>
      <h1>File Folder Structure</h1>
      <List list={data} />
    </div>
  );
}


const List = ({list})=>{
    return(
      <div>
          {list.map((node)=>(
            <Treenode node={node} key = {node.name}/>
          ))}
      </div>
    )
}

const Treenode = ({ node}) => {
  const [expanded,setExpanded] = useState(true);
  const handleExpand = (id)=>{
      setExpanded((prev)=>!prev);
  }
  return (
    <div className="node">
        {node?.isfolder && (<span className="click" onClick={handleExpand}>
          {expanded ? "🔽" : "▶️"}
        </span>)}
        <span onClick={handleExpand}>{node.name}</span>
        {expanded && node?.children && (
          <List list={node.children}/>
        )}
    </div>
  );
};

export default App;
