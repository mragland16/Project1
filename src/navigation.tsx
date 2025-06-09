import { Routes, Route, Link } from 'react-router-dom';

// "sub-applications" or "pages"
import CatApp from './CatApp/App.tsx';
import ContactSearchApp from './ContactSearch/App.tsx'; // Renamed to avoid confusion
import DiceGameApp from './DiceGame/App.tsx';         // Renamed
import SocialApp from './SocialApp/App.tsx';
import YoutubeVideoApp from './YoutubeVideo/App.jsx'; 







// A simple Home component (optional, but good practice)
const Home = () => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Welcome to My Multi-App Portfolio!</h1>
        <p>Select an application from the navigation above.</p>
    
    </div>
);



export default function Navigation() {
 return (
   <div>
     <nav style={{ padding: "1rem", background: "#eee" }}>
       <Link to="/dice">Dice Game</Link> |{" "}
       <Link to="/contacts">Contact Search</Link> |{" "}
       <Link to="/cats">Cat App</Link> |{" "}
       <Link to="/youtube">YouTube Video</Link> |{" "}
       <Link to="/social">Social App</Link>
     </nav>

     {/* <Home/> */}
     <Routes>
       <Route path="/dice" element={<DiceGameApp />} />
       <Route path="/contacts" element={<ContactSearchApp />} />
       <Route path="/cats" element={<CatApp />} />
       <Route path="/youtube" element={<YoutubeVideoApp />} />
       <Route path="/social" element={<SocialApp />} />
       <Route path="*" element={<p>Select an app from the nav</p>} />
     </Routes>
   </div>
 );
}
