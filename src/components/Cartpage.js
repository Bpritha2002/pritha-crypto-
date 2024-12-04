import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatecartitems, removecart } from '../Redux/CoinSlice';
import {
    Box,
    Typography,
    IconButton,
    Card,
    CardContent,
    CardActions,
    Button,
    Divider,
    Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.Coin);

    // Handle quantity update
    const handleUpdateQuantity = (coin, quantity) => {
        if (quantity > 0) {
            dispatch(updatecartitems({ id: coin.id, quantity }));
        } else {
            handleRemoveItem(coin); // If quantity is 0 or less, remove the item
        }
    };

    // Remove item from cart
    const handleRemoveItem = (coin) => {
        dispatch(removecart({ id: coin.id }));
    };

    return (
        <Box
            sx={{
                backgroundColor: '#fff7f3',
                padding: '40px',
                minHeight: '100vh',
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#d1736b',
                    marginBottom: 4,
                    textShadow: '2px 2px 5px rgba(0,0,0,0.1)',
                }}
            >
                Your Shopping Cart
            </Typography>
            <Divider sx={{ mb: 4 }} />
            {cart.length === 0 ? (
                <Typography
                    variant="h6"
                    sx={{
                        textAlign: 'center',
                        color: '#888',
                    }}
                >
                    Your cart is empty.
                </Typography>
            ) : (
                <Grid container spacing={4}>
                    {cart.map((coin) => (
                        <Grid item xs={12} md={6} lg={4} key={coin.id}>
                            <Card
                                sx={{
                                    borderRadius: '15px',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 'bold',
                                            color: '#d1736b',
                                            marginBottom: 2,
                                        }}
                                    >
                                        {coin.name}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#444',
                                            marginBottom: 2,
                                        }}
                                    >
                                        Price: ${parseFloat(coin.priceUsd).toFixed(2)}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#444',
                                            marginBottom: 2,
                                        }}
                                    >
                                        Quantity: {coin.quantity}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 'bold',
                                            color: '#6ba86b',
                                        }}
                                    >
                                        Total: ${parseFloat(coin.priceUsd * coin.quantity).toFixed(2)}
                                    </Typography>
                                </CardContent>
                                <CardActions
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '0 16px 16px',
                                    }}
                                >
                                    <Box>
                                        <IconButton
                                            onClick={() =>
                                                handleUpdateQuantity(coin, coin.quantity - 1)
                                            }
                                            sx={{
                                                color: '#d1736b',
                                                backgroundColor: '#ffe5df',
                                                '&:hover': {
                                                    backgroundColor: '#ffd1c6',
                                                },
                                            }}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() =>
                                                handleUpdateQuantity(coin, coin.quantity + 1)
                                            }
                                            sx={{
                                                color: '#d1736b',
                                                backgroundColor: '#ffe5df',
                                                '&:hover': {
                                                    backgroundColor: '#ffd1c6',
                                                },
                                            }}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                    <IconButton
                                        onClick={() => handleRemoveItem(coin)}
                                        sx={{
                                            color: '#d1736b',
                                            backgroundColor: '#ffe5df',
                                            '&:hover': {
                                                backgroundColor: '#ffd1c6',
                                            },
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            {cart.length > 0 && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 4,
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#d1736b',
                            color: '#fff',
                            fontWeight: 'bold',
                            padding: '10px 30px',
                            borderRadius: '25px',
                            textTransform: 'none',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                            '&:hover': {
                                backgroundColor: '#c0615e',
                            },
                        }}
                    >
                        Proceed to Checkout
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Cart;
