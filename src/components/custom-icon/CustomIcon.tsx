import HomeIcon from "../../../assets/icons/home.svg";
import ClockIcon from "../../../assets/icons/clock.svg";
import SettingsIcon from "../../../assets/icons/settings.svg";

const icons = {
    home: HomeIcon,
    history: ClockIcon,
    settings: SettingsIcon,
};

export type IconName = keyof typeof icons;

export function CustomIcon({
    name,
    size = 24,
    color = "black",
    stroke,
    strokeWidth = 1,
}: {
    name: IconName;
    size?: number;
    color?: string;
    stroke?: string;
    strokeWidth?: number;
}) {
    const Component = icons[name];
    return (
        <Component
            width={size}
            height={size}
            fill={color}
            stroke={stroke ? stroke : color}
            strokeWidth={strokeWidth}

        />
    );
}