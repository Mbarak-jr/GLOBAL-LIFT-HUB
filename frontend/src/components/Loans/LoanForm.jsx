import React from 'react';
import { FiPercent, FiDollarSign, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const LoanForm = ({
  formData,
  error,
  success,
  handleChange,
  handleSubmit,
  isSubmitting,
  loanPurposes = [
    { value: 'business', label: 'Business Expansion' },
    { value: 'education', label: 'Education' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'health', label: 'Healthcare' },
    { value: 'personal', label: 'Personal Use' },
    { value: 'agriculture', label: 'Agriculture' }
  ],
  repaymentPlans = [
    { value: '3_months', label: '3 Months' },
    { value: '6_months', label: '6 Months' },
    { value: '12_months', label: '12 Months' },
    { value: '24_months', label: '24 Months' }
  ],
  selectedInstitution
}) => (
  <div className="p-6">
    {/* Institution Info */}
    {selectedInstitution && (
      <div className="mb-6 p-4 bg-blue-50 rounded-lg flex items-center">
        <div className="mr-4">
          {selectedInstitution.type === 'MFI' ? (
            <FiCreditCard className="text-blue-500 text-2xl" />
          ) : (
            <FiPercent className="text-green-500 text-2xl" />
          )}
        </div>
        <div>
          <h3 className="font-medium text-gray-800">{selectedInstitution.name}</h3>
          <p className="text-sm text-gray-600">
            Interest Rate: {selectedInstitution.interestRate}%
          </p>
        </div>
      </div>
    )}

    {/* Error/Success messages */}
    {error && (
      <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
        <FiAlertCircle className="w-5 h-5 mr-2" />
        {error}
      </div>
    )}

    {success && (
      <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-lg flex items-center">
        <FiCheckCircle className="w-5 h-5 mr-2" />
        {success}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Amount Field */}
      <div className="space-y-1">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Loan Amount ($)
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiDollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            id="amount"
            name="amount"
            min="50"
            max="5000"
            value={formData.amount}
            onChange={handleChange}
            className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            placeholder="500"
            required
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500">USD</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Minimum $50, maximum $5,000
        </p>
      </div>

      {/* Purpose Field */}
      <div className="space-y-1">
        <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
          Loan Purpose
        </label>
        <select
          id="purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          className="block w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        >
          {loanPurposes.map((purpose) => (
            <option key={purpose.value} value={purpose.value}>
              {purpose.label}
            </option>
          ))}
        </select>
      </div>

      {/* Repayment Plan Field */}
      <div className="space-y-1">
        <label htmlFor="repaymentPlan" className="block text-sm font-medium text-gray-700">
          Repayment Plan
        </label>
        <select
          id="repaymentPlan"
          name="repaymentPlan"
          value={formData.repaymentPlan}
          onChange={handleChange}
          className="block w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        >
          {repaymentPlans.map((plan) => (
            <option key={plan.value} value={plan.value}>
              {plan.label}
            </option>
          ))}
        </select>
      </div>

      {/* Description Field */}
      <div className="space-y-1">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description (Optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
          placeholder="Tell us more about how you plan to use this loan..."
        />
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            required
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="font-medium text-gray-700">
            I agree to the{' '}
            <a href="/terms" className="text-blue-600 hover:text-blue-500">
              Loan Terms and Conditions
            </a>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : 'Apply for Loan'}
        </button>
      </div>
    </form>
  </div>
);

export default LoanForm;