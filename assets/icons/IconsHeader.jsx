import Svg, { Path } from "react-native-svg"

export const IconMenu = ({ width = 20, height = 17, color = "#4F4F4F" }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 20 17"
            fill="none"
        >
            <Path
                d="M19 2.25H1c-.41 0-.75-.34-.75-.75S.59.75 1 .75h18c.41 0 .75.34.75.75s-.34.75-.75.75zM19 9.5H1c-.41 0-.75-.34-.75-.75S.59 8 1 8h18c.41 0 .75.34.75.75s-.34.75-.75.75zM19 16.5H1c-.41 0-.75-.34-.75-.75S.59 15 1 15h18c.41 0 .75.34.75.75s-.34.75-.75.75z"
                fill={color}
            />
        </Svg>
    )
}

export const IconNotification = ({ width = 18, height = 22, color = "#4F4F4F" }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 18 22"
            fill="none"
        >
            <Path
                d="M9.02 19.53c-2.33 0-4.66-.37-6.87-1.11-.84-.29-1.48-.88-1.76-1.65C.1 16 .2 15.15.66 14.39l1.15-1.91c.24-.4.46-1.2.46-1.67V7.92c0-3.72 3.03-6.75 6.75-6.75s6.75 3.03 6.75 6.75v2.89c0 .46.22 1.27.46 1.68l1.14 1.9a2.768 2.768 0 01-.445 3.402 2.72 2.72 0 01-1.045.628c-2.2.74-4.53 1.11-6.86 1.11zm0-16.86c-2.89 0-5.25 2.35-5.25 5.25v2.89c0 .73-.3 1.81-.67 2.44l-1.15 1.91c-.22.37-.28.76-.15 1.09.12.34.42.6.83.74a20 20 0 0012.79 0c.36-.12.64-.39.77-.75s.1-.75-.1-1.08l-1.15-1.91c-.38-.65-.67-1.72-.67-2.45V7.92c0-2.9-2.35-5.25-5.25-5.25z"
                fill={color}
            />
            <Path
                d="M10.88 2.94c-.07 0-.14-.01-.21-.03-.29-.08-.57-.14-.84-.18-.85-.11-1.67-.05-2.44.18-.28.09-.58 0-.77-.21a.742.742 0 01-.14-.78A2.724 2.724 0 019.03.18c1.14 0 2.14.68 2.55 1.74.1.27.05.57-.14.78-.15.16-.36.24-.56.24zM9.02 21.81c-.99 0-1.95-.4-2.65-1.1-.7-.7-1.1-1.66-1.1-2.65h1.5c0 .59.24 1.17.66 1.59.42.42 1 .66 1.59.66 1.24 0 2.25-1.01 2.25-2.25h1.5c0 2.07-1.68 3.75-3.75 3.75z"
                fill={color}
            />
        </Svg>
    )
}