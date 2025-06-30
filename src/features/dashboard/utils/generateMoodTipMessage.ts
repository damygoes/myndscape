export const generateMoodTipMessage = (mood: string | undefined, tip: string) => {
    if (!mood) {
      return {
        intro: 'Here’s a tip for today:',
        tip,
      };
    }
  
    const capitalizedMood = mood.charAt(0).toUpperCase() + mood.slice(1);
    return {
      intro: `You felt ${capitalizedMood} today.`,
      tip,
    };
};
  