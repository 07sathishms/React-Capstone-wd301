import React, { useContext, useEffect, useState } from "react";
import { Match } from "../../types/matches";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { getMatch, setPreferences } from "../../utils/apiUtils";
import { PlayIcon, StarIcon } from "@heroicons/react/24/solid";
import Loading from "../../components/Loading";
import { UserContext } from "../../context/user";
import { Preferences } from "../../types/user";

const getCurrentMatch =
  (id: number) => async (setMatchCB: (data: Match) => void) => {
    const data: Match = await getMatch(id);
    console.log(data);
    setMatchCB(data);
  };

const updatePreferences = async (preferences: Preferences) => {
  await setPreferences({ preferences: preferences });
};

function LiveGamesTile(props: {
  id: number;
  fav: boolean;
  isRunning: boolean;
}) {
  const { user } = useContext(UserContext);
  const { id, fav, isRunning } = props;
  const [match, setMatch] = useState<Match>();
  const [saved] = useState<boolean | null>(null);

  useEffect(() => {
    getCurrentMatch(id)(setMatch);
  }, [id]);

  useEffect(() => {
    if (saved === null) return;
    if (user) {
      updatePreferences(user.preferences);
    }
  }, [saved]);


  const refresh = () => {
    getCurrentMatch(id)(setMatch);
    console.log(match);
  };

  if (!match) {
    return (
      <div
        className="flex flex-col items-center justify-center p-4 rounded-md shadow-sm shadow-gray-400
    flex-grow-0 flex-shrink-0 w-64
    bg-gray-400"
      >
        <Loading />
      </div>
    );
  }
  return (
    <div
      className="flex flex-col p-4 rounded-md shadow-sm shadow-gray-400 m-2 
      flex-grow-0 flex-shrink-0 w-64
      bg-gray-400"
    >
      <div className="font-bold text-lg mb-1 flex justify-between w-full items-start">
        <span>
          <div className="flex gap-4 text-red-500 font-normal items-center text-base">
            {fav && (
              <span className="flex gap-1 items-center">
                <StarIcon className="w-5 h-5 text-red-500" />
              </span>
            )}
            {isRunning && (
              <span className="flex gap-1 items-center">
                {<PlayIcon className="w-5 h-5" />}Live
              </span>
            )}
          </div>
          {match.sportName}
        </span>
        <div className="flex gap-1">
          
          <button>
            <ArrowPathIcon
              className="w-5 h-5 hover:scale-110"
              onClick={refresh}
            />
          </button>
        </div>
      </div>
      <p className="my-1">{match.location}</p>
      {Object.keys(match.score).map((key) => (
        <p key={key} className="flex w-full justify-between">
          <span>
            <b>{key}</b>
          </span>
          <span>{match.score[key as keyof Match]}</span>
        </p>
      ))}
    </div>
  );
}

export default LiveGamesTile;
