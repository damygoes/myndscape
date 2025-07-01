import { cn } from '@/utils/clsx';
import { colors } from '@/utils/colors';
import { ReactNode } from 'react';
import { Text, TextProps, View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <View
      className={cn('gap-2 p-6 min-h-36 drop-shadow-md rounded-3xl', className)}
      style={{
        backgroundColor: colors.cardBackground,
        shadowColor: colors.shadow,
      }}
      {...props}
    >
      {children}
    </View>
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
      className={cn('pt-2 mt-2 border-t', className)}
      style={{ borderTopColor: colors.border }}
      {...props}
    >
      {children}
    </View>
  );
};