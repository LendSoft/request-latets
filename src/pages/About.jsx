import React from 'react';

const About = () => {
    const headingStyle = {
        fontSize: '48px',
        marginBottom: '20px',
    };

    const infoStyle = {
        fontSize: '24px', 
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={headingStyle}>Контакты</h1>
            <div style={infoStyle}>
                <p>Почта: nms.04@mail.ru</p>
                <p>Github: <a href="https://github.com/LendSoft/request-latets">Ссылка на репозиторий</a></p>
            </div>
        </div>
    );
};

export default About;
