export const CartPageStyles = {
    emptyCart: {
        py: 4
    },
    container: {
        py: 4
    },
    card: {
        mb: 2,
        '&:hover': {
            boxShadow: 3,
            transform: 'translateY(-2px)'
        },
        transition: 'all 0.3s ease-in-out'
    },
    collapse: {
        mb: 2,
        transition: 'all 0.3s ease-in-out',
        '&.scale-down': {
            transform: 'scale(0.9)'
        }
    },
    image: {
        width: 80,
        height: 80,
        objectFit: 'cover',
        borderRadius: 1
    },
    quantityControls: {
        display: 'flex',
        alignItems: 'center'
    },
    deleteButton: {
        ml: 'auto',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.2)',
            backgroundColor: 'error.light'
        }
    },
    summaryPaper: {
        p: 3,
        position: 'sticky',
        top: 20
    },
    checkoutButton: {
        mb: 1,
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 4
        }
    },
    clearButton: {
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-1px)'
        }
    }
};
