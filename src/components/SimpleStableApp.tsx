'use client';

import React, { useState, useCallback } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3, Activity, TrendingUp, Grid3X3, Eye, Download, Edit3 } from 'lucide-react';

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

  // 🔧 グラフ描画
  const renderChart = () => {
    if (selectedFields.length === 0) {
      return (
        <div className="text-center py-12">
          <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">項目を選択してください</p>
        </div>
      );
    }

    const { data, fields } = getSelectedData();
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    
    // X軸は常に日付
    const xAxisKey = '日付';
    const numericFields = fields.filter(f => f.type === 'number');

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {numericFields.map((field, index) => (
                <Bar 
                  key={field.id}
                  dataKey={field.key} 
                  fill={colors[index % colors.length]} 
                  name={`${field.name} (${field.unit})`}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {numericFields.map((field, index) => (
                <Line 
                  key={field.id}
                  type="monotone" 
                  dataKey={field.key} 
                  stroke={colors[index % colors.length]} 
                  name={`${field.name} (${field.unit})`}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        const pieField = numericFields[0];
        if (!pieField) {
          return <div className="text-center py-8 text-gray-500">円グラフには数値項目が必要です</div>;
        }
        
        const pieData = data.map(item => ({
          name: item[xAxisKey],
          value: item[pieField.key]
        }));

        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
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
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left">日付</th>
                  {numericFields.map(field => (
                    <th key={field.id} className="border border-gray-300 px-4 py-2 text-left">
                      {field.name} ({field.unit})
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-2">{row[xAxisKey]}</td>
                    {numericFields.map(field => (
                      <td key={field.id} className="border border-gray-300 px-4 py-2">
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

  // 🔧 エクスポート機能（シンプル版）
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            製造業データ可視化ツール
          </h1>
          <p className="text-gray-600">
            シンプル・確実動作版 - サンプルデータで即座に体験
          </p>
        </header>

        {/* プロジェクト名 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-3">プロジェクト名</h2>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="プロジェクト名を入力"
          />
        </div>

        {/* 項目選択 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📊 可視化する項目を選択</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {AVAILABLE_FIELDS.map(field => (
              <label key={field.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedFields.includes(field.id)}
                  onChange={() => handleFieldToggle(field.id)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <div>
                  <span className="font-medium text-gray-900">{field.name}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    {field.unit ? `(${field.unit})` : field.type === 'string' ? '(カテゴリ)' : ''}
                  </span>
                </div>
              </label>
            ))}
          </div>

          {/* グラフタイプ選択 */}
          <h3 className="text-lg font-semibold mb-3">📈 グラフタイプ</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { type: 'bar', icon: BarChart3, name: '棒グラフ' },
              { type: 'line', icon: Activity, name: '線グラフ' },
              { type: 'pie', icon: TrendingUp, name: '円グラフ' },
              { type: 'table', icon: Grid3X3, name: '表' }
            ].map(({ type, icon: Icon, name }) => (
              <button
                key={type}
                onClick={() => handleChartTypeChange(type)}
                className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center ${
                  chartType === type
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Icon className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* プレビューエリア */}
        {showPreview && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Eye className="mr-2" />
                リアルタイムプレビュー
              </h2>
              <div className="text-sm text-gray-600">
                選択項目: {selectedFields.length}個 | データ: {SAMPLE_DATA.length}行
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              {renderChart()}
            </div>
          </div>
        )}

        {/* メモ・エクスポート */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Edit3 className="mr-2" />
            メモ・要望
          </h2>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="お客様からの要望や気づいた点を記録..."
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>レポートをエクスポート</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
