import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="siteFooter">
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
    </footer>
  );
};

export default Footer;
