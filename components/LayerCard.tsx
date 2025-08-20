
import React from 'react';
import { Layer } from '../types';

interface LayerCardProps {
  layer: Layer;
  isActive: boolean;
}

const LayerCard: React.FC<LayerCardProps> = ({ layer, isActive }) => {
  const baseClasses = 'p-4 border rounded-xl transition-all duration-300';
  const inactiveClasses = 'bg-slate-900/50 border-slate-700 hover:bg-slate-700/50 hover:border-cyan-700';
  const activeClasses = 'bg-green-900/50 border-green-500 ring-2 ring-green-500 shadow-lg shadow-green-500/20 animate-pulse';

  return (
    <div className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      <h3 className={`font-bold text-lg ${isActive ? 'text-green-300' : 'text-cyan-400'}`}>
        {layer.title}
      </h3>
      <p className="text-sm text-slate-400">{layer.description}</p>
    </div>
  );
};

export default LayerCard;
