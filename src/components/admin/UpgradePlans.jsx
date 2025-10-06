import { useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp, X } from "lucide-react";
import * as XLSX from "xlsx";

export default function UpgradePlans() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    amount: "",
    transactionId: "",
    coupon: "",
    notes: "",
  });

  // Pagination & Filter for Purchase History
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("All");
  const itemsPerPage = 5;

  const plans = [
    {
      name: "Basic",
      monthly: 1499,
      annually: 14999,
      color: "from-pink-500 to-pink-600",
      features: ["📝 Create up to 5 Exams", "👥 100 Student Accounts", "📊 Basic Reports"],
    },
    {
      name: "Pro",
      monthly: 3999,
      annually: 39999,
      color: "from-blue-500 to-blue-700",
      features: [
        "📝 Unlimited Exams",
        "👥 1,000 Student Accounts",
        "📈 Advanced Analytics",
        "📂 Export Results (PDF/Excel)",
        "⚡ Priority Support",
      ],
      recommended: true,
    },
    {
      name: "Institute",
      monthly: 7999,
      annually: 79999,
      color: "from-purple-500 to-purple-700",
      features: [
        "📝 Unlimited Exams",
        "👥 Unlimited Students",
        "🎨 Custom Branding",
        "🔗 LMS Integration",
        "🤝 Dedicated Account Manager",
      ],
    },
  ];

  const [purchases, setPurchases] = useState([
    { date: "15 Sep '25", time: "11:35", paymentMode: "UPI", amount: "₹10,620", status: "✅ Success", capacity: "1,800 Attempts" },
    { date: "02 Aug '25", time: "09:10", paymentMode: "Credit Card", amount: "₹5,499", status: "✅ Success", capacity: "900 Attempts" },
    { date: "18 Jul '25", time: "14:22", paymentMode: "Net Banking", amount: "₹2,999", status: "❌ Failed", capacity: "—" },
  ]);

  const faqs = [
    { q: "How does the Paid Plan work?", a: "You get access to premium features based on your subscription plan." },
    { q: "What are the benefits of this Paid Plan?", a: "Unlimited exams, student accounts, advanced analytics, and more." },
    { q: "Can Student Capacity be changed before a Paid Plan ends?", a: "Yes, you can upgrade anytime before your plan ends." },
    { q: "Do the same Student Accounts have to continue the Plan or can they be removed?", a: "You can manage and remove students as needed." },
    { q: "Will a GST Invoice be provided?", a: "Yes, a GST invoice will be automatically generated." },
    { q: "What happens to my Data after a Paid Plan expires?", a: "Your data is safe and can be restored upon renewal." },
    { q: "Is my data Private on EZexam?", a: "Yes, your data is 100% private and encrypted." },
    { q: "Can Students view their Exam Scores & Analytics?", a: "Yes, students can access results and analytics directly." },
  ];

  const handleStartPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
    setPaymentMethod(null);
    setPaymentDone(false);
    setPaymentDetails({
      amount: isAnnual ? plan.annually : plan.monthly,
      transactionId: "",
      coupon: "",
      notes: "",
    });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setPaymentDone(true);
      const newPurchase = {
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" }),
        time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
        paymentMode: paymentMethod,
        amount: `₹${paymentDetails.amount}`,
        status: "✅ Success",
        capacity: "Unlimited",
        transactionId: paymentDetails.transactionId,
        coupon: paymentDetails.coupon,
        notes: paymentDetails.notes,
        plan: selectedPlan.name,
      };
      setPurchases([newPurchase, ...purchases]);
    }, 1200);
  };

  // Filter & Pagination
  const filteredPurchases = purchases.filter(
    (p) => filterStatus === "All" || p.status.includes(filterStatus)
  );
  const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);
  const paginatedPurchases = filteredPurchases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const downloadExcel = () => {
    const data = filteredPurchases.map((p) => ({
      Date: p.date,
      Time: p.time,
      PaymentMode: p.paymentMode,
      Amount: p.amount,
      Status: p.status,
      Capacity: p.capacity,
      TransactionID: p.transactionId || "-",
      Coupon: p.coupon || "-",
      Notes: p.notes || "-",
      Plan: p.plan || "-",
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase History");
    XLSX.writeFile(workbook, "Purchase_History.xlsx");
  };

  return (
    <div className="flex flex-col items-center py-12 bg-gradient-to-b from-gray-50 via-white to-gray-100 min-h-screen">
      {/* Header */}
      <header className="text-center max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          Upgrade Your Exam Experience
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Flexible plans tailored for tutors, coaching centers, and large institutions.
        </p>
      </header>

      {/* Billing Toggle */}
      <div className="flex items-center gap-4 mb-12">
        <span className={!isAnnual ? "font-semibold text-blue-600" : "text-gray-500"}>Monthly</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={isAnnual} onChange={() => setIsAnnual(!isAnnual)} className="sr-only" />
          <div className="w-16 h-8 bg-gray-300 rounded-full relative transition peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-600">
            <div className="absolute top-1 left-1 h-6 w-6 bg-white rounded-full shadow transition-all duration-500 peer-checked:translate-x-8"></div>
          </div>
        </label>
        <span className={isAnnual ? "font-semibold text-blue-600" : "text-gray-500"}>
          Annually <span className="text-green-600">(Save 20%)</span>
        </span>
      </div>

      {/* Plans */}
      <section className="grid md:grid-cols-3 gap-8 w-full max-w-6xl px-6 mb-16">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl ${plan.recommended ? "border-2 border-blue-600" : "bg-white"}`}
          >
            <div className="p-8 flex flex-col items-center">
              {plan.recommended && (
                <span className="absolute -top-3 px-4 py-1 text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-md">
                  ⭐ Recommended
                </span>
              )}
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-5xl font-extrabold mb-2">
                ₹{isAnnual ? plan.annually : plan.monthly}
                <span className="text-base font-medium text-gray-500">{isAnnual ? "/year" : "/month"}</span>
              </p>
              <button
                onClick={() => handleStartPlan(plan)}
                className={`bg-gradient-to-r ${plan.color} text-white font-semibold py-3 px-8 rounded-full shadow-md hover:scale-105 transition`}
              >
                Start Plan
              </button>
              <ul className="text-gray-700 space-y-3 mt-6 text-left w-full">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 w-5 h-5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative animate-fade-in">
            <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={() => setShowPaymentModal(false)}>
              <X size={20} />
            </button>

            {!paymentDone ? (
              <>
                <h2 className="text-xl font-bold mb-4">
                  Pay for {selectedPlan?.name} – ₹{paymentDetails.amount}
                </h2>

                {!paymentMethod ? (
                  <div className="space-y-3">
                    <p className="font-medium">Choose Payment Method:</p>
                    {["UPI", "Credit/Debit Card", "Net Banking"].map((method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className="w-full border rounded-lg py-2 hover:bg-gray-100 transition"
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handlePayment} className="space-y-4 mt-4">
                    <p className="font-medium">Enter {paymentMethod} Details</p>

                    {paymentMethod === "UPI" && (
                      <input
                        type="text"
                        required
                        placeholder="Enter UPI ID"
                        className="w-full border rounded-lg px-3 py-2"
                        value={paymentDetails.transactionId}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, transactionId: e.target.value })}
                      />
                    )}

                    {paymentMethod === "Credit/Debit Card" && (
                      <>
                        <input
                          type="text"
                          required
                          placeholder="Card Number"
                          className="w-full border rounded-lg px-3 py-2"
                          value={paymentDetails.transactionId}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, transactionId: e.target.value })}
                        />
                        <div className="flex gap-2">
                          <input type="text" required placeholder="MM/YY" className="w-1/2 border rounded-lg px-3 py-2" />
                          <input type="text" required placeholder="CVV" className="w-1/2 border rounded-lg px-3 py-2" />
                        </div>
                      </>
                    )}

                    {paymentMethod === "Net Banking" && (
                      <input
                        type="text"
                        required
                        placeholder="Account Number"
                        className="w-full border rounded-lg px-3 py-2"
                        value={paymentDetails.transactionId}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, transactionId: e.target.value })}
                      />
                    )}

                    {/* Additional attributes */}
                    <input
                      type="number"
                      required
                      placeholder="Amount"
                      className="w-full border rounded-lg px-3 py-2"
                      value={paymentDetails.amount}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, amount: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Coupon Code (optional)"
                      className="w-full border rounded-lg px-3 py-2"
                      value={paymentDetails.coupon}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, coupon: e.target.value })}
                    />
                    <textarea
                      placeholder="Notes (optional)"
                      className="w-full border rounded-lg px-3 py-2"
                      value={paymentDetails.notes}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, notes: e.target.value })}
                    />

                    <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition">
                      Pay Now
                    </button>
                  </form>
                )}
              </>
            ) : (
              <div className="text-center space-y-3">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
                <h3 className="text-xl font-bold">Payment Successful 🎉</h3>
                <p>You are now on the {selectedPlan?.name} Plan.</p>
              </div>
            )}
          </div>
        </div>
      )}
{/* Purchase History */}
<section className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-6 mb-12">
  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
    <h2 className="text-2xl font-bold">Purchase History</h2>
    <button
      onClick={downloadExcel}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      Download Excel
    </button>
  </div>

  {/* Filter */}
  <div className="flex items-center gap-2 mb-4">
    <span className="font-semibold text-gray-700">Filter:</span>
    {["All", "Success", "Failed"].map((status) => (
      <button
        key={status}
        onClick={() => {
          setFilterStatus(status);
          setCurrentPage(1);
        }}
        className={`px-3 py-1 rounded-full border text-sm font-medium hover:bg-gray-100 transition ${
          filterStatus === status ? "bg-blue-50 border-blue-500" : ""
        }`}
      >
        {status}
      </button>
    ))}
  </div>

  {/* Table Header */}
  <div className="hidden md:grid grid-cols-6 gap-4 text-gray-600 font-semibold border-b pb-2 px-4">
    <span>Date</span>
    <span>Time</span>
    <span>Payment Mode</span>
    <span>Amount</span>
    <span>Status</span>
    <span>Attempts</span>
  </div>

  {/* Purchases List */}
  <div className="space-y-4 mt-2">
    {paginatedPurchases.map((p, idx) => (
      <div
        key={idx}
        className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border border-gray-100 rounded-lg p-4 hover:shadow-md transition"
      >
        <span className="font-semibold">{p.date}</span>
        <span className="text-gray-500">{p.time}</span>
        <span className="text-gray-500">{p.paymentMode}</span>
        <span className="font-medium">{p.amount}</span>
        <span className={`px-2 py-1 rounded-full text-sm font-semibold text-center ${
          p.status.includes("Success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {p.status.replace("✅ ", "").replace("❌ ", "")}
        </span>
        <span className="text-gray-600">{p.capacity}</span>
      </div>
    ))}
  </div>

  {/* Pagination */}
  {totalPages > 1 && (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="px-3 py-1 border rounded hover:bg-gray-100 transition">
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 border rounded hover:bg-gray-100 transition ${
            currentPage === i + 1 ? "bg-blue-50 border-blue-500" : ""
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="px-3 py-1 border rounded hover:bg-gray-100 transition">
        Next
      </button>
    </div>
  )}
</section>


      {/* FAQ */}
      <section className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border rounded-lg">
              <button
                className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
              >
                {faq.q}
                {openFAQ === idx ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {openFAQ === idx && <div className="px-4 pb-4 text-gray-600">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
