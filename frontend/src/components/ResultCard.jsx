import React from "react";

const ResultCard = ({ data }) => {
  const fields = [
    { label: "Cardholder Name", value: data.cardholder, icon: "👤" },
    { label: "Statement Date", value: data.statementDate, icon: "📅" },
    { label: "Credit Limit", value: data.creditLimit, icon: "💳" },
    {
      label: "Available Credit Limit",
      value: data.availableCreditLimit,
      icon: "🟢",
    },
    { label: "Total Amount Due", value: data.totalAmountDue, icon: "💰" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Parsed Results</h2>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            ✓ {data.issuer}
          </span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {fields.map((field, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm">
              {field.icon}
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-500">{field.label}</p>
              <p className="text-lg font-semibold text-gray-900">
                {field.value === "Not Available" ? (
                  <span className="text-gray-400 italic">{field.value}</span>
                ) : (
                  field.value
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* actions removed as per requirements */}
    </div>
  );
};

export default ResultCard;
