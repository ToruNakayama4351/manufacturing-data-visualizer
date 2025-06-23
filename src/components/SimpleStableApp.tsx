'use client';

export default function SimpleStableApp() {
  return (
    <div style={{
      backgroundColor: '#FF0000',
      height: '100vh',
      color: 'white',
      padding: '50px',
      fontSize: '32px',
      fontWeight: 'bold'
    }}>
      <h1 style={{fontSize: '48px', marginBottom: '30px'}}>
        🔥 テスト版 - 赤い背景 🔥
      </h1>
      <p style={{fontSize: '24px', marginBottom: '20px'}}>
        これが表示されれば更新は成功しています！
      </p>
      <p style={{fontSize: '18px'}}>
        更新日時: {new Date().toLocaleString('ja-JP')}
      </p>
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: 'blue',
        borderRadius: '20px'
      }}>
        青いボックスも表示されています
      </div>
    </div>
  );
}
