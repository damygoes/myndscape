export const generateMoodTipMessage = (
  mood: string | undefined,
  tip: string
) => {
  if (!mood) {
    return {
      intro: 'Here’s a tip for today:',
      tip,
    };
  }

  const lowercaseMood = mood.charAt(0).toLowerCase() + mood.slice(1);
  // const capitalizedMood = mood.charAt(0).toUpperCase() + mood.slice(1);

  return {
    intro: `Based on your last entry, you felt ${lowercaseMood}.`,
    tip,
  };
};
