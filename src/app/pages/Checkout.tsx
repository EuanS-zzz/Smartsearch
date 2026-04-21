import { useState } from 'react';
import { Button } from '../components/Button';
import { Lock, Check } from 'lucide-react';

export default function Checkout() {
  const [step, setStep] = useState(1);

  const items = [
    { id: 'w9', name: 'Striped Knit Polo', price: 49, quantity: 1, size: 'M' },
    { id: 'm2', name: 'Half-Zip Sweatshirt', price: 79, quantity: 1, size: 'L' }
  ];

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal;

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 mb-8">
            {[
              { num: 1, label: 'Information' },
              { num: 2, label: 'Shipping' },
              { num: 3, label: 'Payment' }
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step > s.num
                      ? 'bg-[#22C55E] text-white'
                      : step === s.num
                      ? 'bg-[#111111] text-white'
                      : 'bg-[#E5E5E5] text-[#999999]'
                  }`}>
                    {step > s.num ? (
                      <Check className="w-5 h-5" strokeWidth={2} />
                    ) : (
                      <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{s.num}</span>
                    )}
                  </div>
                  <span style={{
                    fontSize: '0.9375rem',
                    color: step >= s.num ? '#111111' : '#999999'
                  }}>
                    {s.label}
                  </span>
                </div>
                {i < 2 && (
                  <div className={`w-12 h-0.5 ${step > s.num ? 'bg-[#22C55E]' : 'bg-[#E5E5E5]'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8">
            {step === 1 && (
              <div>
                <h2 className="mb-6" style={{ fontSize: '1.5rem', color: '#111111' }}>
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-6 py-4 bg-[#F7F7F7] rounded-xl outline-none focus:ring-2 focus:ring-[#111111]"
                    style={{ fontSize: '0.9375rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-6 py-4 bg-[#F7F7F7] rounded-xl outline-none focus:ring-2 focus:ring-[#111111]"
                    style={{ fontSize: '0.9375rem' }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-6 py-4 bg-[#F7F7F7] rounded-xl outline-none focus:ring-2 focus:ring-[#111111]"
                    style={{ fontSize: '0.9375rem' }}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="mb-6" style={{ fontSize: '1.5rem', color: '#111111' }}>
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    className="w-full px-6 py-4 bg-[#F7F7F7] rounded-xl outline-none focus:ring-2 focus:ring-[#111111]"
                    style={{ fontSize: '0.9375rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Address Line 2 (Optional)"
                    className="w-full px-6 py-4 bg-[#F7F7F7] rounded-xl outline-none focus:ring-2 focus:ring-[#111111]"
                    style={{ fontSize: '0.9375rem' }}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full px-6 py-4 bg-[#F7F7F7] rounded-xl outline-none focus:ring-2 focus:ring-[#111111]"
                      style={{ fontSize: '0.9375rem' }}
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      className="w-full px-6 py-4 bg-[#F7F7F7] rounded-xl outline-none focus:ring-2 focus:ring-[#111111]"
                      style={{ fontSize: '0.9375rem' }}
                    />
                  </div>
                  <select
                    className="w-full px-6 py-4 bg-[#F7F7F7] rounded-xl outline-none focus:ring-2 focus:ring-[#111111] cursor-pointer"
                    style={{ fontSize: '0.9375rem', color: '#111111' }}
                  >
                    <option>Select Country</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="mb-6" style={{ fontSize: '1.5rem', color: '#111111' }}>
                  Payment Details
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full px-6 py-4 bg-[#F7F7F7] rounded-xl outline-none focus:ring-2 focus:ring-[#111111]"
                    style={{ fontSize: '0.9375rem' }}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-6 py-4 bg-[#F7F7F7] rounded-xl outline-none focus:ring-2 focus:ring-[#111111]"
                      style={{ fontSize: '0.9375rem' }}
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-full px-6 py-4 bg-[#F7F7F7] rounded-xl outline-none focus:ring-2 focus:ring-[#111111]"
                      style={{ fontSize: '0.9375rem' }}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    className="w-full px-6 py-4 bg-[#F7F7F7] rounded-xl outline-none focus:ring-2 focus:ring-[#111111]"
                    style={{ fontSize: '0.9375rem' }}
                  />
                </div>

                <div className="mt-8 p-6 bg-[#F7F7F7] rounded-xl flex items-center gap-3">
                  <Lock className="w-5 h-5 text-[#22C55E]" strokeWidth={1.5} />
                  <p style={{ fontSize: '0.875rem', color: '#666666' }}>
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              {step > 1 && (
                <Button
                  variant="secondary"
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              <Button
                onClick={() => step < 3 ? setStep(step + 1) : alert('Order placed!')}
                className="flex-1"
              >
                {step === 3 ? 'Place Order' : 'Continue'}
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 sticky top-24">
              <h2 className="mb-6" style={{ fontSize: '1.25rem', color: '#111111' }}>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-[#E5E5E5]">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p style={{ fontSize: '0.875rem', color: '#111111' }}>{item.name}</p>
                      <p style={{ fontSize: '0.75rem', color: '#999999' }}>
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                    </div>
                    <span style={{ fontSize: '0.875rem', color: '#111111' }}>£{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-[#E5E5E5]">
                <div className="flex justify-between">
                  <span style={{ fontSize: '0.9375rem', color: '#666666' }}>Subtotal</span>
                  <span style={{ fontSize: '0.9375rem', color: '#111111' }}>£{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontSize: '0.9375rem', color: '#666666' }}>Shipping</span>
                  <span style={{ fontSize: '0.9375rem', color: '#22C55E' }}>FREE</span>
                </div>
              </div>

              <div className="flex justify-between">
                <span style={{ fontSize: '1.125rem', fontWeight: 500, color: '#111111' }}>Total</span>
                <span style={{ fontSize: '1.125rem', fontWeight: 500, color: '#111111' }}>£{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
