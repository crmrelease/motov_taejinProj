import Router from "./router/Router";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";
import { ModalProvider } from "react-simple-hook-modal";

function App() {
  return (
    <ModalProvider>
      <RenderAfterNavermapsLoaded
        ncpClientId={"12stnddi1j"}
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}
      >
        <Router />
      </RenderAfterNavermapsLoaded>
    </ModalProvider>
  );
}

export default App;
