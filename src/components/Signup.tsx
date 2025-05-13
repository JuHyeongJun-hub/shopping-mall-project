// src/components/Signup.tsx
import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container, 
  Alert,
  IconButton,
  InputAdornment,
  Link
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

interface SignupResponse {
    id: number;
    email: string;
    name: string;
    role: string;
}

interface SignupError {
    message: string;
}

const Signup = () => {
  // const [formData, setFormData] = useState({
  //   email   : '',
  //   password: '',
  //   passwordConfirm: '',
  //   name: ''
  // });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: ''
  })
  console.log(JSON.stringify(formData));

  // const [error       , setError]        = useState('');
  // const [loading     , setLoading]      = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  // const navigate = useNavigate();

  const [error, setError]               = useState('');
  const [loading, setLoading]           = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate                        = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 비밀번호 확인
    if (formData.password !== formData.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post<SignupResponse>(
      'http://localhost:8080/api/auth/signup',
      {
          email: formData.email,
          password: formData.password,
          name: formData.name
      });

      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      navigate('/login');
    } catch (err) {
        if(err instanceof AxiosError) {
            if(err.response?.status === 409) {
                setError('이미 사용 중인 이메일입니다.');
            } else {
                const errorMessage = (err.response?.data as SignupError)?.message ||
                '회원가입 중 오류가 발생했습니다.';
                setError(errorMessage);
            }
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="signup-container">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
          회원가입
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일 주소"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="비밀번호 표시"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            id="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={(e) => setFormData({...formData, passwordConfirm: e.target.value})}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="이름"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            {loading ? '처리중...' : '회원가입'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link href="/login" variant="body2" sx={{ color: '#666' }}>
              이미 계정이 있으신가요? 로그인하기
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;