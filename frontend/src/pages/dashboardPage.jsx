import React from "react";
import { Boxes } from "../components/ui/background-boxes";
import { CardSpotlight } from "../components/ui/card-spotlight.jsx";
import { ArrowDownCircle, ArrowUpCircle, Wallet, TrendingUp, Calendar, PieChart } from "lucide-react";

export default function DashboardPage({balance,income,expenses}) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background */}
      <Boxes className="absolute inset-0 opacity-[0.40] pointer-events-none" />
      
      {/* Main Content Container */}
      <div className="relative z-10 h-full w-full overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-gray-400 text-lg">Welcome back! Here's your financial overview</p>
              </div>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-neutral-800/50 backdrop-blur-sm rounded-lg border border-neutral-700">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">Today</span>
              </div>
            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Balance Card */}
            <CardSpotlight 
              className="flex flex-col justify-between p-6 min-h-[200px] bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-sm border-neutral-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl"
              color="#1e40af"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-3">Total Balance</p>
                  <h2 className="text-4xl font-bold text-white mb-2">₹{balance}</h2>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="px-2 py-1 bg-green-500/20 rounded-md border border-green-500/30">
                      <p className="text-green-400 text-xs font-semibold flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +12.5%
                      </p>
                    </div>
                    <span className="text-gray-500 text-xs">from last month</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-lg">
                  <Wallet className="h-8 w-8 text-blue-400" />
                </div>
              </div>
            </CardSpotlight>

            {/* Income Card */}
            <CardSpotlight 
              className="flex flex-col justify-between p-6 min-h-[200px] bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-sm border-neutral-800 hover:border-green-500/50 transition-all duration-300 shadow-xl"
              color="#16a34a"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-3">Total Income</p>
                  <h2 className="text-4xl font-bold text-green-400 mb-2">₹{income}</h2>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="px-2 py-1 bg-green-500/20 rounded-md border border-green-500/30">
                      <p className="text-green-300 text-xs font-semibold flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +8.2%
                      </p>
                    </div>
                    <span className="text-gray-500 text-xs">from last month</span>
                  </div>
                </div>
                <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20 shadow-lg">
                  <ArrowUpCircle className="h-8 w-8 text-green-400" />
                </div>
              </div>
            </CardSpotlight>

            {/* Expenses Card */}
            <CardSpotlight 
              className="flex flex-col justify-between p-6 min-h-[200px] bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-sm border-neutral-800 hover:border-red-500/50 transition-all duration-300 shadow-xl"
              color="#dc2626"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-3">Total Expenses</p>
                  <h2 className="text-4xl font-bold text-red-400 mb-2">₹{expenses}</h2>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="px-2 py-1 bg-red-500/20 rounded-md border border-red-500/30">
                      <p className="text-red-300 text-xs font-semibold flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 rotate-180" />
                        -5.3%
                      </p>
                    </div>
                    <span className="text-gray-500 text-xs">from last month</span>
                  </div>
                </div>
                <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 shadow-lg">
                  <ArrowDownCircle className="h-8 w-8 text-red-400" />
                </div>
              </div>
            </CardSpotlight>
          </div>

          {/* Additional Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Placeholder for future charts or additional content */}
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">Expense Categories Chart</p>
                <p className="text-gray-600 text-xs mt-2">Coming soon...</p>
              </div>
            </div>
            
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <Calendar className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">Recent Transactions</p>
                <p className="text-gray-600 text-xs mt-2">Coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

