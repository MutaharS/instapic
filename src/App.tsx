import { useState } from "react";
import SignupForm from "./components/SignupForm/SignupForm";
import NavBar from "./components/NavBar/NavBar";
import MediaFeed from "./components/MediaFeed/MediaFeed";
import PageContent from "./components/PageContent/PageContent";

function App() {
  // Status of signup after form submission
  const [seeLogin, setSeeLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [sessionEmail, setSessionEmail] = useState("");
  const [navigation, setNav] = useState("Home");

  const setLoggedInHandler = (status: boolean) => {
    setLoggedIn(status);
  };

  const toggleFormButton = () => {
    setSeeLogin(!seeLogin);
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex pt-4 px-5">
        <NavBar
          loggedIn={loggedIn}
          setLoggedIn={setLoggedInHandler}
          toggleFormButton={toggleFormButton}
          seeLogin={seeLogin}
          setNav={setNav}
        ></NavBar>
      </div>
      <div
        className={
          "d-flex align-items-center justify-content-center " +
          (loggedIn ? "" : "fill-height")
        }
      >
        {!loggedIn && (
          <SignupForm
            loggedIn={loggedIn}
            setLoggedIn={setLoggedInHandler}
            seeLogin={seeLogin}
            setSessionEmail={setSessionEmail}
          ></SignupForm>
        )}
        <PageContent
          navigation={navigation}
          loggedIn={loggedIn}
          email={sessionEmail}
        ></PageContent>
      </div>
    </div>
  );
}

export default App;
