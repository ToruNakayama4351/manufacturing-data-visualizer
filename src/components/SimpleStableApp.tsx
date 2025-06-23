'use client';

import React, { useState, useCallback } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3, Activity, TrendingUp, Grid3X3, Eye, Download, Edit3, Zap } from 'lucide-react';

// 🔧 固定のサンプルデータ（製造業向け）
const SAMPLE_DATA = [
  { 日付: '1/1', 温度: 25.2, 湿度: 65, SPM: 1150, 不良率: 2.1, 生産数: 450 },
  { 日付: '1/2', 温度: 26.8, 湿度: 68, SPM: 1200, 不良率: 1.8, 生産数: 480 },
  { 日付: '1/3', 温度: 24.5, 湿度: 62, SPM: 1080, 不良率: 2.5, 生産数: 420 },
  { 日付: '1/4', 温度: 27.1, 湿度: 70, SPM: 1250, 不良率: 1.5, 生産数: 520 },
  { 日付: '1/5', 温度: 25.9, 湿度: 66, SPM: 1180, 不良率: 1.9, 生産数: 460 },
  { 日付: '1/6', 温度: 23.8, 湿度: 58, SPM: 1020, 不良率: 3.2, 生産数: 380 },
  { 日付: '1/7', 温度: 26.3, 湿度: 67, SPM: 1220, 不良率: 1.7, 生産数: 500 },
];

// 🔧 使用可能な項目（固定）
const AVAILABLE_FIELDS = [
  { id: 'temp', name: '温度', type: 'number', key: '温度', unit: '°C' },
  { id: 'humidity', name: '湿度', type: 'number', key: '湿度', unit: '%' },
  { id: 'spm', name: 'SPM', type: 'number', key: 'SPM', unit: 'shot/min' },
  { id: 'defect_rate', name: '不良率', type: 'number', key: '不良率', unit: '%' },
  { id: 'production', name: '生産数', type: 'number', key: '生産数', unit: '個' },
  { id: 'date', name: '日付', type: 'string', key: '日付', unit: '' },
];

export default function SimpleStableApp() {
  const [selectedFields, setSelectedFields] = useState(['temp', 'humidity']);
  const [chartType, setChartType] = useState('bar');
  const [showPreview, setShowPreview] = useState(true);
  const [memo, setMemo] = useState('');
  const [projectName, setProjectName] = useState('製造ライン_データ分析');

  // 🔧 項目選択の処理
  const handleFieldToggle = useCallback((fieldId) => {
    setSelectedFields(prev => 
      prev.includes(fieldId) 
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  }, []);

  // 🔧 チャートタイプ変更
  const handleChartTypeChange = useCallback((type) => {
    setChartType(type);
  }, []);

  // 🔧 選択された項目のデータを取得
  const getSelectedData = () => {
    const fields = AVAILABLE_FIELDS.filter(f => selectedFields.includes(f.id));
    return { data: SAMPLE_DATA, fields };
  };

  // 🎨 スタイル定義（確実に動作する inline style）
  const styles = {
    // メインコンテナ
    mainContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e8eaf6 100%)',
      padding: '40px 20px',
    },
    // カードベース
    cardBase: {
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(10px)',
      borderRadius: '24px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '32px',
      marginBottom: '32px',
    },
    // セクションタイトル
    sectionTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
    },
    // アクセントバー
    accentBar: (color) => ({
      width: '4px',
      height: '32px',
      background: `linear-gradient(to bottom, ${color}, ${color}dd)`,
      borderRadius: '4px',
      marginRight: '16px',
    }),
    // 項目カード
    fieldCard: (isSelected) => ({
      display: 'flex',
      alignItems: 'center',
      padding: '20px',
      border: `2px solid ${isSelected ? '#3b82f6' : '#e5e7eb'}`,
      borderRadius: '16px',
      background: isSelected ? 'rgba(59, 130, 246, 0.05)' : 'white',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginBottom: '16px',
      boxShadow: isSelected ? '0 8px 25px -8px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
    }),
    // ボタンスタイル
    chartButton: (isActive) => ({
      padding: '20px',
      border: `2px solid ${isActive ? '#3b82f6' : '#e5e7eb'}`,
      borderRadius: '16px',
      background: isActive ? 'rgba(59, 130, 246, 0.05)' : 'white',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      boxShadow: isActive ? '0 8px 25px -8px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
    }),
    // インプットスタイル
    inputStyle: {
      width: '100%',
      padding: '16px',
      fontSize: '18px',
      border: '2px solid #e5e7eb',
      borderRadius: '16px',
      background: 'white',
      outline: 'none',
      transition: 'all 0.2s ease',
    },
    // テキストエリア
    textareaStyle: {
      width: '100%',
      height: '160px',
      padding: '16px',
      fontSize: '16px',
      border: '2px solid #e5e7eb',
      borderRadius: '16px',
      background: 'white',
      outline: 'none',
      resize: 'none',
      transition: 'all 0.2s ease',
    },
    // エクスポートボタン
    exportButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      color: 'white',
      padding: '16px 32px',
      borderRadius: '16px',
      border: 'none',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: '0 8px 25px -8px rgba(59, 130, 246, 0.4)',
    },
  };

  // 🔧 グラフ描画
  const renderChart = () => {
    if (selectedFields.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            margin: '0 auto 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <BarChart3 style={{ width: '60px', height: '60px', color: '#9ca3af' }} />
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#6b7280', marginBottom: '8px' }}>
            項目を選択してください
          </h3>
          <p style={{ fontSize: '16px', color: '#9ca3af' }}>
            上記のチェックボックスから可視化したい項目を選んでください
          </p>
        </div>
      );
    }

    const { data, fields } = getSelectedData();
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    
    const xAxisKey = '日付';
    const numericFields = fields.filter(f => f.type === 'number');

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={450}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              {numericFields.map((field, index) => (
                <Bar 
                  key={field.id}
                  dataKey={field.key} 
                  fill={colors[index % colors.length]} 
                  name={`${field.name} (${field.unit})`}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={450}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              {numericFields.map((field, index) => (
                <Line 
                  key={field.id}
                  type="monotone" 
                  dataKey={field.key} 
                  stroke={colors[index % colors.length]} 
                  strokeWidth={3}
                  dot={{ r: 6, fill: colors[index % colors.length] }}
                  name={`${field.name} (${field.unit})`}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        const pieField = numericFields[0];
        if (!pieField) {
          return (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #fef3c7, #fbbf24)',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <TrendingUp style={{ width: '60px', height: '60px', color: '#d97706' }} />
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#6b7280' }}>
                円グラフには数値項目が必要です
              </h3>
            </div>
          );
        }
        
        const pieData = data.map(item => ({
          name: item[xAxisKey],
          value: item[pieField.key]
        }));

        return (
          <ResponsiveContainer width="100%" height={450}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={140}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} ${pieField.unit}`, pieField.name]} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'table':
        return (
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)' }}>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    borderBottom: '2px solid #e5e7eb'
                  }}>
                    日付
                  </th>
                  {numericFields.map(field => (
                    <th key={field.id} style={{
                      padding: '16px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#1f2937',
                      borderBottom: '2px solid #e5e7eb'
                    }}>
                      {field.name} <span style={{ color: '#6b7280' }}>({field.unit})</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} style={{ background: index % 2 === 0 ? 'white' : '#f9fafb' }}>
                    <td style={{
                      padding: '12px 16px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#1f2937',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      {row[xAxisKey]}
                    </td>
                    {numericFields.map(field => (
                      <td key={field.id} style={{
                        padding: '12px 16px',
                        fontSize: '14px',
                        color: '#6b7280',
                        borderBottom: '1px solid #e5e7eb'
                      }}>
                        {typeof row[field.key] === 'number' ? row[field.key].toFixed(1) : row[field.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  // 🔧 エクスポート機能
  const handleExport = () => {
    const selectedFieldNames = AVAILABLE_FIELDS
      .filter(f => selectedFields.includes(f.id))
      .map(f => f.name)
      .join(', ');

    const exportText = `
プロジェクト: ${projectName}
選択項目: ${selectedFieldNames}
グラフタイプ: ${chartType === 'bar' ? '棒グラフ' : chartType === 'line' ? '線グラフ' : chartType === 'pie' ? '円グラフ' : '表'}
メモ: ${memo}
作成日時: ${new Date().toLocaleString('ja-JP')}
    `.trim();

    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName}_${new Date().toLocaleDateString('ja-JP')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.mainContainer}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* ヘッダー */}
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            borderRadius: '20px',
            marginBottom: '24px',
            boxShadow: '0 10px 25px -3px rgba(59, 130, 246, 0.3)',
          }}>
            <Zap style={{ width: '40px', height: '40px', color: 'white' }} />
          </div>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #1f2937, #4b5563)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
            lineHeight: '1.2',
          }}>
            製造業データ可視化ツール
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            プロフェッショナルグレード・データ分析プラットフォーム
          </p>
        </header>

        {/* プロジェクト名 */}
        <div style={styles.cardBase}>
          <h2 style={styles.sectionTitle}>
            <div style={styles.accentBar('#3b82f6')}></div>
            プロジェクト名
          </h2>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            style={styles.inputStyle}
            placeholder="プロジェクト名を入力してください"
          />
        </div>

        {/* 項目選択 */}
        <div style={styles.cardBase}>
          <h2 style={styles.sectionTitle}>
            <div style={styles.accentBar('#10b981')}></div>
            可視化する項目を選択
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '40px' }}>
            {AVAILABLE_FIELDS.map(field => (
              <label 
                key={field.id} 
                style={styles.fieldCard(selectedFields.includes(field.id))}
                onMouseEnter={(e) => {
                  if (!selectedFields.includes(field.id)) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px -8px rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedFields.includes(field.id)) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                  }
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedFields.includes(field.id)}
                  onChange={() => handleFieldToggle(field.id)}
                  style={{ width: '20px', height: '20px', marginRight: '16px' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>
                    {field.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    {field.unit ? `単位: ${field.unit}` : 'カテゴリデータ'}
                  </div>
                </div>
              </label>
            ))}
          </div>

          {/* グラフタイプ選択 */}
          <h3 style={styles.sectionTitle}>
            <div style={styles.accentBar('#8b5cf6')}></div>
            グラフタイプ
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { type: 'bar', icon: BarChart3, name: '棒グラフ', desc: '比較に最適' },
              { type: 'line', icon: Activity, name: '線グラフ', desc: 'トレンド分析' },
              { type: 'pie', icon: TrendingUp, name: '円グラフ', desc: '割合表示' },
              { type: 'table', icon: Grid3X3, name: '表', desc: '詳細データ' }
            ].map(({ type, icon: Icon, name, desc }) => (
              <button
                key={type}
                onClick={() => handleChartTypeChange(type)}
                style={styles.chartButton(chartType === type)}
                onMouseEnter={(e) => {
                  if (chartType !== type) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px -8px rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (chartType !== type) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                  }
                }}
              >
                <Icon style={{ 
                  width: '48px', 
                  height: '48px', 
                  marginBottom: '12px',
                  color: chartType === type ? '#3b82f6' : '#9ca3af'
                }} />
                <div style={{ 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  marginBottom: '4px',
                  color: chartType === type ? '#1d4ed8' : '#374151'
                }}>
                  {name}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* プレビューエリア */}
        {showPreview && (
          <div style={styles.cardBase}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={styles.sectionTitle}>
                <div style={styles.accentBar('#f59e0b')}></div>
                リアルタイムプレビュー
              </h2>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{
                  background: '#f3f4f6',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  選択項目: {selectedFields.length}個
                </div>
                <div style={{
                  background: '#f3f4f6',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  データ: {SAMPLE_DATA.length}行
                </div>
              </div>
            </div>
            
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
              border: '1px solid #f3f4f6'
            }}>
              {renderChart()}
            </div>
          </div>
        )}

        {/* メモ・エクスポート */}
        <div style={styles.cardBase}>
          <h2 style={styles.sectionTitle}>
            <div style={styles.accentBar('#ef4444')}></div>
            メモ・要望
          </h2>
          
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            style={styles.textareaStyle}
            placeholder="お客様からの要望や気づいた点を記録してください..."
          />
          
          <div style={{ marginTop: '32px', textAlign: 'right' }}>
            <button
              onClick={handleExport}
              style={styles.exportButton}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 25px -8px rgba(59, 130, 246, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px -8px rgba(59, 130, 246, 0.4)';
              }}
            >
              <Download style={{ width: '24px', height: '24px' }} />
              <span>レポートをエクスポート</span>
            </button>
          </div>
        </div>

        {/* 更新確認用（デバッグ情報） */}
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '12px',
          zIndex: 1000,
        }}>
          更新: {new Date().toLocaleTimeString('ja-JP')}
        </div>
      </div>
    </div>
  );
}
