import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const IconNoCheck = ({ width = 18, height = 18 }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 18 17"
            fill="none"
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.447 17a8.5 8.5 0 100-17 8.5 8.5 0 000 17zm3.766-12.266a.8.8 0 010 1.132L10.578 8.5l2.635 2.634a.8.8 0 11-1.132 1.132L9.447 9.63l-2.634 2.635a.8.8 0 11-1.132-1.132L8.316 8.5 5.68 5.866a.8.8 0 111.132-1.132L9.447 7.37l2.634-2.635a.8.8 0 011.132 0z"
                fill="#8E8E93"
            />
        </Svg>
    )
}

export const IconCheck = ({ width = 18, height = 18 }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 17 17"
            fill="none"
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.5 0a8.5 8.5 0 100 17 8.5 8.5 0 000-17zm3.684 7.063a.773.773 0 10-1.186-.99L7.675 10.06l-1.72-1.72a.773.773 0 00-1.092 1.093L7.18 11.75a.774.774 0 001.14-.052l3.863-4.636z"
                fill="#3EB489"
            />
        </Svg>
    )
}

export const IconEye = ({ width = 18, height = 18, color = "#8E8E93" }) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 19 18"
            fill="none"
        >
            <Path
                d="M12.469 9a2.74 2.74 0 01-.87 1.989 3.054 3.054 0 01-2.099.823 3.054 3.054 0 01-2.1-.823A2.74 2.74 0 016.532 9c0-.746.313-1.461.87-1.989A3.055 3.055 0 019.5 6.187c.787 0 1.543.297 2.1.824A2.74 2.74 0 0112.468 9z"
                fill={color}
            />
            <Path
                d="M0 9s3.563-6.188 9.5-6.188C15.438 2.813 19 9 19 9s-3.563 6.188-9.5 6.188C3.562 15.188 0 9 0 9zm9.5 3.938c1.102 0 2.16-.415 2.939-1.154A3.835 3.835 0 0013.656 9a3.835 3.835 0 00-1.217-2.784A4.276 4.276 0 009.5 5.062c-1.102 0-2.16.415-2.939 1.154A3.835 3.835 0 005.344 9c0 1.044.438 2.046 1.217 2.784A4.276 4.276 0 009.5 12.937z"
                fill={color}
            />
        </Svg>
    )
}
