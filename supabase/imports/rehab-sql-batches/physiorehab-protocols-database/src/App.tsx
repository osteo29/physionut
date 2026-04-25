/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import ProtocolDetail from './components/ProtocolDetail';

export default function App() {
  const [selectedProtocol, setSelectedProtocol] = useState<any | null>(null);

  // Sample data for demonstration - replace with database fetch later
  const sampleProtocol = {
    name: "ACL Reconstruction (Bone-Patellar Tendon-Bone)",
    category: "Knee (Post-operative)",
    phases: [
      {
        number: 1,
        title: "Immediate Post-operative",
        timeline: "Week 0-2",
        goals: ["Full active knee extension", "Control effusion & pain", "Establish quad activation"],
        precautions: ["Avoid active knee extension from 40° to 0°", "Brace locked in extension for walking"],
        criteria: ["Full extension", "Minimal swelling", "Able to SLR without lag"],
        exercises: [
          { name: "Ankle Pumps", parameters: "10 reps every hour", cue: "DVT prophylaxis and fluid movement" },
          { name: "Patellar Mobilization", parameters: "3x30 sec each side", cue: "Critical to avoid arthrofibrosis" },
          { name: "Quad Sets with Towel", parameters: "5x10 reps, 10s hold", cue: "Focus on VMO firing" }
        ]
      },
      {
        number: 2,
        title: "Early Strengthening",
        timeline: "Week 2-6",
        goals: ["Flexion to 120°", "Normal gait without crutches", "Single leg balance >30s"],
        precautions: ["No open chain extension 90-40°", "Avoid pivoting/cutting"],
        criteria: ["Normal gait", "Knee flexion 125°", "Balanced weight shifting"],
        exercises: [
          { name: "Bilateral Squats", parameters: "3x15 reps, bodyweight", cue: "Maintain neutral alignment, no valgus" },
          { name: "Stationary Cycling", parameters: "15 min, low resistance", cue: "Increase range of motion through pedaling" }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {!selectedProtocol ? (
        <div className="p-8 text-center max-w-2xl mx-auto mt-20 bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4 font-sans">ActiveRehab Protocols</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            مرحباً بك في نظام إدارة البروتوكولات. هذا العرض يوضح كيف ستظهر بيانات الإصابات التي قمنا باستخراجها في واجهة المستخدم.
          </p>
          <button 
            onClick={() => setSelectedProtocol(sampleProtocol)}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-blue-700 shadow-lg shadow-blue-200"
          >
            عرض مثال: عملية الرباط الصليبي (ACL)
          </button>
        </div>
      ) : (
        <ProtocolDetail 
          protocol={selectedProtocol} 
          onBack={() => setSelectedProtocol(null)} 
        />
      )}
    </div>
  );
}
