import React, { useState } from 'react';
import '../css/dropdown.css';

function DropdownMenu({ id, handleDelete, type }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="menu-container">
            <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            {isMenuOpen && (
                <ul className="dropdown">
                    <li onClick={(e) => handleDelete(e, id)}>Delete {type}</li>
                </ul>
            )}
        </div>
    );
}

export default DropdownMenu;
