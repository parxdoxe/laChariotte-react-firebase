import React from 'react';
import SectionAbout from '../../components/About/SectionAbout';
import Header from '../../components/Header/Header';
import FooterMenu from '../../components/Footer/FooterMenu';

function About(props) {
    return (
        <>
        <Header />
        <SectionAbout />
        <FooterMenu />
        </>
    );
}

export default About;