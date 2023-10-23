import React, { useContext, useEffect } from "react";
import Appbar from "../../components/Navbar";
import LiveGames from "../match/LiveGames";
import { UserContext } from "../../context/user";
import { me } from "../../utils/apiUtils";
import { User } from "../../types/user";
import ErrorBoundary from "../../ErrorBoundary";

const fetchUser = async (setUser: (data: User) => void) => {
  const user: User = await me();
  setUser(user);
};

function Dashboard() {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    fetchUser(setUser);
  }, []);
  return (
    <>
      <div className="h-screen overflow-y-auto no-scrollbar ">
        <ErrorBoundary>
          <Appbar />
        </ErrorBoundary>
        <div className="flex w-full justify-center">
          <ErrorBoundary>
            <LiveGames />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
