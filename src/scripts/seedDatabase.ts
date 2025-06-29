import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const userId = '7ec69c18-a824-4f1f-a503-a7e01d0cd8a8';

const sampleEntries = [
  {
    content: 'Feeling great today! Had a productive morning.',
    mood: 'happy',
    summary: 'User had a productive morning and feels great.',
    themes: 'productivity, happiness',
    tip: 'Keep up the productive momentum with a to-do list for tomorrow.',
  },
  {
    content: 'A bit stressed with work deadlines.',
    mood: 'anxious',
    summary: 'User is feeling stressed due to work deadlines.',
    themes: 'stress, work pressure',
    tip: 'Try short breaks and deep breathing exercises during work.',
  },
  {
    content: 'Just a regular day, nothing special.',
    mood: 'neutral',
    summary: 'User had an uneventful day.',
    themes: 'neutrality, routine',
    tip: 'Consider journaling something positive that happened today.',
  },
  {
    content: 'Excited about the upcoming vacation!',
    mood: 'excited',
    summary: 'User is excited about vacation plans.',
    themes: 'excitement, anticipation',
    tip: 'Make a small checklist to prepare for your trip.',
  },
  {
    content: 'Feeling down and sad.',
    mood: 'sad',
    summary: 'User is feeling down and sad.',
    themes: 'sadness, low mood',
    tip: 'Consider talking to a friend or taking a short walk.',
  },
  {
    content: 'Had a wonderful coffee with friends.',
    mood: 'happy',
    summary: 'User enjoyed coffee and social time.',
    themes: 'friendship, joy',
    tip: 'Plan your next social meetup soon.',
  },
  {
    content: 'Overwhelmed by the amount of work.',
    mood: 'anxious',
    summary: 'User is overwhelmed with workload.',
    themes: 'workload, stress',
    tip: 'Break tasks into smaller chunks and prioritize.',
  },
  {
    content: 'Calm and relaxed after yoga.',
    mood: 'neutral',
    summary: 'User feels calm and relaxed post yoga session.',
    themes: 'relaxation, mindfulness',
    tip: 'Continue the habit with regular short yoga sessions.',
  },
  {
    content: 'Nervous about the presentation tomorrow.',
    mood: 'anxious',
    summary: 'User is nervous about upcoming presentation.',
    themes: 'nervousness, anticipation',
    tip: 'Practice your key points and visualize success.',
  },
  {
    content: 'Joyful because of family reunion.',
    mood: 'happy',
    summary: 'User is joyful due to family reunion.',
    themes: 'family, joy',
    tip: 'Capture the memories with photos or journaling.',
  },
  {
    content: 'Deep reflection after a major life event.',
    mood: 'reflective',
    summary: `
      After going through a significant life event recently, you’ve spent a lot of time reflecting on your emotions, actions, and the direction you want your life to take moving forward. 
      This period has been filled with waves of introspection, causing you to revisit past experiences, re-evaluate your personal values, and question long-standing beliefs.
      You’ve experienced moments of sadness, nostalgia, hope, and even gratitude. The memories tied to family, friends, and life-changing decisions seem to be replaying often in your mind, prompting a deeper understanding of yourself.
      As you sit quietly, journaling your thoughts, you realize that growth often comes from discomfort. 
      This emotional processing, while heavy at times, is gradually helping you heal and gain clarity. 
      You are beginning to identify patterns in your feelings and noticing how you react to emotional triggers.
      Taking time for self-reflection and writing down your observations is proving therapeutic and will likely help guide your next steps in life.
    `.trim(),
    themes: 'reflection, personal growth, healing, emotional processing',
    tip: 'Keep journaling your thoughts and consider talking with a trusted friend or counselor for added perspective.',
  },
];

async function insertSampleData() {
  for (const entry of sampleEntries) {
    const { data, error } = await supabase.from('journal_entries').insert({
      user_id: userId,
      content: entry.content,
      mood: entry.mood,
      summary: entry.summary,
      themes: entry.themes,
      tip: entry.tip,
    });

    if (error) {
      console.error('❌ Error inserting entry:', error);
    } else {
      console.log('✅ Inserted entry:', data);
    }
  }
}

insertSampleData();
