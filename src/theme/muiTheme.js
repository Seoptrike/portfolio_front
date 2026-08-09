import { createTheme } from '@mui/material/styles';

/**
 * MUI 다크 테마.
 *
 * 값은 src/styles/tokens.css와 반드시 일치해야 한다. MUI는 런타임에 색을 계산
 * (alpha, lighten 등)하므로 CSS 변수 문자열을 그대로 넘길 수 없어 실제 색상값을
 * 여기에 다시 적는다. 토큰을 바꾸면 이 파일도 함께 바꿀 것.
 */

const palette = {
  bg: '#0b0e14',
  surface: '#141922',
  surface2: '#1c222d',
  surface3: '#262e3b',
  border: '#2a323f',
  borderStrong: '#3a4553',
  text: '#e6eaf0',
  textMuted: '#9aa4b2',
  textSubtle: '#6b7684',
  accent: '#ff8a00',
  accentHover: '#ffa333',
  onAccent: '#1a1205',
};

const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: palette.bg,
      paper: palette.surface,
    },
    primary: {
      main: palette.accent,
      light: palette.accentHover,
      dark: '#e57a00',
      contrastText: palette.onAccent,
    },
    text: {
      primary: palette.text,
      secondary: palette.textMuted,
      disabled: palette.textSubtle,
    },
    divider: palette.border,
    success: { main: '#3fb950' },
    error: { main: '#f85149' },
    warning: { main: '#d29922' },
    info: { main: '#58a6ff' },
  },

  shape: { borderRadius: 10 },

  typography: {
    fontFamily:
      '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },

  components: {
    // 다크에서는 그림자 대신 테두리로 층을 표현한다
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: palette.surface,
        },
        outlined: { borderColor: palette.border },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: palette.surface,
          border: `1px solid ${palette.border}`,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 10 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: palette.surface2,
          '& fieldset': { borderColor: palette.border },
          '&:hover fieldset': { borderColor: palette.borderStrong },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: palette.surface3,
          color: palette.text,
          border: `1px solid ${palette.border}`,
          fontSize: '0.8125rem',
        },
      },
    },
  },
});

export default muiTheme;
