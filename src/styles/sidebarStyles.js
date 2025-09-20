export const styles = {
    container: {
        width: 220,
        backgroundColor: '#2c3e50',
        color: '#fff',
        padding: '20px 10px',
        height: '100vh',
    },
    item: {
        padding: 10,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
    toggleButton: {
        position: 'absolute',
        top: 20,
        zIndex: 1000,
        padding: '8px 12px',
        cursor: 'pointer',
        transition: 'left 0.3s ease', // <-- Smooth movement
    },
    subItem: {
        padding: '6px 0',
        cursor: 'pointer',
        color: '#ecf0f1',
        fontSize: '14px',
    }
};