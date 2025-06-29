import { cn } from '@/utils/clsx';
import { ReactNode } from 'react';
import { Text, TextProps, View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <View
      className={cn('gap-2 p-5 bg-zinc-200/80 min-h-36 drop-shadow-md rounded-3xl dark:bg-gray-800', className)}
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
      className={cn('text-lg font-semibold text-zinc-500 dark:text-gray-100', className)}
      {...props}
    >
      {children}
    </Text>
  );
};

export const CardDescription = ({ children, className, ...props }: TextProps) => {
  return (
    <Text
      className={cn('text-base text-zinc-800 dark:text-gray-400', className)}
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
      className={cn('pt-2 mt-2 border-t border-gray-100 dark:border-gray-700', className)}
      {...props}
    >
      {children}
    </View>
  );
};
