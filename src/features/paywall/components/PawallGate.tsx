import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useUserUsageContext } from "@/features/user/contexts/UserUsageContext";
import { Plan, type PlanType } from "../types";

type PaywallGateProps = {
    require: PlanType;
    children: ReactNode;
    fallback?: ReactNode; // optional custom fallback
};

const PLAN_ORDER = [Plan.FREE, Plan.PREMIUM]; // importance ranking

export function PaywallGate({ require, fallback, children }: PaywallGateProps) {
    const { data: userUsage, isLoading } = useUserUsageContext();
    const router = useRouter();

    if (isLoading) return null; // or loading spinner

    const currentPlan = userUsage?.plan_id ?? Plan.FREE; // default to free if not available

    const hasAccess =
        PLAN_ORDER.indexOf(currentPlan) >= PLAN_ORDER.indexOf(require);

    if (hasAccess) {
        return <>{children}</>;
    }

    // Show custom fallback if provided
    if (fallback) return <>{fallback}</>;

    // Default fallback → lock + upgrade button
    return (
        <View className="flex items-center justify-center p-2">
            <Text className="text-lg mb-3">
                This feature requires a <Text className="capitalize font-semibold">{require}</Text> plan
            </Text>
            <TouchableOpacity
                className="bg-blue-600 px-4 py-2 rounded-xl"
                onPress={() => router.push("/paywall")}
            >
                <Text className="text-white font-medium">Upgrade Now</Text>
            </TouchableOpacity>
        </View>
    );
}