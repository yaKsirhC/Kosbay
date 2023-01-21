import axios from "axios";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/app.scss";
import NavigationBar from "./components/navigation/NavigationBar";
import ShowAuth from "./components/auth/ShowAuth";
import BuySell from "./pages/BuySell";
import Questions from "./pages/Questions";
import Events from "./pages/Events";
import Announcements from "./pages/Announcements";
import ChatRoom from "./pages/ChatRoom";
import Settings from "./pages/Settings";
import NonExistent from "./pages/404";
import ProductAdminLayout from "./pages/ProductAdminLayout";
import UserPageLayout from "./pages/UserPageLayout";
import ProductPageLayout from "./pages/ProductPageLayout";
import InlineChatBox from "./components/chat/InlineChatBox";
import { RootState } from "../store";
import { user } from "./vite-env";
import GeneralModal from "./components/GeneralModal";
import ChangeImageBannerForm from "./components/users/ChangeImageBannerForm";

axios.defaults.withCredentials = true;
export const SocketContext = createContext<Socket | undefined>(undefined);
export const ModalContext = createContext<Function | undefined>(undefined);

function App() {
  const [socket, setSocket] = useState<Socket>();
  const [elements, setElements] = useState<JSX.Element>();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { showModal } = useSelector((state: RootState) => state.modal);
  const { showInlineBox } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get("_ver")) {
      const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);
      socket.on("connect", () => {
        socket.emit("enable_chat", cookies.get("_ver"));
        setSocket(socket);
      });

      return () => {
        socket.off("connect");
      };
    }
  }, [(userInfo as user)._id]);

  return (
    <div className="App">
      <SocketContext.Provider value={socket as Socket}>
        <ModalContext.Provider value={setElements}>
          <Router>
            <NavigationBar />
            <main>
              {
                showModal && (
                  <GeneralModal>{elements as JSX.Element}</GeneralModal>
                )
              }
              <ShowAuth />

              <Routes>
                <Route path="/" element={<BuySell />} />
                <Route path="/my" element={<ProductAdminLayout />} />
                <Route path="/users/:id" element={<UserPageLayout />} />
                <Route path="/products/:pid" element={<ProductPageLayout />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/events" element={<Events />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/chat-room" element={<ChatRoom />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/*" element={<NonExistent />} />
              </Routes>
            </main>
            {showInlineBox && <InlineChatBox />}
          </Router>
        </ModalContext.Provider>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
