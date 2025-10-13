import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

export default function StockMarketChart() {
  const [timeRange, setTimeRange] = useState('1Y');
  const [apiData, setApiData] = useState(null);

  // Sample API data (replace with actual API call)
  const sampleApiData = {
    "status": "success",
    "user_id": "4",
    "summaries": [
      {"date": "2025-07-21", "totalCost": "1493624.96", "currentValue": 1666004.6967, "sensex": 1473357.908, "xirr": 14.93},
      {"date": "2025-07-22", "totalCost": "1493624.96", "currentValue": 1768421.9578999998, "sensex": 1469683.336, "xirr": 16.31},
      {"date": "2025-07-23", "totalCost": "1493624.96", "currentValue": 1775710.5327, "sensex": 1476420.052, "xirr": 16.77},
      {"date": "2025-07-24", "totalCost": "1493624.96", "currentValue": 1767621.6918999997, "sensex": 1468400.152, "xirr": 16.12},
      {"date": "2025-07-25", "totalCost": "1493624.96", "currentValue": 1733121.2932000002, "sensex": 1450887.604, "xirr": 15.23},
      {"date": "2025-07-28", "totalCost": "1493624.96", "currentValue": 1723938.1300000001, "sensex": 1440447.148, "xirr": 14.39},
      {"date": "2025-07-29", "totalCost": "1493624.96", "currentValue": 1734115.5298000001, "sensex": 1450537.644, "xirr": 15.02},
      {"date": "2025-07-30", "totalCost": "1493624.96", "currentValue": 1740588.4562000004, "sensex": 1452141.624, "xirr": 15.37},
      {"date": "2025-07-31", "totalCost": "1493624.96", "currentValue": 1732740.1382, "sensex": 1444748.732, "xirr": 14.78},
      {"date": "2025-08-01", "totalCost": "1493624.96", "currentValue": 1715004.2301, "sensex": 1429875.46, "xirr": 13.57},
      {"date": "2025-08-04", "totalCost": "1493624.96", "currentValue": 1724616.7261, "sensex": 1441394.956, "xirr": 14.08},
      {"date": "2025-08-05", "totalCost": "1493624.96", "currentValue": 1722119.8462, "sensex": 1437559.984, "xirr": 13.85},
      {"date": "2025-08-06", "totalCost": "1493624.96", "currentValue": 1713170.3793000004, "sensex": 1429525.504, "xirr": 13.22},
      {"date": "2025-08-07", "totalCost": "1493624.96", "currentValue": 1714870.5724, "sensex": 1431275.3, "xirr": 13.3},
      {"date": "2025-08-08", "totalCost": "1493624.96", "currentValue": 1700058.4679, "sensex": 1415556.292, "xirr": 12.31},
      {"date": "2025-08-11", "totalCost": "1493624.96", "currentValue": 1711191.6543000005, "sensex": 1427425.748, "xirr": 12.89},
      {"date": "2025-08-12", "totalCost": "1493624.96", "currentValue": 1710194.3365, "sensex": 1423911.572, "xirr": 12.79},
      {"date": "2025-08-13", "totalCost": "1493624.96", "currentValue": 1719577.5022, "sensex": 1432062.708, "xirr": 13.34},
      {"date": "2025-08-14", "totalCost": "1493624.96", "currentValue": 1719915.135, "sensex": 1431348.208, "xirr": 13.32},
      {"date": "2025-08-18", "totalCost": "1546824.96", "currentValue": 1735757.4144, "sensex": 1447023.468, "xirr": 14.13},
      {"date": "2025-08-19", "totalCost": "1546824.96", "currentValue": 1756608.3278, "sensex": 1455539.144, "xirr": 14.59},
      {"date": "2025-08-20", "totalCost": "1546824.96", "currentValue": 1760617.4187, "sensex": 1460321.924, "xirr": 14.8},
      {"date": "2025-08-21", "totalCost": "1546824.96", "currentValue": 1760525.7553, "sensex": 1460015.708, "xirr": 14.77},
      {"date": "2025-08-22", "totalCost": "1546824.96", "currentValue": 1753923.9215000002, "sensex": 1450858.44, "xirr": 14.3},
      {"date": "2025-08-25", "totalCost": "1546824.96", "currentValue": 1758555.8627999998, "sensex": 1454649.664, "xirr": 14.46},
      {"date": "2025-08-26", "totalCost": "1546824.96", "currentValue": 1740876.995, "sensex": 1436757.996, "xirr": 13.34},
      {"date": "2025-08-28", "totalCost": "1546824.96", "currentValue": 1729743.2703999998, "sensex": 1422365.916, "xirr": 12.56},
      {"date": "2025-08-29", "totalCost": "1546824.96", "currentValue": 1725898.3886, "sensex": 0, "xirr": 12.3},
      {"date": "2025-09-01", "totalCost": "1546824.96", "currentValue": 1741107.3953, "sensex": 1432995.932, "xirr": 13.11},
      {"date": "2025-09-02", "totalCost": "1546824.96", "currentValue": 1740711.0951, "sensex": 1433608.36, "xirr": 13.05},
      {"date": "2025-09-03", "totalCost": "1546824.96", "currentValue": 1750328.3114999998, "sensex": 1442386.508, "xirr": 13.59},
      {"date": "2025-09-04", "totalCost": "1546824.96", "currentValue": 1746404.5843999998, "sensex": 1439732.648, "xirr": 13.32},
      {"date": "2025-09-05", "totalCost": "1546824.96", "currentValue": 1747775.1815999995, "sensex": 1440272.168, "xirr": 13.35},
      {"date": "2025-09-08", "totalCost": "1546824.96", "currentValue": 1750848.7380000001, "sensex": 1443305.152, "xirr": 13.39},
      {"date": "2025-09-09", "totalCost": "1546824.96", "currentValue": 1756261.3780999999, "sensex": 1447737.968, "xirr": 13.67},
      {"date": "2025-09-10", "totalCost": "1546824.96", "currentValue": 1764211.6482, "sensex": 1455612.052, "xirr": 14.1},
      {"date": "2025-09-11", "totalCost": "1546824.96", "currentValue": 1767865.7850000001, "sensex": 1457376.432, "xirr": 14.27},
      {"date": "2025-09-12", "totalCost": "1546824.96", "currentValue": 1775670.4349000002, "sensex": 1462859.128, "xirr": 14.66},
      {"date": "2025-09-17", "totalCost": "1546824.96", "currentValue": 1828555.9424, "sensex": 1478753.112, "xirr": 15.39},
      {"date": "2025-09-18", "totalCost": "1546824.96", "currentValue": 1833373.4984000002, "sensex": 1483390.076, "xirr": 15.64},
      {"date": "2025-09-19", "totalCost": "1546824.96", "currentValue": 1831887.0067999999, "sensex": 1481319.48, "xirr": 15.5},
      {"date": "2025-09-22", "totalCost": "1546824.96", "currentValue": 1824806.8656000001, "sensex": 1474626.508, "xirr": 14.98},
      {"date": "2025-09-23", "totalCost": "1546824.96", "currentValue": 1824411.8816, "sensex": 1471068.588, "xirr": 14.89},
      {"date": "2025-09-24", "totalCost": "1546824.96", "currentValue": 1796681.5507, "sensex": 1461750.924, "xirr": 14.64},
      {"date": "2025-09-25", "totalCost": "1546824.96", "currentValue": 1788019.1537, "sensex": 1451908.316, "xirr": 14.11},
      {"date": "2025-09-26", "totalCost": "1546824.96", "currentValue": 1768143.2061000005, "sensex": 1432398.084, "xirr": 13.02},
      {"date": "2025-09-29", "totalCost": "1546824.96", "currentValue": 1768585.4934, "sensex": 1433899.992, "xirr": 12.92},
      {"date": "2025-09-30", "totalCost": "1546824.96", "currentValue": 1768749.934, "sensex": 1433520.872, "xirr": 12.88},
      {"date": "2025-10-01", "totalCost": "1546824.96", "currentValue": 1781670.546, "sensex": 1445696.54, "xirr": 13.57},
      {"date": "2025-10-03", "totalCost": "1546824.96", "currentValue": 1789193.905, "sensex": 1451879.152, "xirr": 13.91},
      {"date": "2025-10-06", "totalCost": "1546824.96", "currentValue": 1798003.2737, "sensex": 1460701.044, "xirr": 14.28},
      {"date": "2025-10-07", "totalCost": "1546824.96", "currentValue": 1797209.2548000002, "sensex": 1463179.924, "xirr": 14.23},
      {"date": "2025-10-08", "totalCost": "1546824.96", "currentValue": 1789741.2256999996, "sensex": 1456836.912, "xirr": 13.85}
    ]
  };

  useEffect(() => {
    // Simulate API call - replace with actual fetch
    setApiData(sampleApiData);
  }, []);

  // Filter and process data based on time range
  const generateData = (range) => {
    if (!apiData || !apiData.summaries || apiData.summaries.length === 0) {
      return [['Date', 'Portfolio Value', 'SENSEX', 'Total Cost', 'XIRR']];
    }

    const allData = [...apiData.summaries];
    const latestDate = new Date(allData[allData.length - 1].date);
    let filteredData = [];
    let cutoffDate = new Date(latestDate);

    // Calculate cutoff date based on time range
    switch(range) {
      case '5D':
        // Get last 5 days of data
        cutoffDate.setDate(cutoffDate.getDate() - 5);
        filteredData = allData.filter(d => new Date(d.date) >= cutoffDate);
        break;
      case '1M':
        // Get last 1 month of data
        cutoffDate.setMonth(cutoffDate.getMonth() - 1);
        filteredData = allData.filter(d => new Date(d.date) >= cutoffDate);
        break;
      case '6M':
        // Get last 6 months of data
        cutoffDate.setMonth(cutoffDate.getMonth() - 6);
        filteredData = allData.filter(d => new Date(d.date) >= cutoffDate);
        break;
      case 'YTD':
        // Get data from start of current year
        const yearStart = new Date(latestDate.getFullYear(), 0, 1);
        filteredData = allData.filter(d => new Date(d.date) >= yearStart);
        break;
      case '1Y':
        // Get last 1 year of data
        cutoffDate.setFullYear(cutoffDate.getFullYear() - 1);
        filteredData = allData.filter(d => new Date(d.date) >= cutoffDate);
        break;
      case '5Y':
        // Get last 5 years of data
        cutoffDate.setFullYear(cutoffDate.getFullYear() - 5);
        filteredData = allData.filter(d => new Date(d.date) >= cutoffDate);
        break;
      case 'MAX':
        // Use all available data
        filteredData = allData;
        break;
      default:
        filteredData = allData;
        break;
    }

    // Ensure we have at least one data point
    if (filteredData.length === 0) {
      filteredData = [allData[allData.length - 1]];
    }

    // Calculate percentage changes from first value in the filtered range
    const firstValue = filteredData[0];
    const data = [['Date', 'Portfolio Value', 'SENSEX', 'Total Cost', 'XIRR']];
    
    filteredData.forEach(item => {
      const date = new Date(item.date);
      const portfolioChange = ((item.currentValue - firstValue.currentValue) / firstValue.currentValue) * 100;
      const sensexChange = item.sensex > 0 && firstValue.sensex > 0 
        ? ((item.sensex - firstValue.sensex) / firstValue.sensex) * 100 
        : null;
      const costChange = ((parseFloat(item.totalCost) - parseFloat(firstValue.totalCost)) / parseFloat(firstValue.totalCost)) * 100;
      const xirrChange = ((item.xirr - firstValue.xirr) / Math.abs(firstValue.xirr)) * 100;
      
      data.push([
        date,
        portfolioChange,
        sensexChange,
        costChange,
        xirrChange
      ]);
    });
    
    return data;
  };

  const data = generateData(timeRange);

  // Calculate current stats
  const calculateStats = () => {
    if (!apiData || !apiData.summaries || apiData.summaries.length === 0) {
      return [];
    }

    const latest = apiData.summaries[apiData.summaries.length - 1];
    const previous = apiData.summaries[apiData.summaries.length - 2] || latest;

    const portfolioChange = latest.currentValue - previous.currentValue;
    const portfolioPercent = ((portfolioChange / previous.currentValue) * 100).toFixed(2);
    
    const sensexChange = latest.sensex > 0 && previous.sensex > 0 ? latest.sensex - previous.sensex : 0;
    const sensexPercent = previous.sensex > 0 ? ((sensexChange / previous.sensex) * 100).toFixed(2) : '0.00';
    
    const xirrChange = latest.xirr - previous.xirr;
    const xirrPercent = ((xirrChange / Math.abs(previous.xirr)) * 100).toFixed(2);

    return [
      {
        name: 'Portfolio Value',
        value: latest.currentValue.toLocaleString('en-IN', { maximumFractionDigits: 2 }),
        change: portfolioChange >= 0 ? `+${portfolioChange.toFixed(2)}` : portfolioChange.toFixed(2),
        percent: `${portfolioPercent}%`,
        color: '#00bcd4'
      },
      {
        name: 'SENSEX',
        value: latest.sensex > 0 ? latest.sensex.toLocaleString('en-IN', { maximumFractionDigits: 2 }) : 'N/A',
        change: sensexChange >= 0 ? `+${sensexChange.toFixed(2)}` : sensexChange.toFixed(2),
        percent: `${sensexPercent}%`,
        color: '#9c27b0'
      },
      {
        name: 'Total Cost',
        value: parseFloat(latest.totalCost).toLocaleString('en-IN', { maximumFractionDigits: 2 }),
        change: '0.00',
        percent: '0.00%',
        color: '#2196f3'
      },
      {
        name: 'XIRR',
        value: `${latest.xirr.toFixed(2)}%`,
        change: xirrChange >= 0 ? `+${xirrChange.toFixed(2)}` : xirrChange.toFixed(2),
        percent: `${xirrPercent}%`,
        color: '#ff9800'
      }
    ];
  };

  const stockData = apiData ? calculateStats() : [];

  const options = {
    curveType: 'function',
    legend: { position: 'none' },
    chartArea: { width: '85%', height: '70%', top: 20 },
    hAxis: {
      format: 'MMM dd',
      gridlines: { color: '#f0f0f0' },
      textStyle: { color: '#666', fontSize: 11 }
    },
    vAxis: {
      title: '',
      format: '#\'%\'',
      gridlines: { color: '#f0f0f0' },
      textStyle: { color: '#666', fontSize: 11 }
    },
    colors: [ '#00bcd4', '#9c27b0', '#2196f3', '#ff9800' ],
    lineWidth: 2,
    backgroundColor: 'white',
    tooltip: { isHtml: true },
    series: {
      1: { lineDashStyle: [4, 4] }, // SENSEX dashed
      2: { lineDashStyle: [2, 2] }, // Total Cost dotted
      3: { lineWidth: 1 } // XIRR thinner
    }
  };

  const timeRanges = ['5D', '1M', '6M', 'YTD', '1Y', '5Y', 'MAX'];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ border: '2px solid #e0e0e0', borderRadius: '8px', padding: '20px', backgroundColor: 'white' }}>
        {/* Time Range Selector */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '20px',
          borderBottom: '1px solid #e0e0e0',
          paddingBottom: '10px'
        }}>
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              style={{
                padding: '8px 12px',
                border: 'none',
                background: timeRange === range ? '#fff' : 'transparent',
                color: timeRange === range ? '#000' : '#666',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: timeRange === range ? 'bold' : 'normal',
                borderBottom: timeRange === range ? '3px solid #d32f2f' : 'none',
                transition: 'all 0.2s'
              }}
            >
              {range}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Chart */}
          <div style={{ flex: 1 }}>
            <Chart
              chartType="LineChart"
              width="100%"
              height="400px"
              data={data}
              options={options}
            />
          </div>

          {/* Legend/Stats Panel */}
          <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {stockData.map((stock, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: '10px',
                fontSize: '13px'
              }}>
                <div style={{ 
                  width: '3px', 
                  height: '20px', 
                  backgroundColor: stock.color,
                  borderRadius: '2px'
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500', color: '#333', marginBottom: '2px' }}>
                    {stock.name}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '12px' }}>
                    <span style={{ color: '#666' }}>{stock.value}</span>
                    <span style={{ color: stock.change.startsWith('+') ? '#4caf50' : '#f44336' }}>
                      {stock.change}
                    </span>
                    <span style={{ color: stock.change.startsWith('+') ? '#4caf50' : '#f44336' }}>
                      {stock.change.startsWith('+') ? '▲' : '▼'}{stock.percent}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}