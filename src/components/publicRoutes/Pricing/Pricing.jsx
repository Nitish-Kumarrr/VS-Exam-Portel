import React, { useState } from "react";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Basic Plan",
      monthly: "₹499 / month",
      yearly: "₹4,999 / year",
      features: ["Up to 100 Students", "Standard Exam Formats", "Email Support"],
    },
    {
      name: "Pro Plan",
      monthly: "₹999 / month",
      yearly: "₹9,999 / year",
      features: [
        "Up to 500 Students",
        "All Exam Formats",
        "Custom Branding",
        "Priority Support",
      ],
      highlight: true,
    },
    {
      name: "Enterprise Plan",
      monthly: "₹1999 / month",
      yearly: "₹19,999 / year",
      features: [
        "Unlimited Students",
        "Proctored Exams",
        "Advanced Analytics",
        "Dedicated Manager",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-black mb-6">
          {billingCycle === "monthly" ? "Monthly Pricing Plans" : "Yearly Pricing Plans"}
        </h2>
        <p className="text-gray-600 mb-8">
          Choose a plan that fits your organization’s needs. Upgrade anytime.
        </p>
        

        {/* Toggle Button */}
        <div className="flex justify-center mb-12">
          <div className="bg-white shadow-md rounded-full flex p-1">
            <button
              className={`px-6 py-2 rounded-full font-medium ${
                billingCycle === "monthly"
                  ? "bg-gray-700 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full font-medium ${
                billingCycle === "yearly"
                  ? "bg-gray-700 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-xl shadow-lg transition transform hover:scale-105 ${
                plan.highlight ? "bg-gray-700 text-white scale-105" : "bg-white text-gray-800"
              }`}
            >
              {/* Best Recommended Badge */}
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow">
                  ⭐ Best Recommended
                </span>
              )}

              <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
              <p
                className={`text-xl font-extrabold mb-6 ${
                  plan.highlight ? "text-white" : "text-gray-900"
                }`}
              >
                {billingCycle === "monthly" ? plan.monthly : plan.yearly}
              </p>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-center text-sm md:text-base"
                  >
                    <span
                      className={`mr-2 font-bold ${
                        plan.highlight ? "text-green-200" : "text-green-600"
                      }`}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`px-6 py-2 rounded-lg font-semibold ${
                  plan.highlight
                    ? "bg-white text-blue-600 hover:bg-gray-200"
                    : "bg-gray-600 text-white hover:bg-gradient-to-r from-gray-900 to-blue-400"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}