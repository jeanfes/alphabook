import Svg, { Path } from "react-native-svg"

export const IconSearch = ({ width = 22, height = 23, color = "#828282" }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 22 23"
            fill="none"
        >
            <Path
                d="M10.575 21.082C4.908 21.082.295 16.557.295 11S4.908.918 10.575.918c5.666 0 10.28 4.525 10.28 10.082s-4.614 10.082-10.28 10.082zm0-18.689C5.73 2.393 1.799 6.26 1.799 11s3.931 8.607 8.776 8.607c4.844 0 8.775-3.866 8.775-8.607s-3.931-8.607-8.775-8.607zM21.105 22.066a.751.751 0 01-.531-.217l-2.006-1.967a.734.734 0 010-1.043.767.767 0 011.063 0l2.006 1.968c.29.285.29.757 0 1.042a.751.751 0 01-.532.217z"
                fill={color}
            />
        </Svg>
    )
}

export const IconMicro = ({ width = 18, height = 22, color = "#828282" }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 18 22"
            fill="none"
        >
            <Path
                d="M8.784 14.636c2.216 0 4.011-1.726 4.011-3.858V5.475c0-2.132-1.795-3.858-4.011-3.858-2.217 0-4.012 1.726-4.012 3.858v5.303c0 2.131 1.795 3.858 4.012 3.858z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M1.111 8.994v1.64c0 4.07 3.44 7.377 7.673 7.377 4.232 0 7.672-3.308 7.672-7.377v-1.64M7.39 5.89a4.19 4.19 0 012.788 0M7.981 7.934a3.27 3.27 0 011.615 0M8.784 18.01v2.893"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}