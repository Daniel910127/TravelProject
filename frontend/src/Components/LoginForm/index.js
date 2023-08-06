import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Navigate } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSession } from '../../contexts/SessionContext';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(12),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

export default function SignIn() {
  const classes = useStyles();
  const { login } = useSession() || {};
  const initialFormData = ({
    account: '',
    password: '',
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [redirect, setRedirect] = useState(false);
  

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });

    setError('');
    setErrors({});
    
  };

  const handleSubmit = async(e) => {
  e.preventDefault();

  const formErrors = validateForm(formData);
  if (Object.keys(formErrors).length === 0) {
    try {
      const response =await axios.post('http://127.0.0.1:8000/api/account-login/', formData);
      if (response.data.id) {
        setRedirect(true);
       login(response.data.id, response.data.account, response.data.username, response.data.access,response.data.refresh);
      } else {
        setRedirect(false);
        setError(response.data.error);
        console.log(response.data.error);
      }
    } catch (err) {
      setError('登入錯誤');
      return <Navigate to="/login" />;
    }
  } else {
    setErrors(formErrors);
  }
};
if (redirect) {
    return <Navigate to="/home" />;
  }
	const validateForm = (data) => {
  	const errors = {};
  	if (!data.account) {
    	errors.account = '請輸入帳號';
 	 } 
  	if (!data.password) {
    	errors.password = '請輸入密碼';
  	} 

  	return errors;
	};

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Grid className={classes.paper}>
        <Avatar></Avatar>
        <Typography component="h1" variant="h5">
          登入
        </Typography>
        <form >
          <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="account"
            label="account"
            name="account"
            autoFocus
            onChange={handleChange}
          />
          <Typography color="error">{errors.account}</Typography>
        </Grid>
          <Grid item xs={12}>
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Typography color="error">{errors.password}</Typography>
        </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            登入
          </Button>
		  <Typography color="error">{error}</Typography>
        </form>
      </Grid>
    </Container>
  );
}
