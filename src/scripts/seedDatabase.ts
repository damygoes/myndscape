import dotenv from 'dotenv';

dotenv.config({
  path: ".env"
});

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const userId = '7ec69c18-a824-4f1f-a503-a7e01d0cd8a8';

const sampleEntries = [
  { content: 'Feeling great today! Had a productive morning.', mood: 'happy', ai_summary: 'User had a productive morning and feels great.' },
  { content: 'A bit stressed with work deadlines.', mood: 'anxious', ai_summary: 'User is feeling stressed due to work deadlines.' },
  { content: 'Just a regular day, nothing special.', mood: 'neutral', ai_summary: 'User had an uneventful day.' },
  { content: 'Excited about the upcoming vacation!', mood: 'excited', ai_summary: 'User is excited about vacation plans.' },
  { content: 'Feeling down and sad.', mood: 'sad', ai_summary: 'User is feeling down and sad.' },
  { content: 'Had a wonderful coffee with friends.', mood: 'happy', ai_summary: 'User enjoyed coffee and social time.' },
  { content: 'Overwhelmed by the amount of work.', mood: 'anxious', ai_summary: 'User is overwhelmed with workload.' },
  { content: 'Calm and relaxed after yoga.', mood: 'neutral', ai_summary: 'User feels calm and relaxed post yoga session.' },
  { content: 'Nervous about the presentation tomorrow.', mood: 'anxious', ai_summary: 'User is nervous about upcoming presentation.' },
  { content: 'Joyful because of family reunion.', mood: 'happy', ai_summary: 'User is joyful due to family reunion.' },
  { content: 'Had a stressful day but got through it.', mood: 'anxious', ai_summary: 'User experienced stress but managed it well.' },
  { content: 'Content with how things are going.', mood: 'neutral', ai_summary: 'User feels content with current life situation.' },
  { content: 'Excited to start a new hobby.', mood: 'excited', ai_summary: 'User is excited about starting a new hobby.' },
  { content: 'Feeling lonely today.', mood: 'sad', ai_summary: 'User is feeling lonely.' },
  { content: 'Had a productive workout session.', mood: 'happy', ai_summary: 'User had a productive exercise session.' },
  { content: 'Worried about financial situation.', mood: 'anxious', ai_summary: 'User is worried about finances.' },
  { content: 'Relaxing by the beach.', mood: 'neutral', ai_summary: 'User is relaxing by the beach.' },
  { content: 'Thrilled about job promotion.', mood: 'excited', ai_summary: 'User is thrilled about career progress.' },
  { content: 'Feeling a bit sad and tired.', mood: 'sad', ai_summary: 'User is feeling sad and tired.' },
  { content: 'Looking forward to the weekend.', mood: 'happy', ai_summary: 'User is looking forward to weekend.' },
];

async function insertSampleData() {
  for (const entry of sampleEntries) {
    const { data, error } = await supabase.from('journal_entries').insert({
      user_id: userId,
      content: entry.content,
      mood: entry.mood,
      ai_summary: entry.ai_summary,
    });

    if (error) {
      console.error('Error inserting entry:', error);
    } else {
      console.log('Inserted entry:', data);
    }
  }
}

insertSampleData();
