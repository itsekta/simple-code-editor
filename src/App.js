import "./App.css";
import CodeEditor from "./CodeEditor";
function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Simple Code Editor</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CodeEditor />
      </div>
    </div>
  );
}

export default App;
