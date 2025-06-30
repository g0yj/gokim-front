import React from 'react';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; //npx shadcn@latest add card

// import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
// import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../components/ui/AppTheme';
import { Link } from 'react-router-dom';



const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex', 
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'auto',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));


export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [idError, setIdError] = React.useState(false);
  const [idErrorMessage, setIdErrorMessage] = React.useState('');
  const [phoneError, setPhoneError] = React.useState(false);
  const [phoneMessage, setPhoneErrorMessage] = React.useState('');
  const [image, setImage] = React.useState<File | null>(null);



  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;
    const id = document.getElementById('id') as HTMLInputElement;
    const phone = document.getElementById('phone') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('유효한 이메일을 입력 해주세요.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('비밀번호는 6자리 이상 입력 해주세요.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('이름을 입력 하세요.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (!id.value || id.value.length < 1) {
      setIdError(true);
      setIdErrorMessage('ID를 입력 하세요.');
      isValid = false;
    } else {
      setIdError(false);
      setIdErrorMessage('');
    }

    if (!phone.value || phone.value.length < 11) {
      setPhoneError(true);
      setPhoneErrorMessage('핸드폰 번호를 입력하세요.');
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage('');
    }

    return isValid;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    console.log('sss',event.target);
    setImage(file);
    console.log('s2',setImage(file));
  }

  const handleAvatarClick = () => {
    const imgInput = document.getElementById('image') as HTMLInputElement;
    imgInput.click();
    console.log('이미지 클릭');
  }

  const getInitialFromName = (name: string) => {
    if(!name) return '';
    const parts = name.split(' ');
    return parts[0].charAt(0).toUpperCase();
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (nameError || emailError || passwordError || idError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    
    if (!image){
      const fullName = data.get('name') as string;
      data.append('avatarInitial', getInitialFromName(fullName));
      console.log('이미지없을때: ',data.append('avatarInitial', getInitialFromName(fullName)));
    }


    console.log({
      name: data.get('name'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      avatarInitial: data.get('avatarInitial'),
      image: image ?  data.get('name') : 'No image upload',
    });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h4"
            variant="h4"
            sx={{ width: '80%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            회원가입
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: '70vh', overflowY: 'auto', }}
          >
          <FormControl sx={{ alignItems: 'center', mb: 2 }}>
              <Stack direction="column" alignItems="center" spacing={1}>
                <Avatar onClick={handleAvatarClick} sx={{ width: 56, height: 56, mb: 2 }}>
                  {image ? (
                    <img src={URL.createObjectURL(image)} alt="Profile" style={{ width: '100%', height: '100%' }} />
                  ) : (
                    getInitialFromName((document.querySelector('input[name="name"]') as HTMLInputElement)?.value)
                  )}
                </Avatar>
                <Typography variant="caption" color="textSecondary">
                  이미지 선택
                </Typography>
              </Stack>
              <input
                accept="image/*"
                type="file"
                id="image"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="id">ID</FormLabel>
              <TextField
                autoComplete="id"
                name="id"
                required
                fullWidth
                id="id"
                error={idError}
                helperText={idErrorMessage}
                color={idError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="name">이름</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phone">Phone</FormLabel>
              <TextField
                required
                fullWidth
                id="phone"
                name="phone"
                autoComplete="phone"
                variant="outlined"
                error={phoneError}
                helperText={phoneMessage}
                color={phoneError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link to='/login'>
                Log in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}