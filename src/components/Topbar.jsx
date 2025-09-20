import { useState } from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Topbar = ({ onLogout }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div style={styles.container}>
            <FaUserCircle
                size={30}
                style={{ cursor: 'pointer' }}
                onClick={() => setShowDropdown(!showDropdown)}
            />

            {showDropdown && (
                <div style={styles.dropdown}>
                    <div style={styles.dropdownItem} onClick={onLogout}>
                        <FaSignOutAlt style={{ marginRight: 8 }} />
                        Logout
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        height: 60,
        backgroundColor: '#34495e',
        color: '#fff',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0 20px',
        position: 'fixed',            // stays at the top
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
    },
    dropdown: {
        position: 'absolute',
        top: 60,
        right: 20,
        backgroundColor: '#fff',
        color: '#333',
        border: '1px solid #ccc',
        borderRadius: 5,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    },
    dropdownItem: {
        padding: '10px 20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    },
};

export default Topbar;