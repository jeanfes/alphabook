import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const IconHome = ({ width = 26, height = 26, color = "#fff" }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 26 26"
            fill="none"
        >
            <Path
                d="M9.424 1.988L2.956 7.035C1.876 7.877 1 9.667 1 11.025v8.904C1 22.717 3.268 25 6.052 25h13.896C22.732 25 25 22.717 25 19.941v-8.748c0-1.454-.972-3.316-2.16-4.146l-7.416-5.203c-1.68-1.177-4.38-1.117-6 .144z"
                fill={color}
                stroke={color === "#fff" ? "#4F4F4F" : color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path d="M13 20.194v-3.605 3.605z" fill="#fff" />
            <Path
                d="M13 20.194v-3.605"
                stroke={color === "#fff" ? "#4F4F4F" : "#fff"}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export const IconSaved = ({ width = 26, height = 26, color = "#fff" }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 22 20"
            fill={color}
        >
            <Path
                d="M10.147 2.864l.602.814.603-.813A5.198 5.198 0 0115.523.75c2.877 0 5.227 2.365 5.227 5.311 0 1.21-.191 2.325-.523 3.36l-.002.005c-.796 2.541-2.43 4.596-4.203 6.133-1.776 1.54-3.65 2.522-4.849 2.934h0l-.008.003a1.364 1.364 0 01-.415.054c-.188 0-.338-.027-.415-.054h0l-.008-.003c-1.2-.412-3.073-1.394-4.85-2.934-1.772-1.537-3.406-3.592-4.202-6.133h0l-.002-.005A10.92 10.92 0 01.75 6.06C.75 3.115 3.1.751 5.977.75c.809.001 1.607.192 2.33.56a5.228 5.228 0 011.84 1.554z"
                stroke={color === "#fff" ? "#4F4F4F" : color}
                strokeWidth={1.5}
            />
        </Svg>
    )
}

export const IconProfile = ({ width = 26, height = 26, color = "#fff" }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 16 22"
            fill={color}
        >
            <Path
                d="M8.16 9.87c-.1-.01-.22-.01-.33 0a4.42 4.42 0 01-4.27-4.43C3.56 2.99 5.54 1 8 1a4.436 4.436 0 01.16 8.87v0zM3.16 13.56c-2.42 1.62-2.42 4.26 0 5.87 2.75 1.84 7.26 1.84 10.01 0 2.42-1.62 2.42-4.26 0-5.87-2.74-1.83-7.25-1.83-10.01 0v0z"
                stroke={color === "#fff" ? "#4F4F4F" : color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export const IconAlpha = ({ width = 26, height = 26, color = "#fff" }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 22 22"
            fill={color}
        >
            <Path
                d="M11 21c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10z"
                stroke={color === "#fff" ? "#4F4F4F" : color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M11 20a9 9 0 100-18 9 9 0 000 18z"
                fill={color}
                stroke={color === "#fff" ? "" : color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M11 7v8M7 11h8"
                stroke={color === "#fff" ? "#4F4F4F" : "#fff"}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export const IconStore = ({ width = 27, height = 27, color = "#fff" }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 25 25"
            fill={color}
        >
            <Path
                d="M2.586 3.126h6a4 4 0 014 4v14a3 3 0 00-3-3h-7v-15z"
                stroke={color === "#fff" ? "#4F4F4F" : color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M22.586 3.126h-6a4 4 0 00-4 4v14a3 3 0 013-3h7v-15z"
                stroke={color === "#fff" ? "#4F4F4F" : color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}