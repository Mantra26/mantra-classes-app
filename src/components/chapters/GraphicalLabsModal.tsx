import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Sparkles,
  FlaskConical,
  Eye,
  Sliders,
  CheckCircle2,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

export const GraphicalLabsModal: React.FC = () => {
  const { activeLabType, setActiveLabType } = useApp();

  // LAB 1 STATE: Light Reflection
  const [incidenceAngle, setIncidenceAngle] = useState(40);

  // LAB 2 STATE: Cell Organelles
  const [cellType, setCellType] = useState<'plant' | 'animal'>('plant');
  const [selectedOrganelle, setSelectedOrganelle] = useState<string>('chloroplast');

  // LAB 3 STATE: Fraction Visualizer
  const [numerator, setNumerator] = useState(3);
  const [denominator, setDenominator] = useState(4);

  if (!activeLabType) return null;

  const closeLab = () => setActiveLabType(null);

  // Data for Cell Organelles
  const organelleDetails: Record<string, { name: string; function: string; foundIn: string }> = {
    cell_wall: {
      name: 'Cell Wall',
      function: 'Rigid outer layer composed of cellulose; provides mechanical support, rigidity, and protection against osmotic lysis.',
      foundIn: 'Plant Cells ONLY (Absent in Animal Cells)'
    },
    chloroplast: {
      name: 'Chloroplast (Plastid)',
      function: 'Contains chlorophyll pigment that traps solar energy for photosynthesis to produce glucose.',
      foundIn: 'Plant Cells ONLY'
    },
    mitochondria: {
      name: 'Mitochondria ("Powerhouse of the Cell")',
      function: 'Site of cellular respiration; oxidizes glucose to release energy stored in ATP molecules.',
      foundIn: 'Both Plant & Animal Cells'
    },
    nucleus: {
      name: 'Nucleus ("Brain of the Cell")',
      function: 'Contains genetic material (chromatin/DNA) and controls all metabolic and developmental cellular activities.',
      foundIn: 'Both Plant & Animal Cells'
    },
    vacuole: {
      name: 'Vacuole',
      function: 'In plants: Single, large central vacuole filled with cell sap providing turgidity. In animals: Small, temporary vacuoles.',
      foundIn: 'Large & Permanent in Plants; Small & Few in Animals'
    },
    cell_membrane: {
      name: 'Cell Membrane (Plasma Membrane)',
      function: 'Selectively permeable membrane that regulates the entry and exit of substances in and out of the cell.',
      foundIn: 'Both Plant & Animal Cells'
    }
  };

  // Calculations for Light Lab
  const glancingAngle = 90 - incidenceAngle;
  const rad = (incidenceAngle * Math.PI) / 180;
  const rayLength = 140;
  const incidentX = 200 - Math.sin(rad) * rayLength;
  const incidentY = 160 - Math.cos(rad) * rayLength;
  const reflectedX = 200 + Math.sin(rad) * rayLength;
  const reflectedY = 160 - Math.cos(rad) * rayLength;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Lab Top Banner */}
        <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                Interactive Visual Concept Lab \ Uma Shukla Studio
              </div>
              <h2 className="text-base sm:text-xl font-bold text-white">
                {activeLabType === 'light_reflection' && 'Physics: Reflection of Light & Plane Mirror Ray Tracer'}
                {activeLabType === 'cell_organelles' && 'Biology: Plant vs Animal Cell Interactive Explorer'}
                {activeLabType === 'fraction_visualizer' && 'Mathematics: Fraction & Decimal Pizza/Bar Visualizer'}
              </h2>
            </div>
          </div>

          <button
            onClick={closeLab}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lab Workspace Content */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {/* ================= LAB 1: LIGHT REFLECTION ================= */}
          {activeLabType === 'light_reflection' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* SVG Visual Canvas */}
                <div className="lg:col-span-2 bg-slate-950 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 absolute top-3 left-4">
                    Simulation Canvas: Normal (N) & Plane Mirror Surface
                  </div>

                  <svg viewBox="0 0 400 240" className="w-full max-w-md h-auto">
                    {/* Mirror base */}
                    <line x1="40" y1="160" x2="360" y2="160" stroke="#38bdf8" strokeWidth="4" />
                    {/* Hatching for non-reflecting back */}
                    {Array.from({ length: 16 }).map((_, i) => (
                      <line
                        key={i}
                        x1={60 + i * 18}
                        y1="160"
                        x2={50 + i * 18}
                        y2="175"
                        stroke="#64748b"
                        strokeWidth="2"
                      />
                    ))}

                    {/* Normal line */}
                    <line
                      x1="200"
                      y1="20"
                      x2="200"
                      y2="160"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    <text x="205" y="35" fill="#cbd5e1" fontSize="11" fontFamily="sans-serif">
                      Normal (N)
                    </text>

                    {/* Incident Ray */}
                    <line
                      x1={incidentX}
                      y1={incidentY}
                      x2="200"
                      y2="160"
                      stroke="#f59e0b"
                      strokeWidth="3.5"
                    />
                    <circle cx={incidentX} cy={incidentY} r="5" fill="#f59e0b" />
                    <text
                      x={incidentX - 10}
                      y={incidentY - 10}
                      fill="#fcd34d"
                      fontSize="11"
                      fontFamily="sans-serif"
                      fontWeight="bold"
                    >
                      Light Source
                    </text>

                    {/* Reflected Ray */}
                    <line
                      x1="200"
                      y1="160"
                      x2={reflectedX}
                      y2={reflectedY}
                      stroke="#10b981"
                      strokeWidth="3.5"
                    />
                    <circle cx={reflectedX} cy={reflectedY} r="5" fill="#10b981" />
                    <text
                      x={reflectedX + 8}
                      y={reflectedY - 5}
                      fill="#6ee7b7"
                      fontSize="11"
                      fontFamily="sans-serif"
                      fontWeight="bold"
                    >
                      Reflected Ray
                    </text>

                    {/* Angle of incidence arc */}
                    <path
                      d={`M 200 110 A 50 50 0 0 0 ${200 - Math.sin(rad) * 50} ${160 - Math.cos(rad) * 50}`}
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="2"
                    />
                    <text x="175" y="105" fill="#fbbf24" fontSize="12" fontWeight="bold">
                      \u2220i = {incidenceAngle}\u00b0
                    </text>

                    {/* Angle of reflection arc */}
                    <path
                      d={`M 200 110 A 50 50 0 0 1 ${200 + Math.sin(rad) * 50} ${160 - Math.cos(rad) * 50}`}
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="2"
                    />
                    <text x="220" y="105" fill="#34d399" fontSize="12" fontWeight="bold">
                      \u2220r = {incidenceAngle}\u00b0
                    </text>

                    <text x="180" y="210" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">
                      Plane Mirror Surface
                    </text>
                  </svg>
                </div>

                {/* Interactive Controls & Real-Time Math */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Adjust Angle of Incidence (\u2220i):
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="80"
                      value={incidenceAngle}
                      onChange={e => setIncidenceAngle(Number(e.target.value))}
                      className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-slate-500 font-mono">
                      <span>5\u00b0 (Nearly Normal)</span>
                      <span className="font-bold text-indigo-600">{incidenceAngle}\u00b0</span>
                      <span>80\u00b0 (Grazing)</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2 text-xs">
                    <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>ICSE Board Law Applied:</span>
                    </div>
                    <div className="space-y-1.5 text-slate-700">
                      <div>
                        <b>Law of Reflection:</b> Angle of Incidence (\u2220i) = Angle of Reflection (\u2220r) ={' '}
                        <span className="font-bold text-emerald-700">{incidenceAngle}\u00b0</span>
                      </div>
                      <div>
                        <b>Glancing Angle:</b> 90\u00b0 - {incidenceAngle}\u00b0 ={' '}
                        <span className="font-bold text-amber-700">{glancingAngle}\u00b0</span>
                      </div>
                      <div>
                        <b>Total Angle between Rays:</b> \u2220i + \u2220r ={' '}
                        <span className="font-bold text-indigo-700">{incidenceAngle * 2}\u00b0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= LAB 2: PLANT & ANIMAL CELL ================= */}
          {activeLabType === 'cell_organelles' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCellType('plant')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      cellType === 'plant'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Plant Cell (Fixed Rectangular)
                  </button>
                  <button
                    onClick={() => setCellType('animal')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      cellType === 'animal'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Animal Cell (Irregular Spherical)
                  </button>
                </div>
                <span className="text-xs text-slate-400">Click any organelle below to inspect function</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* SVG Visual Cell Diagram */}
                <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-5 flex items-center justify-center border border-slate-800">
                  <svg viewBox="0 0 380 260" className="w-full max-w-md h-auto">
                    {cellType === 'plant' ? (
                      /* Plant Cell Outline (Rigid Hexagon/Rectangle) */
                      <g>
                        {/* Outer Cell Wall */}
                        <rect
                          x="30"
                          y="20"
                          width="320"
                          height="220"
                          rx="25"
                          fill="#064e3b"
                          stroke="#10b981"
                          strokeWidth="6"
                        />
                        {/* Inner Plasma Membrane */}
                        <rect
                          x="40"
                          y="30"
                          width="300"
                          height="200"
                          rx="20"
                          fill="#022c22"
                          stroke="#34d399"
                          strokeWidth="2"
                        />

                        {/* Large Central Vacuole */}
                        <ellipse
                          cx="200"
                          cy="135"
                          rx="90"
                          ry="65"
                          fill="#0e7490"
                          fillOpacity="0.4"
                          stroke="#38bdf8"
                          strokeWidth="2"
                          className="cursor-pointer hover:opacity-80"
                          onClick={() => setSelectedOrganelle('vacuole')}
                        />
                        <text x="160" y="140" fill="#bae6fd" fontSize="12" fontWeight="bold">
                          Central Vacuole
                        </text>

                        {/* Chloroplasts */}
                        <ellipse
                          cx="75"
                          cy="70"
                          rx="18"
                          ry="12"
                          fill="#16a34a"
                          stroke="#86efac"
                          strokeWidth="2"
                          className="cursor-pointer"
                          onClick={() => setSelectedOrganelle('chloroplast')}
                        />
                        <ellipse
                          cx="90"
                          cy="195"
                          rx="18"
                          ry="12"
                          fill="#16a34a"
                          stroke="#86efac"
                          strokeWidth="2"
                          className="cursor-pointer"
                          onClick={() => setSelectedOrganelle('chloroplast')}
                        />

                        {/* Mitochondria */}
                        <ellipse
                          cx="305"
                          cy="70"
                          rx="18"
                          ry="10"
                          fill="#ea580c"
                          stroke="#fdba74"
                          strokeWidth="2"
                          className="cursor-pointer"
                          onClick={() => setSelectedOrganelle('mitochondria')}
                        />

                        {/* Nucleus */}
                        <circle
                          cx="300"
                          cy="175"
                          r="25"
                          fill="#7c3aed"
                          stroke="#c4b5fd"
                          strokeWidth="2"
                          className="cursor-pointer"
                          onClick={() => setSelectedOrganelle('nucleus')}
                        />
                        <text x="282" y="179" fill="#ede9fe" fontSize="10" fontWeight="bold">
                          Nucleus
                        </text>
                      </g>
                    ) : (
                      /* Animal Cell Outline (Flexible round) */
                      <g>
                        <ellipse
                          cx="190"
                          cy="130"
                          rx="155"
                          ry="105"
                          fill="#1e1b4b"
                          stroke="#818cf8"
                          strokeWidth="4"
                        />
                        {/* Nucleus in center */}
                        <circle
                          cx="190"
                          cy="130"
                          r="35"
                          fill="#7c3aed"
                          stroke="#c4b5fd"
                          strokeWidth="2"
                          className="cursor-pointer"
                          onClick={() => setSelectedOrganelle('nucleus')}
                        />
                        <text x="168" y="134" fill="#ede9fe" fontSize="12" fontWeight="bold">
                          Nucleus
                        </text>

                        {/* Small Vacuoles */}
                        <circle
                          cx="90"
                          cy="80"
                          r="12"
                          fill="#0e7490"
                          stroke="#38bdf8"
                          strokeWidth="1.5"
                          className="cursor-pointer"
                          onClick={() => setSelectedOrganelle('vacuole')}
                        />
                        {/* Mitochondria */}
                        <ellipse
                          cx="290"
                          cy="85"
                          rx="20"
                          ry="11"
                          fill="#ea580c"
                          stroke="#fdba74"
                          strokeWidth="2"
                          className="cursor-pointer"
                          onClick={() => setSelectedOrganelle('mitochondria')}
                        />
                        <ellipse
                          cx="100"
                          cy="180"
                          rx="20"
                          ry="11"
                          fill="#ea580c"
                          stroke="#fdba74"
                          strokeWidth="2"
                          className="cursor-pointer"
                          onClick={() => setSelectedOrganelle('mitochondria')}
                        />
                      </g>
                    )}
                  </svg>
                </div>

                {/* Organelle Inspector Info Box */}
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Organelle Selected:
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {organelleDetails[selectedOrganelle]?.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {organelleDetails[selectedOrganelle]?.function}
                    </p>
                    <div className="pt-2 border-t border-slate-200 text-xs font-semibold text-emerald-800">
                      Presence: {organelleDetails[selectedOrganelle]?.foundIn}
                    </div>
                  </div>

                  {/* Organelle Buttons */}
                  <div className="flex flex-wrap gap-1.5">
                    {Object.keys(organelleDetails).map(key => (
                      <button
                        key={key}
                        onClick={() => setSelectedOrganelle(key)}
                        className={`text-xs px-2.5 py-1.5 rounded-xl font-medium transition-colors ${
                          selectedOrganelle === key
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {organelleDetails[key].name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= LAB 3: FRACTION VISUALIZER ================= */}
          {activeLabType === 'fraction_visualizer' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visual Slices Container */}
                <div className="bg-slate-900 rounded-2xl p-6 flex flex-col items-center justify-center border border-slate-800 space-y-4">
                  <div className="text-xs font-bold text-slate-300">
                    Fraction Visualizer: {numerator} / {denominator}
                  </div>

                  {/* Circular Pie Diagram */}
                  <svg viewBox="0 0 200 200" className="w-48 h-48">
                    {Array.from({ length: denominator }).map((_, i) => {
                      const startAngle = (i * 360) / denominator;
                      const endAngle = ((i + 1) * 360) / denominator;
                      const isFilled = i < numerator;

                      // Polar coordinates
                      const startRad = (startAngle - 90) * (Math.PI / 180);
                      const endRad = (endAngle - 90) * (Math.PI / 180);
                      const x1 = 100 + 80 * Math.cos(startRad);
                      const y1 = 100 + 80 * Math.sin(startRad);
                      const x2 = 100 + 80 * Math.cos(endRad);
                      const y2 = 100 + 80 * Math.sin(endRad);

                      const largeArc = endAngle - startAngle > 180 ? 1 : 0;
                      const pathData = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;

                      return (
                        <path
                          key={i}
                          d={pathData}
                          fill={isFilled ? '#f59e0b' : '#334155'}
                          stroke="#0f172a"
                          strokeWidth="2"
                        />
                      );
                    })}
                  </svg>

                  {/* Linear Bar Division */}
                  <div className="w-full max-w-sm flex h-6 rounded-lg overflow-hidden border border-slate-700">
                    {Array.from({ length: denominator }).map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 transition-colors border-r border-slate-900 last:border-r-0 ${
                          i < numerator ? 'bg-amber-500' : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Math Calculations */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700">Numerator (Parts shaded): {numerator}</label>
                      <input
                        type="range"
                        min="1"
                        max={denominator}
                        value={numerator}
                        onChange={e => setNumerator(Number(e.target.value))}
                        className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700">Denominator (Total equal parts): {denominator}</label>
                      <input
                        type="range"
                        min="2"
                        max="12"
                        value={denominator}
                        onChange={e => {
                          const val = Number(e.target.value);
                          setDenominator(val);
                          if (numerator > val) setNumerator(val);
                        }}
                        className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
                    <div className="font-bold text-amber-950">Conversions for ICSE Class 7:</div>
                    <div className="space-y-1 text-slate-700">
                      <div>Fraction: <b>{numerator}/{denominator}</b></div>
                      <div>Decimal Representation: <b>{(numerator / denominator).toFixed(4)}</b></div>
                      <div>Percentage: <b>{((numerator / denominator) * 100).toFixed(1)}%</b></div>
                      <div>Type: <b>{numerator < denominator ? 'Proper Fraction' : 'Improper / Whole'}</b></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={closeLab}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
          >
            Close Interactive Lab
          </button>
        </div>
      </div>
    </div>
  );
};
