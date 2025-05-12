import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container, 
  Alert,
  Divider,
  IconButton,
  InputAdornment,
  Link
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon
} from '@mui/icons-material';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

// interface LoginResponse {
//   token: string;
//   user: {
//     id: number;
//     email: string;
//     name: string;
//     role: string;
//   };
// }

interface LoginResponse {
  token: string;
  user : {
    id: number;
    email: string;
    name: string;
    role: string;
  }
}

interface LoginError {
  message: string;
}

interface SignupError {
  message: string;
}

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate                = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 에러메시지와 로딩 상태를 초기화한다.
    setError('');
    setLoading(true);

    try{
      // 로그인 요청을 하는 axios를 요청한다. (파라미터 email과 password를 전달한다.)
      const response = await axios.post<LoginResponse>('http://localhost:8080/api/auth/login', {
        email,
        password
      })

      // 로그인 성공 시, 토큰과 사용자 정보를 로컬 스토리지에 저장 후 메인 페이지로 이동한다.
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user' , JSON.stringify(response.data.user));
      navigate('/');
    } catch(err) {
      if(err instanceof AxiosError) {
        // 만약 401 에러가 발생하면 "이메일 또는 비밀번호가 올바르지 않았습니다."라는 메시지를 보여준다.
        if(err.response?.status === 401) {
          setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        } else {
          // 만약 401 에러가 아니면 서버의 메세지를 보여주고, 그것도 아니면 "로그인 중 오류가 발생하였습니다. 다시 시도해주세요"라는 메시지를 보여준다.
          //const errorMessage = ( err.response?.data as LoginError)?.message || '로그인 중 오류가 발생하였습니다. 다시 시도해주세요';
          const errorMessage = (err.response?.data as LoginError)?.message || '로그인 중 오류가 발생하였습니다. 다시 시도해주세요';
          setError(errorMessage);
        }
      } else {
        setError('로그인 중 오류가 발생하였습니다. 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs" className="login-container">
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
          로그인
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
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
            로그인
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Link href="/forgot-password" variant="body2" sx={{ color: '#666' }}>
              비밀번호 찾기
            </Link>
            <Link href="/signup" variant="body2" sx={{ color: '#666' }}>
              회원가입
            </Link>
          </Box>

          <Divider sx={{ my: 3 }}>또는</Divider>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <IconButton
              sx={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
            >
              <GoogleIcon />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
            >
              <AppleIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login; 