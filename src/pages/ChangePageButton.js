import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePageButton = ({ to, label, classname }) => {
    const nav = useNavigate();

    const changePage = () => {
        nav(to);
    };

    return (
        <button className={classname} onClick={changePage}>
            {label}
        </button>
    );
};

export default ChangePageButton;