// Reactの useState フックをインポート（状態管理に使用）
import { useState } from 'react'
// Material-UI コンポーネントをインポート
import { 
  Container, // コンテンツを中央に配置するコンテナ
  TextField, // テキスト入力フィールド
  Typography, // テキスト表示用コンポーネント
  Slider, // スライダーコントロール
  Paper, // 影付きの紙のようなコンテナ
  Box, // フレキシブルな配置コンテナ
  CssBaseline, // CSSのリセットとベーススタイル提供
  useMediaQuery, // メディアクエリフック（レスポンシブ対応）
  ThemeProvider, // テーマプロバイダ
  createTheme, // テーマ作成関数
  AppBar, // 上部アプリバー
  Toolbar // アプリバー内ツールバー
} from '@mui/material'
// CSSスタイルのインポート
import './App.css'

// メインのAppコンポーネント
function App() {
  // テキスト状態の初期値を '漢字' に設定
  const [text, setText] = useState('漢字');
  // フォントサイズ状態の初期値を 200px に設定
  const [fontSize, setFontSize] = useState(200);
  
  // システムのダークモード設定を検出するフック
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  // アプリケーションテーマの作成
  const theme = createTheme({
    palette: { // 色パレット設定
      mode: prefersDarkMode ? 'dark' : 'light', // システム設定に基づくモード選択
      primary: {
        main: '#3f51b5', // プライマリカラー（インディゴ）
      },
      secondary: {
        main: '#f50057', // セカンダリカラー（ピンク）
      },
    },
    typography: { // タイポグラフィ設定
      fontFamily: [
        '-apple-system', // Apple システムフォント
        'BlinkMacSystemFont', // macOS Chrome用フォント
        '"Segoe UI"', // Windows用フォント
        'Roboto', // Androidおよび推奨Material-UIフォント
        '"Helvetica Neue"', // macOS用代替フォント
        'Arial', // 一般的なフォールバック
        'sans-serif', // フォントファミリー
        '"Apple Color Emoji"', // Apple絵文字フォント
        '"Segoe UI Emoji"', // Windows絵文字フォント
        '"Segoe UI Symbol"', // Windowsシンボルフォント
      ].join(','), // カンマ区切りのフォントリスト
    },
  });

  // テキスト入力変更ハンドラ
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value); // 入力値で状態を更新
  };

  // フォントサイズ変更ハンドラ
  const handleFontSizeChange = (event: Event, newValue: number | number[]) => {
    setFontSize(newValue as number); // スライダー値でフォントサイズを更新
  };

  // コンポーネントのレンダリング
  return (
    // テーマプロバイダでアプリ全体をラップ
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* CSSリセットとベーススタイル適用 */}
      <Box sx={{ flexGrow: 1 }}> {/* 伸縮可能なコンテナ */}
        <AppBar position="static" color="primary"> {/* 上部アプリバー */}
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              漢字練習アプリ {/* アプリタイトル */}
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ mt: 4 }}> {/* 中央寄せのコンテナ、上部マージン */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}> {/* メインコンテンツ領域（影あり） */}
            <Typography variant="h6" gutterBottom>
              練習したい漢字や文を入力してください {/* 操作説明 */}
            </Typography>
            <TextField
              fullWidth // 幅いっぱい
              variant="outlined" // 枠線付きスタイル
              value={text} // 状態バインド
              onChange={handleTextChange} // 変更ハンドラ
              placeholder="ここに漢字を入力" // プレースホルダー
              sx={{ mb: 3 }} // 下部マージン
            />
            
            <Typography gutterBottom>
              文字サイズ: {fontSize}px {/* 現在のフォントサイズ表示 */}
            </Typography>
            <Slider
              value={fontSize} // 状態バインド
              onChange={handleFontSizeChange} // 変更ハンドラ
              aria-labelledby="font-size-slider" // アクセシビリティラベル
              valueLabelDisplay="auto" // 値ラベル表示
              step={4} // ステップ間隔
              min={24} // 最小値
              max={300} // 最大値
              sx={{ mb: 4 }} // 下部マージン
            />
            
            <Paper 
              elevation={1} // 影の強さ
              sx={{ 
                p: 2, // パディング
                display: 'flex', // フレックスボックス
                justifyContent: 'center', // 水平中央揃え
                alignItems: 'center', // 垂直中央揃え
                minHeight: '200px', // 最小の高さ
                overflowWrap: 'break-word', // 長い単語の折り返し
                textAlign: 'center' // テキスト中央揃え
              }}
            >
              <Typography 
                variant="h2" // 見出しレベル
                component="div" // HTML要素
                sx={{ 
                  fontSize: `${fontSize}px`, // 動的フォントサイズ
                  lineHeight: 1.3, // 行の高さ
                  wordBreak: 'break-all' // どこでも改行可能
                }}
              >
                {text || '漢字を入力してください'} {/* テキスト表示（空の場合はデフォルト） */}
              </Typography>
            </Paper>
          </Paper>
          
          <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}> {/* フッターエリア */}
            <Typography variant="body2" color="text.secondary">
              © 2025 漢字練習アプリ - 漢字の正しい綴りを確認できるアプリ {/* コピーライト */}
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

// コンポーネントをエクスポート
export default App
