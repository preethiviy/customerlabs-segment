import { Drawer } from "@mui/material";
import { useState } from "react";
import AddSegment from "./components/AddSegment";

function App() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <main className="w-full min-h-screen bg-slate-100 p-5 flex justify-center items-center">
      <button onClick={toggleDrawer(true)} className="bg-blue-500 px-3 py-2 text-white rounded-md hover:bg-blue-400 transition-all duration-150 ease-in-out">Save segment</button>
      <Drawer 
        PaperProps={
          {
            sx: {
              width: 500,
              maxWidth: "90%"
            }
          }
        }
        
        anchor={"right"} 
        open={open} 
        onClose={toggleDrawer(false)}>
        <AddSegment toggleDrawer={toggleDrawer} />
      </Drawer>
    </main>
  )
}

export default App
