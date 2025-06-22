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

  // 🔧 グラフ描画
  const renderChart = () => {
    if (selectedFields.length === 0) {
      return (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
            <BarChart3 className="h-16 w-16 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">項目を選択してください</h3>
          <p className="text-gray-500">上記のチェックボックスから可視化したい項目を選んでください</p>
        </div>
      );
    }

    const { data, fields } = getSelectedData();
    const colors = ['#4F46E5', '#059669', '#DC2626', '#9333EA', '#EA580C'];
    
    const xAxisKey = '日付';
    const numericFields = fields.filter(f => f.type === 'number');

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={450}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} stroke="#6B7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
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
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} stroke="#6B7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
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
            <div className="text-center py-16">
              <div className="bg-gradient-to-br from-orange-100 to-red-100 w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
                <TrendingUp className="h-16 w-16 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600">円グラフには数値項目が必要です</h3>
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
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                    日付
                  </th>
                  {numericFields.map(field => (
                    <th key={field.id} className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                      {field.name} <span className="text-gray-500">({field.unit})</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row[xAxisKey]}
                    </td>
                    {numericFields.map(field => (
                      <td key={field.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヘッダー */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <Zap className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            製造業データ可視化ツール
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            プロフェッショナルグレード・データ分析プラットフォーム
          </p>
        </header>

        {/* プロジェクト名 */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4"></div>
            プロジェクト名
          </h2>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full p-4 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm"
            placeholder="プロジェクト名を入力してください"
          />
        </div>

        {/* 項目選択 */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <div className="w-3 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full mr-4"></div>
            可視化する項目を選択
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
            {AVAILABLE_FIELDS.map(field => (
              <label 
                key={field.id} 
                className={`group relative flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedFields.includes(field.id) 
                    ? 'border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-500/10' 
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedFields.includes(field.id)}
                  onChange={() => handleFieldToggle(field.id)}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500/20 transition-colors"
                />
                <div className="ml-4 flex-1">
                  <div className="font-semibold text-lg text-gray-900">{field.name}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {field.unit ? `単位: ${field.unit}` : 'カテゴリデータ'}
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full transition-opacity ${
                  selectedFields.includes(field.id) ? 'bg-blue-500 opacity-100' : 'bg-gray-300 opacity-0'
                }`}></div>
              </label>
            ))}
          </div>

          {/* グラフタイプ選択 */}
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-4"></div>
            グラフタイプ
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { type: 'bar', icon: BarChart3, name: '棒グラフ', desc: '比較に最適' },
              { type: 'line', icon: Activity, name: '線グラフ', desc: 'トレンド分析' },
              { type: 'pie', icon: TrendingUp, name: '円グラフ', desc: '割合表示' },
              { type: 'table', icon: Grid3X3, name: '表', desc: '詳細データ' }
            ].map(({ type, icon: Icon, name, desc }) => (
              <button
                key={type}
                onClick={() => handleChartTypeChange(type)}
                className={`group p-6 rounded-2xl border-2 transition-all duration-200 ${
                  chartType === type
                    ? 'border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-500/10'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <Icon className={`h-12 w-12 mx-auto mb-4 transition-colors ${
                  chartType === type ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                }`} />
                <div className={`font-semibold text-lg mb-1 transition-colors ${
                  chartType === type ? 'text-blue-900' : 'text-gray-700'
                }`}>
                  {name}
                </div>
                <div className="text-sm text-gray-500">{desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* プレビューエリア */}
        {showPreview && (
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 mb-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <div className="w-3 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-4"></div>
                リアルタイムプレビュー
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="bg-gray-100 px-4 py-2 rounded-xl">
                  選択項目: {selectedFields.length}個
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-xl">
                  データ: {SAMPLE_DATA.length}行
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-inner border border-gray-100">
              {renderChart()}
            </div>
          </div>
        )}

        {/* メモ・エクスポート */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="w-3 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full mr-4"></div>
            メモ・要望
          </h2>
          
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="w-full h-48 p-6 text-lg bg-white border-2 border-gray-200 rounded-2xl resize-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm"
            placeholder="お客様からの要望や気づいた点を記録してください..."
          />
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleExport}
              className="group flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-lg"
            >
              <Download className="h-6 w-6 group-hover:animate-bounce" />
              <span>レポートをエクスポート</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
