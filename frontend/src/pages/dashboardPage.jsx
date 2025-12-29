import React, { useState, useEffect } from "react";
import { Boxes } from "../components/ui/background-boxes";
import { CardSpotlight } from "../components/ui/card-spotlight.jsx";
import { ArrowDownCircle, ArrowUpCircle, Wallet, TrendingUp, Calendar } from "lucide-react";
import { getExpense } from "../api/expenseAPI.js";

export default function DashboardPage() {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getExpense();
      const transactions = response.data || [];
      
      let totalIncome = 0;
      let totalExpenses = 0;

      transactions.forEach((transaction) => {
        if (transaction.type === "income") {
          totalIncome += transaction.amount || 0;
        } else if (transaction.type === "expense") {
          totalExpenses += transaction.amount || 0;
        }
      });

      setIncome(totalIncome);
      setExpenses(totalExpenses);
      setBalance(totalIncome - totalExpenses);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      setIncome(0);
      setExpenses(0);
      setBalance(0);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background */}
      <Boxes className="absolute inset-0 opacity-[0.40] pointer-events-none" />
      
      {/* Main Content Container */}
      <div className="relative z-10 h-full w-full overflow-y-auto">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
          {/* Header Section */}
          <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <div className="flex items-start sm:items-center justify-between mb-3 sm:mb-4 flex-wrap gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2 md:mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent break-words">
                  Dashboard
                </h1>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg break-words">Welcome back! Here's your financial overview</p>
              </div>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-neutral-800/50 backdrop-blur-sm rounded-lg border border-neutral-700">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">Today</span>
              </div>
            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-4 sm:mb-6 md:mb-8">
            {/* Balance Card */}
            <CardSpotlight 
              className="flex flex-col justify-between p-3 sm:p-4 md:p-5 lg:p-6 min-h-[160px] sm:min-h-[180px] md:min-h-[200px] bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-sm border-neutral-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl"
              color="#1e40af"
            >
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-wide mb-1.5 sm:mb-2 md:mb-3">Total Balance</p>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 break-words">
                    {loading ? "..." : `₹${formatAmount(balance)}`}
                  </h2>
                  <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                    <div className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md border flex-shrink-0 ${
                      balance >= 0 
                        ? "bg-green-500/20 border-green-500/30" 
                        : "bg-red-500/20 border-red-500/30"
                    }`}>
                      <p className={`text-[10px] sm:text-xs font-semibold flex items-center gap-1 ${
                        balance >= 0 ? "text-green-400" : "text-red-400"
                      }`}>
                        {balance >= 0 ? (
                          <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        ) : (
                          <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 rotate-180" />
                        )}
                        <span className="whitespace-nowrap">{balance >= 0 ? "Positive" : "Negative"}</span>
                      </p>
                    </div>
                    <span className="text-gray-500 text-[10px] sm:text-xs whitespace-nowrap">current balance</span>
                  </div>
                </div>
                <div className="p-1.5 sm:p-2 md:p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-lg flex-shrink-0">
                  <Wallet className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-blue-400" />
                </div>
              </div>
            </CardSpotlight>

            {/* Income Card */}
            <CardSpotlight 
              className="flex flex-col justify-between p-3 sm:p-4 md:p-5 lg:p-6 min-h-[160px] sm:min-h-[180px] md:min-h-[200px] bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-sm border-neutral-800 hover:border-green-500/50 transition-all duration-300 shadow-xl"
              color="#16a34a"
            >
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-wide mb-1.5 sm:mb-2 md:mb-3">Total Income</p>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-400 mb-2 break-words">
                    {loading ? "..." : `₹${formatAmount(income)}`}
                  </h2>
                  <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                    <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-500/20 rounded-md border border-green-500/30 flex-shrink-0">
                      <p className="text-green-300 text-[10px] sm:text-xs font-semibold flex items-center gap-1">
                        <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        <span className="whitespace-nowrap">Total</span>
                      </p>
                    </div>
                    <span className="text-gray-500 text-[10px] sm:text-xs whitespace-nowrap">all time</span>
                  </div>
                </div>
                <div className="p-1.5 sm:p-2 md:p-3 bg-green-500/10 rounded-xl border border-green-500/20 shadow-lg flex-shrink-0">
                  <ArrowUpCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-green-400" />
                </div>
              </div>
            </CardSpotlight>

            {/* Expenses Card */}
            <CardSpotlight 
              className="flex flex-col justify-between p-3 sm:p-4 md:p-5 lg:p-6 min-h-[160px] sm:min-h-[180px] md:min-h-[200px] bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-sm border-neutral-800 hover:border-red-500/50 transition-all duration-300 shadow-xl"
              color="#dc2626"
            >
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-wide mb-1.5 sm:mb-2 md:mb-3">Total Expenses</p>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-red-400 mb-2 break-words">
                    {loading ? "..." : `₹${formatAmount(expenses)}`}
                  </h2>
                  <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                    <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-red-500/20 rounded-md border border-red-500/30 flex-shrink-0">
                      <p className="text-red-300 text-[10px] sm:text-xs font-semibold flex items-center gap-1">
                        <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 rotate-180" />
                        <span className="whitespace-nowrap">Total</span>
                      </p>
                    </div>
                    <span className="text-gray-500 text-[10px] xs:text-xs whitespace-nowrap">all time</span>
                  </div>
                </div>
                <div className="p-1.5 sm:p-2 md:p-3 bg-red-500/10 rounded-xl border border-red-500/20 shadow-lg flex-shrink-0">
                  <ArrowDownCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-red-400" />
                </div>
              </div>
            </CardSpotlight>
          </div>
        </div>
      </div>
    </div>
  );
}

