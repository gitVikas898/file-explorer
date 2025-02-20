import { useState } from "react";
import "./App.css";
import json from "./constants/data.json";

function App() {
  const [data, setData] = useState(json);

  return (
    <div>
      <h1>File Folder Structure</h1>
      <div className="border">
        <List list={data} />
      </div>
    </div>
  );
}


const List = ({list})=>{
    return(
     
        <div className="">
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
          {expanded ? "🔽" : "> "}
        </span>)}
        <span onClick={handleExpand}><img src={`/public/${node?.type || node?.children?.type}.png`} className="icon"></img>{node.name}</span>
        {expanded && node?.children && (
          <List list={node.children}/>
        )}
    </div>
  );
};

export default App;
