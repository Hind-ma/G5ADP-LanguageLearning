import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePageButton = ({ to, label }) => {
    const nav = useNavigate();

    const changePage = () => {
        nav(to);
    };

    return (
        <button className="check-button" onClick={changePage}>
            {label}
        </button>
    );
};

export default ChangePageButton;