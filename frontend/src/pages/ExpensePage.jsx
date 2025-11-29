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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Your Expenses
              </h1>
              <p className="text-gray-400 text-lg">Track and manage your financial transactions</p>
            </div>
            
            {/* Add Expense Button */}
            <button
              onClick={() => navigate("/add")}
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
                Add Expense
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          </div>

          {/* Expenses Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-gray-400">Loading expenses...</div>
            </div>
          ) : expenses.length === 0 ? (
            <CardSpotlight className="p-12 text-center bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-sm border-neutral-800">
              <Wallet className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No expenses yet</h3>
              <p className="text-gray-400">Start tracking your expenses by adding your first transaction</p>
            </CardSpotlight>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expenses.map((expense) => (
                <CardSpotlight
                  key={expense._id}
                  className="bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-sm border-neutral-800 hover:border-opacity-100 transition-all duration-300"
                  color={expense.type === "expense" ? "#dc2626" : "#16a34a"}
                >
                  <div className="p-6">
                    {/* Header with Type Icon */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`
                        p-3 rounded-xl
                        ${expense.type === "expense" 
                          ? "bg-red-500/10 border border-red-500/20" 
                          : "bg-green-500/10 border border-green-500/20"
                        }
                      `}>
                        {expense.type === "expense" ? (
                          <ArrowDownCircle className="h-6 w-6 text-red-400" />
                        ) : (
                          <ArrowUpCircle className="h-6 w-6 text-green-400" />
                        )}
                      </div>
                      <div className={`
                        px-3 py-1 rounded-full text-xs font-semibold
                        ${expense.type === "expense" 
                          ? "bg-red-500/20 text-red-400" 
                          : "bg-green-500/20 text-green-400"
                        }
                      `}>
                        {expense.type === "expense" ? "Expense" : "Income"}
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="mb-4">
                      <h2 className={`
                        text-3xl font-bold mb-1
                        ${expense.type === "expense" ? "text-red-400" : "text-green-400"}
                      `}>
                        {expense.type === "expense" ? "-" : "+"}{formatAmount(expense.amount)}
                      </h2>
                    </div>

                    {/* Category */}
                    {expense.category && (
                      <div className="flex items-center gap-2 mb-3 text-gray-400">
                        <Tag className="h-4 w-4" />
                        <span className="text-sm font-medium">{expense.category}</span>
                      </div>
                    )}

                    {/* Date */}
                    <div className="flex items-center gap-2 mb-3 text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{formatDate(expense.date)}</span>
                    </div>

                    {/* Note */}
                    {expense.note && (
                      <div className="flex items-start gap-2 pt-3 border-t border-neutral-800">
                        <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                        <p className="text-sm text-gray-400 line-clamp-2">{expense.note}</p>
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
