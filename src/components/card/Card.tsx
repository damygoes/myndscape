import { cn } from '@/utils/clsx';
import { colors } from '@/utils/colors';
import { BlurView } from 'expo-blur';
import { ReactNode } from 'react';
import { Text, TextProps, View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export const Card = ({
  children,
  className,
  intensity = 100,
  style,
  ...props
}: CardProps) => {
  return (
    <BlurView
      tint="dark"
      intensity={100}
      className={cn('gap-2 p-6 min-h-36 rounded-3xl', className)}
      style={[
        {
          backgroundColor: colors.cardBackground,
          borderRadius: 24,
          // borderWidth: 1,
          overflow: 'hidden',
          shadowColor: colors.shadow,
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 30,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </BlurView>

  );
};

export const CardHeader = ({ children, className, ...props }: CardProps) => {
  return (
    <View
      className={cn('flex flex-row items-center gap-2', className)}
      {...props}
    >
      {children}
    </View>
  );
};

export const CardTitle = ({ children, className, ...props }: TextProps) => {
  return (
    <Text
      className={cn('text-lg font-semibold', className)}
      style={{ color: colors.textPrimary }}
      {...props}
    >
      {children}
    </Text>
  );
};

export const CardDescription = ({ children, className, ...props }: TextProps) => {
  return (
    <Text
      className={cn('text-base', className)}
      style={{ color: colors.textSecondary }}
      {...props}
    >
      {children}
    </Text>
  );
};

export const CardContent = ({ children, className, ...props }: CardProps) => {
  return (
    <View
      className={cn('py-2', className)}
      {...props}
    >
      {children}
    </View>
  );
};

export const CardFooter = ({ children, className, ...props }: CardProps) => {
  return (
    <View
      className={cn('pt-4 px-auto', className)}
      style={{
        borderTopColor: colors.border,
        borderTopWidth: 1,
      }}
      {...props}
    >
      {children}
    </View>
  );
};