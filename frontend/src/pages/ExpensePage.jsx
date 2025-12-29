import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Boxes } from "../components/ui/background-boxes";
import { CardSpotlight } from "../components/ui/card-spotlight.jsx";
import { getExpense } from "../api/expenseAPI.js";
import { 
  Plus, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Calendar,
  Tag,
  FileText,
  Wallet,
  TrendingUp,
  TrendingDown
} from "lucide-react";

export default function ExpensePage() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await getExpense();
      setExpenses(response.data || []);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
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
          <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2 md:mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent break-words">
                Your Expenses
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg break-words">Track and manage your financial transactions</p>
            </div>
            
            {/* Add Expense Button */}
            <button
              onClick={() => navigate("/add")}
              className="group relative px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 overflow-hidden w-full sm:w-auto min-h-[44px] touch-manipulation"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Plus className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-90 transition-transform duration-200" />
                <span className="hidden sm:inline">Add Expense</span>
                <span className="sm:hidden">Add</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          </div>

          {/* Expenses Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
              <div className="text-gray-400 text-sm sm:text-base">Loading expenses...</div>
            </div>
          ) : expenses.length === 0 ? (
            <CardSpotlight className="p-8 sm:p-10 md:p-12 text-center bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-sm border-neutral-800">
              <Wallet className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-gray-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">No expenses yet</h3>
              <p className="text-gray-400 text-sm sm:text-base">Start tracking your expenses by adding your first transaction</p>
            </CardSpotlight>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {expenses.map((expense) => (
                <CardSpotlight
                  key={expense._id}
                  className="bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-sm border-neutral-800 hover:border-opacity-100 transition-all duration-300"
                  color={expense.type === "expense" ? "#dc2626" : "#16a34a"}
                >
                  <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                    {/* Header with Type Icon */}
                    <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4 gap-2">
                      <div className={`
                        p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-xl flex-shrink-0
                        ${expense.type === "expense" 
                          ? "bg-red-500/10 border border-red-500/20" 
                          : "bg-green-500/10 border border-green-500/20"
                        }
                      `}>
                        {expense.type === "expense" ? (
                          <ArrowDownCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-red-400" />
                        ) : (
                          <ArrowUpCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-400" />
                        )}
                      </div>
                      <div className={`
                        px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold flex-shrink-0
                        ${expense.type === "expense" 
                          ? "bg-red-500/20 text-red-400" 
                          : "bg-green-500/20 text-green-400"
                        }
                      `}>
                        {expense.type === "expense" ? "Expense" : "Income"}
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="mb-2 sm:mb-3 md:mb-4">
                      <h2 className={`
                        text-xl sm:text-2xl md:text-2.5xl lg:text-3xl font-bold mb-1 break-words
                        ${expense.type === "expense" ? "text-red-400" : "text-green-400"}
                      `}>
                        {expense.type === "expense" ? "-" : "+"}{formatAmount(expense.amount)}
                      </h2>
                    </div>

                    {/* Category */}
                    {expense.category && (
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 text-gray-400">
                        <Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-medium break-words">{expense.category}</span>
                      </div>
                    )}

                    {/* Date */}
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 text-gray-400">
                      <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm break-words">{formatDate(expense.date)}</span>
                    </div>

                    {/* Note */}
                    {expense.note && (
                      <div className="flex items-start gap-1.5 sm:gap-2 pt-2 sm:pt-3 border-t border-neutral-800">
                        <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 break-words">{expense.note}</p>
                      </div>
                    )}
                  </div>
                </CardSpotlight>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
