import { X } from 'lucide-react';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuide({ isOpen, onClose }: SizeGuideProps) {
  if (!isOpen) return null;

  const sizes = [
    { size: 'XS', chest: '81-86', waist: '66-71', hips: '86-91' },
    { size: 'S', chest: '86-91', waist: '71-76', hips: '91-96' },
    { size: 'M', chest: '91-96', waist: '76-81', hips: '96-101' },
    { size: 'L', chest: '96-101', waist: '81-86', hips: '101-106' },
    { size: 'XL', chest: '101-106', waist: '86-91', hips: '106-111' },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-6">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 relative max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#666666] hover:text-[#111111] transition-colors"
        >
          <X className="w-6 h-6" strokeWidth={1.5} />
        </button>

        <h2 className="mb-6" style={{ fontSize: '1.75rem', fontWeight: 500, color: '#111111' }}>
          Size Guide
        </h2>

        <p className="mb-6" style={{ fontSize: '0.9375rem', color: '#666666', lineHeight: 1.6 }}>
          All measurements are in centimeters. For the best fit, measure yourself and compare with the size chart below.
        </p>

        {/* Size Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-[#111111]">
                <th className="text-left py-4 px-4" style={{ fontSize: '0.875rem', color: '#111111', fontWeight: 600 }}>
                  Size
                </th>
                <th className="text-left py-4 px-4" style={{ fontSize: '0.875rem', color: '#111111', fontWeight: 600 }}>
                  Chest (cm)
                </th>
                <th className="text-left py-4 px-4" style={{ fontSize: '0.875rem', color: '#111111', fontWeight: 600 }}>
                  Waist (cm)
                </th>
                <th className="text-left py-4 px-4" style={{ fontSize: '0.875rem', color: '#111111', fontWeight: 600 }}>
                  Hips (cm)
                </th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((item, idx) => (
                <tr key={item.size} className={idx % 2 === 0 ? 'bg-[#F7F7F7]' : ''}>
                  <td className="py-4 px-4" style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#111111' }}>
                    {item.size}
                  </td>
                  <td className="py-4 px-4" style={{ fontSize: '0.9375rem', color: '#666666' }}>
                    {item.chest}
                  </td>
                  <td className="py-4 px-4" style={{ fontSize: '0.9375rem', color: '#666666' }}>
                    {item.waist}
                  </td>
                  <td className="py-4 px-4" style={{ fontSize: '0.9375rem', color: '#666666' }}>
                    {item.hips}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to Measure */}
        <div className="bg-[#F7F7F7] rounded-2xl p-6">
          <h3 className="mb-4" style={{ fontSize: '1.125rem', fontWeight: 500, color: '#111111' }}>
            How to Measure
          </h3>
          <ul className="space-y-3">
            {[
              { title: 'Chest', desc: 'Measure around the fullest part of your chest' },
              { title: 'Waist', desc: 'Measure around your natural waistline' },
              { title: 'Hips', desc: 'Measure around the fullest part of your hips' }
            ].map((tip) => (
              <li key={tip.title} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-2 flex-shrink-0" />
                <div>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#111111' }}>
                    {tip.title}:
                  </span>{' '}
                  <span style={{ fontSize: '0.9375rem', color: '#666666' }}>
                    {tip.desc}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
