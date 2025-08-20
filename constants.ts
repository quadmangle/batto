
import { Layer, LayerID } from './types';

export const LAYERS: Layer[] = [
  {
    id: LayerID.Firewall,
    title: 'Layer 2: Meta Firewall',
    description: 'Checks input for unsafe keywords and malicious intent before any other processing.',
  },
  {
    id: LayerID.Database,
    title: 'Layer 3: Default Replies DB',
    description: 'Matches input against a database of common greetings and simple questions for instant answers.',
  },
  {
    id: LayerID.TinyML,
    title: 'Layer 4: TinyML Intent Classification',
    description: 'A small, efficient ML model that classifies the user\'s primary intent (e.g., asking for weather).',
  },
  {
    id: LayerID.TinyLLM,
    title: 'Layer 5: TinyLLM Content Generation',
    description: 'A compact LLM that generates simple, contextual answers for common knowledge questions.',
  },
  {
    id: LayerID.TinyAI,
    title: 'Layer 6: TinyAI Complex Task Execution',
    description: 'A specialized model for multi-step tasks like calculations or unit conversions.',
  },
  {
    id: LayerID.LargeModel,
    title: 'Layer 7: Large Model Backend',
    description: 'For complex queries, the request is encrypted and sent to a powerful backend AI model.',
  },
];
