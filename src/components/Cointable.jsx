import React, { useEffect, useState } from 'react'; 
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    IconButton,
    Badge,
    TableSortLabel
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CoinModal from './Coinmodel';
import { useDispatch, useSelector } from 'react-redux';
import { coinlist, resetcoins, addtocart, removecart } from '../Redux/CoinSlice';
import { useNavigate } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Cointable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { coinApp, cart, loading, error } = useSelector((state) => state.Coin);
    const [searchitem, setSearchitem] = useState('');
    const [sortConfiguration, setSortConfiguration] = useState({ key: 'rank', direction: 'asc' });
    const [selectcoins, setSelectcoins] = useState(null);
    const [ismodelopen, setIsmodelopen] = useState(false);
    const [coinsData, setCoinsData] = useState([]);

    useEffect(() => {
        dispatch(coinlist());
    }, [dispatch]);

    useEffect(() => {
        setCoinsData(coinApp);
    }, [coinApp]);

    const handleSearch = (e) => {
        setSearchitem(e.target.value);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfiguration.key === key && sortConfiguration.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfiguration({ key, direction });
    };

    const handleaddtocart = (coin) => {
        dispatch(addtocart({ ...coin, quantity: 1 }));
    };

    const handleIncQuantity = (coin) => {
        const existingItem = cart.find((item) => item.id === coin.id);
        if (existingItem) {
            dispatch(addtocart({ ...coin, quantity: existingItem.quantity + 1 }));
        }
    };

    const handleDecQuantity = (coin) => {
        const existingItem = cart.find((item) => item.id === coin.id);
        if (existingItem && existingItem.quantity > 1) {
            dispatch(addtocart({ ...coin, quantity: existingItem.quantity - 1 }));
        } else {
            dispatch(removecart(coin.id));
        }
    };

    const handleRow = (coin) => {
        setSelectcoins(coin);
        setIsmodelopen(true);
    };

    const handleClosemodel = (updatedCoin) => {
        setIsmodelopen(false);
        if (updatedCoin) {
            setCoinsData((prevCoins) =>
                prevCoins.map((coin) => (coin.id === updatedCoin.id ? updatedCoin : coin))
            );
        }
        setSelectcoins(null);
    };

    const handleredirecttocart = () => {
        navigate('/cart');
    };

    const filteredCoins = coinsData.filter((coin) =>
        coin.name.toLowerCase().includes(searchitem.toLowerCase())
    );

    const sortedCoins = [...filteredCoins].sort((a, b) => {
        if (a[sortConfiguration.key] < b[sortConfiguration.key]) {
            return sortConfiguration.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfiguration.key] > b[sortConfiguration.key]) {
            return sortConfiguration.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const handleRefresh = () => {
        dispatch(resetcoins());
        dispatch(coinlist());
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography
                variant="h4"
                sx={{ mb: 3, fontFamily: 'Verdana, sans-serif', fontWeight: 'bold', color: '#333' }}
            >
                Crypto-Currency
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
    <IconButton onClick={handleredirecttocart} sx={{ color: '#333', marginRight: '20px' }}>
        <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon fontSize="large" />
        </Badge>
    </IconButton>

    <TextField
        label="Search by Name"
        value={searchitem}
        onChange={handleSearch}
        sx={{
            width: '300px',
            '& .MuiInputLabel-root': {
                color: '#4caf50',
            },
            '& .MuiOutlinedInput-root': {
                borderColor: '#4caf50',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#388e3c',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#388e3c',
                },
            },
        }}
    />
</Box>


            <Button
    variant="contained"
    onClick={handleRefresh}
    sx={{
        mb: 2,
        backgroundColor: '#4caf50', 
        '&:hover': {
            backgroundColor: '#388e3c', 
            transform: 'scale(1.05)', 
            transition: 'transform 0.3s ease-in-out', 
        },
        padding: '10px 20px', 
        fontSize: '16px', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
        textTransform: 'none', 
    }}
>
    Refresh
</Button>


            {loading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">Failed to load data: {error}</Typography>}

            {!loading && !error && sortedCoins.length > 0 && (
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell onClick={() => handleSort('rank')} style={{ cursor: 'pointer' }}>
                                    <TableSortLabel
                                        active={sortConfiguration.key === 'rank'}
                                        direction={sortConfiguration.direction}
                                        IconComponent={sortConfiguration.direction === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon}
                                    >
                                        <strong>Rank</strong>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                                    <TableSortLabel
                                        active={sortConfiguration.key === 'name'}
                                        direction={sortConfiguration.direction}
                                        IconComponent={sortConfiguration.direction === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon}
                                    >
                                        <strong>Name</strong>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell onClick={() => handleSort('symbol')} style={{ cursor: 'pointer' }}>
                                    <TableSortLabel
                                        active={sortConfiguration.key === 'symbol'}
                                        direction={sortConfiguration.direction}
                                        IconComponent={sortConfiguration.direction === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon}
                                    >
                                        <strong>Symbol</strong>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell onClick={() => handleSort('priceUsd')} style={{ cursor: 'pointer' }}>
                                    <TableSortLabel
                                        active={sortConfiguration.key === 'priceUsd'}
                                        direction={sortConfiguration.direction}
                                        IconComponent={sortConfiguration.direction === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon}
                                    >
                                        <strong>Price (USD)</strong>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell onClick={() => handleSort('marketCapUsd')} style={{ cursor: 'pointer' }}>
                                    <TableSortLabel
                                        active={sortConfiguration.key === 'marketCapUsd'}
                                        direction={sortConfiguration.direction}
                                        IconComponent={sortConfiguration.direction === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon}
                                    >
                                        <strong>Market Cap (USD)</strong>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <strong>Actions</strong>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedCoins.map((coin) => (
                                <TableRow key={coin.id}>
                                    <TableCell>{coin.rank}</TableCell>
                                    <TableCell>{coin.name}</TableCell>
                                    <TableCell>{coin.symbol}</TableCell>
                                    <TableCell>{`$${parseFloat(coin.priceUsd).toFixed(2)}`}</TableCell>
                                    <TableCell>{`$${parseFloat(coin.marketCapUsd).toLocaleString()}`}</TableCell>
                                    <TableCell align="center">
                                    <Button
    variant="outlined"
    onClick={() => handleRow(coin)}
    sx={{
        marginRight: 1,
        color: '#4caf50', 
        borderColor: '#4caf50', 
        '&:hover': {
            borderColor: '#388e3c', 
            backgroundColor: '#388e3c', 
            color: '#fff', 
            transform: 'scale(1.05)',
            transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out', 
        },
        padding: '8px 16px', 
        fontSize: '14px', 
        textTransform: 'capitalize',
        borderRadius: '4px', 
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
    }}
>
    Edit
</Button>

                                        {cart.some((item) => item.id === coin.id) ? (
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <IconButton
                                                    sx={{ color: '#ff5722', padding: '5px' }}
                                                    onClick={() => handleDecQuantity(coin)}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Typography sx={{ marginX: 1 }}>
                                                    {cart.find((item) => item.id === coin.id)?.quantity}
                                                </Typography>
                                                <IconButton
                                                    sx={{ color: '#4caf50', padding: '5px' }}
                                                    onClick={() => handleIncQuantity(coin)}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        ) : (
                                            <Button
    variant="contained"
    onClick={() => handleaddtocart(coin)}
    sx={{
        backgroundColor: '#4caf50', 
        color: '#fff', 
        '&:hover': {
            backgroundColor: '#388e3c', 
            transform: 'scale(1.05)', 
            transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out', 
        },
        padding: '10px 20px', 
        fontSize: '16px', 
        fontWeight: 'bold', 
        borderRadius: '8px', 
        textTransform: 'capitalize', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', 
        letterSpacing: '0.5px',
    }}
>
    Add to Cart
</Button>

                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <CoinModal
                open={ismodelopen}
                onClose={handleClosemodel}
                selectedCoin={selectcoins}
            />
        </Box>
    );
};

export default Cointable;
