import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import help from '@images/help.svg';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const havigateToHelp = useCallback(() => navigate('/help'), []);

  return (
    <footer className="Footer-Toolbar">
      <div className="siteFooter">
        <div className={'Footer-Label__left'}>
          <span className="labelColorRed">G</span>
          <span className="labelColorGreen">A</span>
          <span className="labelColorBlue">M</span>
          <span className="labelColorOrange">E</span>
          <div> </div>
        </div>
        <div className="Footer-Label__right">
          <span className="labelColorWhite">T</span>
          <span className="labelColorRed">E</span>
          <span className="labelColorGreen">T</span>
          <span className="labelColorOrange">R</span>
          <span className="labelColorBlue">I</span>
          <span className="labelColorYellow">S</span>
        </div>
      </div>
      <div>
        <img
          alt="help"
          className="helpBtn"
          src={help.toString()}
          data-testid="havigateToHelp"
          onClick={havigateToHelp}
        />
      </div>
    </footer>
  );
};

export default memo(Footer);
