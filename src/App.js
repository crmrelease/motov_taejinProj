import Router from "./router/Router";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";

function App() {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={"12stnddi1j"}
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <Router />
    </RenderAfterNavermapsLoaded>
  );
}

export default App;
