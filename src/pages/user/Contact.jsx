import React from 'react';
import SectionContact from '../../components/Contact/SectionContact';
import FooterMenu from '../../components/Footer/FooterMenu';
import HeaderMenu from '../../components/Header/HeaderMenu';

function Contact(props) {
    return (
        <>
        <HeaderMenu />
        <SectionContact />
        <FooterMenu />
        </>
    );
}

export default Contact;