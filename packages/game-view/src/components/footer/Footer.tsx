import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="siteFooter">
      <div className={'Footer-Label__left'}>
        <span>G</span>
        <span>A</span>
        <span>M</span>
        <span>E</span>
        <div> </div>
      </div>
      <div className="Footer-Label__right">
        <span className="labelColorWhite">T</span>
        <span className="labelColorRed">E</span>
        <span className="labelColorGreen">T</span>
        <span className="labelColorOrange">R</span>
        <span>I</span>
        <span>S</span>
      </div>
    </footer>
  );
};

export default Footer;
