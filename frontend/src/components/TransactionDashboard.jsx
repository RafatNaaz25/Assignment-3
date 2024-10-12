import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../redux/store/transactionsSlice';
import { fetchStatistics } from '../redux/store/statisticsSlice';
import { fetchBarChartData } from '../redux/store/chartsSlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer ,Cell} from 'recharts';

const TransactionDashboard = () => {
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState(3); // March by default
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const transactions = useSelector((state) => state.transactions.data);
  const statistics = useSelector((state) => state.statistics.data);
  const barChartData = useSelector((state) => state.charts.barChartData);
  const totalPages = useSelector((state) => state.transactions.totalPages);

  useEffect(() => {
    dispatch(fetchTransactions({ search: searchTerm, month: selectedMonth, page: currentPage, perPage: 10 }));
    dispatch(fetchStatistics(selectedMonth));
    dispatch(fetchBarChartData(selectedMonth));
  }, [dispatch, selectedMonth, searchTerm, currentPage]);

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center mt-5">Transaction Dashboard</h1>
      
      <div className="mb-8">
        <select 
          value={selectedMonth} 
          onChange={handleMonthChange}
          className="mr-4 p-2 border rounded"
        >
          {months.map((month, index) => (
            <option key={index} value={index + 1}>{month}</option>
          ))}
        </select>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={handleSearchChange}
          placeholder="Search transactions"
          className="p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-6 rounded-2xl">
          <h2 className="font-bold text-center text-xl">Total Sale Amount</h2>
          <p className="text-center p-2 text-xl">{statistics?.totalSaleAmount || 0}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-2xl">
          <h2 className="font-bold text-center text-xl">Total Sold Items</h2>
          <p className="text-center text-xl p-2">{statistics?.totalSoldItems || 0}</p>
        </div>
        <div className="bg-red-100 p-6 rounded-2xl">
          <h2 className="font-bold text-center text-xl">Total Not Sold Items</h2>
          <p className="text-center text-xl p-2">{statistics?.totalNotSoldItems || 0}</p>
        </div>
      </div>

      
       <div className="overflow-x-auto shadow-md rounded-lg mb-8">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-blue-400 text-white">
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Description</th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Sold</th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Date of Sale</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {transactions.map((transaction, index) => (
              <tr key={transaction.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-3 text-sm">{transaction.id}</td>
                <td className="px-4 py-3 text-sm font-medium">{transaction.title}</td>
                <td className="px-4 py-3 text-sm">{transaction.description}</td>
                <td className="px-4 py-3 text-sm">${transaction.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm">{transaction.category}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.sold ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.sold ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <button 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1}
          className="mr-2 p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
          className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div> */}

<div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Transaction Distribution</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="range" 
                tick={{ fill: '#666', fontSize: 12 }}
                axisLine={{ stroke: '#666' }}
              />
              <YAxis 
                tick={{ fill: '#666', fontSize: 12 }}
                axisLine={{ stroke: '#666' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  border: '1px solid #cccccc',
                  borderRadius: '4px',
                  padding: '10px'
                }}
              />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '20px'
                }}
              />
              <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]}>
                {barChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TransactionDashboard;