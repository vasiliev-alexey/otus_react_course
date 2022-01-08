import avatar from '@images/avatar.svg';
import { fetchData, LeaderList } from '@store/leaderBoardSlice';
import { RootState } from '@store/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClimbingBoxLoader } from 'react-spinners';

const LeaderBoard: React.FC = () => {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(fetchData());
  }, []);

  const { isLoading, leaderList } = useSelector<RootState, LeaderList>(
    (st) => st.leaderBoard
  );

  return (
    <>
      {isLoading ? (
        <div data-testid="leaderboard-spinner">
          <ClimbingBoxLoader size={50} color={'blue'} />
        </div>
      ) : (
        <div className="container" data-testid="leaderboard-container">
          <div className="leaderboard">
            <div className="head">
              <i className="fas fa-crown"></i>
              <h1>Лидеры соревнования</h1>
            </div>
            <div className="body">
              <ol>
                {leaderList.map((gam) => {
                  return (
                    <li key={gam.uid} data-testid={`leaderboard-${gam.uid}`}>
                      <img
                        src={gam.pictUrl || avatar.toString()}
                        className="leaderboard-avatar"
                      />
                      <mark>{gam.userName}</mark>
                      <small>{gam.topScore}</small>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeaderBoard;
