
import React from 'react';
import { LAYERS } from '../constants';
import { LayerID } from '../types';
import LayerCard from './LayerCard';

interface ArchitectureVisualizerProps {
  activeLayerId: LayerID | null;
}

const ArchitectureVisualizer: React.FC<ArchitectureVisualizerProps> = ({ activeLayerId }) => {
  return (
    <div className="w-full lg:w-1/2 h-full lg:h-[90vh] p-6 bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 overflow-y-auto">
       <div className="p-4 text-center mb-4">
        <h2 className="text-xl font-bold text-cyan-400">AI Architecture</h2>
        <p className="text-slate-400 text-sm">Real-time processing layer activation</p>
      </div>
      <div className="space-y-4">
        {LAYERS.map((layer) => (
          <LayerCard 
            key={layer.id}
            layer={layer} 
            isActive={activeLayerId === layer.id} 
          />
        ))}
      </div>
    </div>
  );
};

export default ArchitectureVisualizer;
