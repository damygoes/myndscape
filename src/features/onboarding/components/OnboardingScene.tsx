import { APP_COLORS } from "@/constants/colors";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Text, View } from "react-native";
import React, { JSX } from "react";

type Callout = {
    content: string | JSX.Element;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    offsetX?: number;
    offsetY?: number;
    bgColor?: string;
};

type OnboardingSceneProps = {
    image: any; // require('../../path/to/image')
    callouts?: Callout[];
    title: string;
    subtitle: string;
    totalIndicators: number; // total number of indicators
    activeIndex: number; // which indicator is active (renders vertical line)
};

export default function OnboardingScene({
    image,
    callouts = [],
    title,
    subtitle,
    totalIndicators,
    activeIndex,
}: OnboardingSceneProps) {
    const getPositionStyle = (callout: Callout) => {
        const { position, offsetX = 0, offsetY = 0 } = callout;

        switch (position) {
            case "top-left":
                return { top: offsetY, left: offsetX };
            case "top-right":
                return { top: offsetY, right: offsetX };
            case "bottom-left":
                return { bottom: offsetY, left: offsetX };
            case "bottom-right":
                return { bottom: offsetY, right: offsetX };
            default:
                return { top: offsetY, left: offsetX };
        }
    };

    return (
        <View className="w-full h-full flex-col justify-center gap-12 border-none">
            {/* Image with callouts */}
            <View className="flex justify-center items-center h-1/2 relative border-none">
                <Image
                    source={image}
                    contentFit="contain"
                    cachePolicy="memory-disk"
                    transition={300}
                    priority="high"
                    style={{ width: "100%", height: "100%" }}
                />

                {callouts.map((callout, idx) => (
                    <View
                        key={idx}
                        style={[
                            {
                                backgroundColor: callout.bgColor || "#D9D9D9",
                                padding: 16,
                                borderRadius: 24,
                                position: "absolute",
                            },
                            getPositionStyle(callout),
                        ]}
                        className="flex justify-center items-center"
                    >
                        {typeof callout.content === "string" ? (
                            <Text
                                style={{
                                    color: APP_COLORS["body-text"],
                                    fontSize: 12,
                                    fontWeight: "400",
                                    fontFamily: "Manrope"
                                }}
                            >
                                {callout.content}
                            </Text>
                        ) : (
                            callout.content
                        )}
                    </View>
                ))}

                {/* Blur + Gradient Fade at Bottom */}
                <BlurView
                    intensity={2}
                    tint="light"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 40,
                        borderWidth: 0,
                    }}
                >
                    <LinearGradient
                        colors={[
                            "rgba(255,255,255,0)",
                            "rgba(255,255,255,0.6)",
                            "rgba(255,255,255,1)",
                        ]}
                        locations={[0, 0.5, 1]}
                        style={{
                            flex: 1,
                            borderWidth: 0,
                        }}
                    />
                </BlurView>
            </View>

            {/* Title & Subtitle */}
            <View
                style={{
                    gap: 16,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 20,
                }}
            >
                <Text
                    style={{
                        color: APP_COLORS["body-text"],
                        fontSize: 24,
                        fontWeight: "600",
                        fontFamily: "Manrope"
                    }}
                >
                    {title}
                </Text>
                <Text
                    style={{
                        color: APP_COLORS.secondary,
                        fontSize: 18,
                        fontWeight: "400",
                        textAlign: "center",
                        fontStyle: "normal",
                        fontFamily: "Manrope"
                    }}
                >
                    {subtitle}
                </Text>
            </View>

            {/* Dynamic Indicators */}
            <View
                style={{
                    gap: 8,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {Array.from({ length: totalIndicators }).map((_, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                        <View
                            key={idx}
                            style={{
                                width: isActive ? 6 : 8,
                                height: isActive ? 18 : 8,
                                borderRadius: isActive ? 20 : 999,
                                backgroundColor: isActive
                                    ? APP_COLORS.primary
                                    : APP_COLORS.grey,
                            }}
                        />
                    );
                })}
            </View>
        </View>
    );
}
