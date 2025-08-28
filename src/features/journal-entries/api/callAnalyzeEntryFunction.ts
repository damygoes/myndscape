import { supabase } from '@/services/supabase/supabase';
import { LocalisedAnalysedEntry } from '../types';

export async function callAnalyzeEntryFunction(
  content: string,
  language: string
) {
  const response = await supabase.functions.invoke('analyzeEntry', {
    body: { content, language },
  });

  if (response.error) {
    console.error('AI Analysis failed:', response.error);
    throw new Error('Failed to analyze journal entry');
  }

  return response.data.result as LocalisedAnalysedEntry;
  // Returns: { mood, mood_score, themes, summary, tip, localized }
}
