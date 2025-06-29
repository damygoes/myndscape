import { supabase } from '@/services/supabase';

export async function callAnalyzeEntryFunction(content: string) {
  const response = await supabase.functions.invoke('analyzeEntry', {
    body: { content },
  });

  if (response.error) {
    console.error('AI Analysis failed:', response.error);
    throw new Error('Failed to analyze journal entry');
  }

  return response.data.result;  // will be { mood, summary, themes, tip }
}
3