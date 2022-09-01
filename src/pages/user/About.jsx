import React from 'react';
import SectionAbout from '../../components/About/SectionAbout';
import HeaderMenu from '../../components/Header/HeaderMenu';
import FooterMenu from '../../components/Footer/FooterMenu';

function About(props) {
    return (
        <>
        <HeaderMenu />
        <SectionAbout />
        <FooterMenu />
        </>
    );
}

export default About;