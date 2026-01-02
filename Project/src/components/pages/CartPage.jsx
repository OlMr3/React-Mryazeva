// components/CartPage.js

/*import React, {useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartTotal,
  removeItem,
  updateItemQuantity,
  clearCart
} from '../../store/slices/cartSlice';
import { saveCartToFirestore } from '../../store/slices/cartThunks';
import { selectUserData } from '../../store/slices/authSlice';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Button,
  Divider,
  Paper
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCartCheckout as CheckoutIcon,
  ClearAll as ClearCartIcon
} from '@mui/icons-material';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const user = useSelector(selectUserData);

  const handleRemoveItem = useCallback((itemId) => {
    dispatch(removeItem(itemId));
    if (user?.uid) {
      dispatch(saveCartToFirestore(user.uid));
    }
  }, [dispatch, user]);

  const handleQuantityChange = useCallback((itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    dispatch(updateItemQuantity({ id: itemId, quantity: newQuantity }));
    if (user?.uid) {
      dispatch(saveCartToFirestore(user.uid));
    }
  }, [dispatch, user]);

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
    if (user?.uid) {
      dispatch(saveCartToFirestore(user.uid));
    }
  }, [dispatch, user]);

  const handleCheckout = () => {
    alert('Функция оформления заказа в разработке');
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Корзина
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Ваша корзина пуста
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Корзина
      </Typography>

      <Grid container spacing={3}>
       
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  // Изображение товара 
                  <Grid item xs={12} sm={3}>
                    <CardMedia
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        objectFit: 'cover',
                        borderRadius: 1
                      }}
                    />
                  </Grid>

                  // Информация о товаре 
                  <Grid item xs={12} sm={5}>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography color="text.secondary">
                      {item.price} BYN. × {item.quantity}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      Итого: {item.price * item.quantity} BYN.
                    </Typography>
                  </Grid>

                  //Управление количеством 
                  <Grid item xs={12} sm={2}>
                    <Box display="flex" alignItems="center">
                      <IconButton 
                        size="small" 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      
                      <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                      
                      <IconButton 
                        size="small" 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Grid>

                  //Кнопка удаления 
                  <Grid item xs={12} sm={2}>
                    <IconButton 
                      color="error" 
                      onClick={() => handleRemoveItem(item.id)}
                      sx={{ ml: 'auto' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>

        // Итоговая сумма 
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Итог заказа
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" color="primary" gutterBottom>
                Всего: {cartTotal} BYN.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                за {cartItems.reduce((total, item) => total + item.quantity, 0)} товаров
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<CheckoutIcon />}
              onClick={handleCheckout}
              sx={{ mb: 1 }}
            >
              Оформить заказ
            </Button>
            
            <Button
              variant="outlined"
              color="error"
              size="small"
              fullWidth
              startIcon={<ClearCartIcon />}
              onClick={handleClearCart}
            >
              Очистить корзину
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;*/
/*РАБОЧИЙ
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartTotal,
  removeItem,
  //updateItemQuantity,
  clearCart
} from '../../store/slices/cartSlice';
import { saveCartToFirestore } from '../../store/slices/cartThunks';
import { updateItemQuantityWithSave } from '../../store/slices/cartThunks';
import { selectUserData } from '../../store/slices/authSlice';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Button,
  Divider,
  Paper,
  Collapse
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCartCheckout as CheckoutIcon,
  ClearAll as ClearCartIcon
} from '@mui/icons-material';
import { CartPageStyles } from './styles/CartPage.styles';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const user = useSelector(selectUserData);
  
  const [removingItems, setRemovingItems] = useState({});
   const handleRemoveItem = useCallback((itemId) => {
    setRemovingItems(prev => ({ ...prev, [itemId]: true }));
    
    setTimeout(() => {
      dispatch(removeItem(itemId));
      user?.uid && dispatch(saveCartToFirestore(user.uid));
      setRemovingItems(prev => {
        const newState = { ...prev };
        delete newState[itemId];
        return newState;
      });
    }, 300);
  }, [dispatch, user?.uid]); 

  const handleQuantityChange = (itemId, newQuantity) => {
  if (newQuantity < 1) return;
  
  // Используйте новый thunk вместо прямого вызова reducer
  dispatch(updateItemQuantityWithSave(user?.uid, itemId, newQuantity));
};

   const handleClearCart = useCallback(() => {
    const itemIds = cartItems.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {});
    
    setRemovingItems(itemIds);
    
    setTimeout(() => {
      dispatch(clearCart());
      user?.uid && dispatch(saveCartToFirestore(user.uid));
      setRemovingItems({});
    }, 300);
  }, [dispatch, user?.uid, cartItems]);

  const handleCheckout = () => {
    alert('Функция оформления заказа в разработке');
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={CartPageStyles.emptyCart}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Корзина
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Ваша корзина пуста
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={CartPageStyles.container}>
      <Typography variant="h4" gutterBottom>
        Корзина
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Collapse 
              key={item.id} 
              in={!removingItems[item.id]}
              timeout={300}
              unmountOnExit
              sx={{
                ...CartPageStyles.collapse,
                ...(removingItems[item.id] && { transform: 'scale(0.9)' })
              }}
            >
              <Card sx={CartPageStyles.card}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <CardMedia
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={CartPageStyles.image}
                      />
                    </Grid>

                    <Grid item xs={12} sm={5}>
                      <Typography variant="h6" gutterBottom>
                        {item.name}
                      </Typography>
                      <Typography color="text.secondary">
                        {item.price} BYN. × {item.quantity}
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        Итого: {item.price * item.quantity} BYN.
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                      <Box sx={CartPageStyles.quantityControls}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        
                        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                        
                        <IconButton 
                          size="small" 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                      <IconButton 
                        color="error" 
                        onClick={() => handleRemoveItem(item.id)}
                        sx={CartPageStyles.deleteButton}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Collapse>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={CartPageStyles.summaryPaper}>
            <Typography variant="h6" gutterBottom>
              Итог заказа
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" color="primary" gutterBottom>
                Всего: {cartTotal} BYN.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                за {cartItems.reduce((total, item) => total + item.quantity, 0)} товаров
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<CheckoutIcon />}
              onClick={handleCheckout}
              sx={CartPageStyles.checkoutButton}
            >
              Оформить заказ
            </Button>
            
            <Button
              variant="outlined"
              color="error"
              size="small"
              fullWidth
              startIcon={<ClearCartIcon />}
              onClick={handleClearCart}
              sx={CartPageStyles.clearButton}
            >
              Очистить корзину
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage; КОНЕЦ*/

import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartTotal,
  removeItem,
  clearCart
} from '../../store/slices/cartSlice';
import { 
  saveCartToFirestore, 
  updateItemQuantityWithSave 
} from '../../store/slices/cartThunks'; // Правильный путь
import { selectUserData } from '../../store/slices/authSlice';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Button,
  Divider,
  Paper,
  Collapse
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCartCheckout as CheckoutIcon,
  ClearAll as ClearCartIcon
} from '@mui/icons-material';
import { CartPageStyles } from './styles/CartPage.styles';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const user = useSelector(selectUserData);
  
  const [removingItems, setRemovingItems] = useState({});

  const handleRemoveItem = useCallback((itemId) => {
    setRemovingItems(prev => ({ ...prev, [itemId]: true }));
    
    setTimeout(() => {
      dispatch(removeItem(itemId));
      user?.uid && dispatch(saveCartToFirestore(user.uid));
      setRemovingItems(prev => {
        const newState = { ...prev };
        delete newState[itemId];
        return newState;
      });
    }, 300);
  }, [dispatch, user?.uid]); 

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    // Используем новый thunk
    dispatch(updateItemQuantityWithSave(user?.uid, itemId, newQuantity));
  };

  const handleClearCart = useCallback(() => {
    const itemIds = cartItems.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {});
    
    setRemovingItems(itemIds);
    
    setTimeout(() => {
      dispatch(clearCart());
      user?.uid && dispatch(saveCartToFirestore(user.uid));
      setRemovingItems({});
    }, 300);
  }, [dispatch, user?.uid, cartItems]);

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={CartPageStyles.emptyCart}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Корзина
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Ваша корзина пуста
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={CartPageStyles.container}>
      <Typography variant="h4" gutterBottom>
        Корзина
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Collapse 
              key={item.id} 
              in={!removingItems[item.id]}
              timeout={300}
              unmountOnExit
              sx={{
                ...CartPageStyles.collapse,
                ...(removingItems[item.id] && { transform: 'scale(0.9)' })
              }}
            >
              <Card sx={CartPageStyles.card}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <CardMedia
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={CartPageStyles.image}
                      />
                    </Grid>

                    <Grid item xs={12} sm={5}>
                      <Typography variant="h6" gutterBottom>
                        {item.name}
                      </Typography>
                      <Typography color="secondary">
                        {item.price} BYN. × {item.quantity}
                      </Typography>
                      <Typography variant="subtitle1" color="secondary">
                        Итого: {item.price * item.quantity} BYN.
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                      <Box sx={CartPageStyles.quantityControls}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        
                        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                        
                        <IconButton 
                          size="small" 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                      <IconButton 
                        color="error" 
                        onClick={() => handleRemoveItem(item.id)}
                        sx={CartPageStyles.deleteButton}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Collapse>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={CartPageStyles.summaryPaper}>
            <Typography variant="h6" gutterBottom>
              Итог заказа
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" color="secondary" gutterBottom>
                Всего: {cartTotal} BYN.
              </Typography>
              <Typography variant="body2" color="secondary">
                за {cartItems.reduce((total, item) => total + item.quantity, 0)} товаров
              </Typography>
            </Box>

           
            
            <Button
              variant="outlined"
              color="error"
              size="small"
              fullWidth
              startIcon={<ClearCartIcon />}
              onClick={handleClearCart}
              sx={CartPageStyles.clearButton}
            >
              Очистить корзину
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;










 

  /*const handleRemoveItem = useCallback((itemId) => {
    setRemovingItems(prev => ({ ...prev, [itemId]: true }));
    
    setTimeout(() => {
      dispatch(removeItem(itemId));
      if (user?.uid) {
        dispatch(saveCartToFirestore(user.uid));
      }
      setRemovingItems(prev => {
        const newState = { ...prev };
        delete newState[itemId];
        return newState;
      });
    }, 300);
  }, [dispatch, user]);*/

  
 /* const handleClearCart = useCallback(() => {
    const newRemovingState = {};
    cartItems.forEach(item => {
      newRemovingState[item.id] = true;
    });
    setRemovingItems(newRemovingState);
    
    setTimeout(() => {
      dispatch(clearCart());
      if (user?.uid) {
        dispatch(saveCartToFirestore(user.uid));
      }
      setRemovingItems({});
    }, 300);
  }, [dispatch, user, cartItems]);*/

  
  /*const handleQuantityChange = useCallback((itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    dispatch(updateItemQuantity({ id: itemId, quantity: newQuantity }));
    if (user?.uid) {
      dispatch(saveCartToFirestore(user.uid));
    }
  }, [dispatch, user]);*/
