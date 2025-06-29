import { Card, CardContent, CardDescription, CardTitle } from '@/components/card/Card';

export const AiInsights = () => {
  return (
    <Card className="bg-purple-100 dark:bg-purple-900">
      <CardTitle>AI Insight</CardTitle>
      <CardContent>
        <CardDescription>
        Based on your recent entries, you’ve mentioned "stress" 3 times this week.
        </CardDescription>
      </CardContent>
    </Card>
  );
};
