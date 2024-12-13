// Import necessary modules from react-router-dom for routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import the CSS file for styling
import '../css/app.css';
// Import the components that will be used in the routes
import RenderKarteikarte from './RenderKarteikarte';
import InputKarteiKarte from './InputKarteikarte';
import RenderKarteikarteCategory from './RenderKarteikarteCategory';
import Navigation from './Navigation';



// Define the main App component
function App() {
  return (
    <>
      {/* Set up the router for the application */}
      <BrowserRouter>
        <div>
          {/* Include the Navigation component */}
          <Navigation />
          {/* Define the routes for the application */}
          <Routes>
            {/* Route for rendering categories */}
            <Route exact path="/renderCat" element={<RenderKarteikarteCategory />} />
            {/* Route for rendering all items */}
            <Route exact path="/renderAll" element={<RenderKarteikarte />} />
            {/* Default route for inputting a new item */}
            <Route exact path="/" element={<InputKarteiKarte />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

// Export the App component as the default export
export default App;