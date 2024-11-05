import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

export const IconCamera = ({ width = 24, height = 24, color = '#4F4F4F' }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 20" fill="none">
            <Path d="M12 14a4 4 0 100-8 4 4 0 000 8z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            <Path
                d="M23 17a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export const IconPencil = ({ width = 24, height = 24, color = '#4F4F4F' }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
};

export const IconSignOut = ({ width = 24, height = 24, color = '#4F4F4F' }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
};

export const IconLock = ({ width = 24, height = 24, color = '#4F4F4F' }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Path
                d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 1110 0v4"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export const IconMultiUsers = ({ width = 25, height = 24, color = '#4F4F4F' }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 25 24"
            fill="none"
        >
            <G
                clipPath="url(#clip0_262_244)"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Path d="M17.5 21v-2a4 4 0 00-4-4h-8a4 4 0 00-4 4v2M9.5 11a4 4 0 100-8 4 4 0 000 8zM23.5 21v-2a4 4 0 00-3-3.87M16.5 3.13a4 4 0 010 7.75" />
            </G>
            <Defs>
                <ClipPath id="clip0_262_244">
                    <Path fill="#fff" transform="translate(.5)" d="M0 0H24V24H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}
