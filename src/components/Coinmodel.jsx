import React, { useEffect, useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
} from '@mui/material';

const Coinmodel= ({ open, onClose, selectedCoin }) => {
    const [coin, setCoin] = useState({});

    useEffect(() => {
        if (selectedCoin) {
            setCoin(selectedCoin);
        }
    }, [selectedCoin]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCoin({ ...coin, [name]: value });
    };

    const handlesave = () => {
        onClose(coin); 
    };

    const handleclose = () => {
        onClose(null); 
    };

    return (
        <Modal open={open} onClose={handleclose}>
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #ffd1dc, #f3e8ff)',
                    padding: 4,
                    borderRadius: 4,
                    maxWidth: 500,
                    width: '90%',
                    margin: 'auto',
                    mt: '10%',
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                }}
            >
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                        fontWeight: 'bold',
                        color: '#6a1b9a',
                        textAlign: 'center',
                        mb: 2,
                        textShadow: '1px 1px 5px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    Edit Coin Details
                </Typography>
                <TextField
                    label="Name"
                    name="name"
                    value={coin.name || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    sx={{
                        '& .MuiInputBase-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: 2,
                        },
                    }}
                />
                <TextField
                    label="Symbol"
                    name="symbol"
                    value={coin.symbol || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    sx={{
                        '& .MuiInputBase-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: 2,
                        },
                    }}
                />
                <TextField
                    label="Price (USD)"
                    name="priceUsd"
                    type="number"
                    value={coin.priceUsd || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    sx={{
                        '& .MuiInputBase-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: 2,
                        },
                    }}
                />
                <TextField
                    label="Market Cap (USD)"
                    name="marketCapUsd"
                    type="number"
                    value={coin.marketCapUsd || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    sx={{
                        '& .MuiInputBase-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: 2,
                        },
                    }}
                />
                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            onClick={handlesave}
                            fullWidth
                            sx={{
                                backgroundColor: '#6a1b9a',
                                color: '#fff',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#5a1384',
                                },
                                borderRadius: 3,
                                padding: '10px 20px',
                            }}
                        >
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="outlined"
                            onClick={handleclose}
                            fullWidth
                            sx={{
                                color: '#6a1b9a',
                                borderColor: '#6a1b9a',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: 'rgba(106, 27, 154, 0.1)',
                                    borderColor: '#5a1384',
                                },
                                borderRadius: 3,
                                padding: '10px 20px',
                            }}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default Coinmodel;
