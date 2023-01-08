import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader style={{marginBottom: 65}}
        speed={2}
        width={280}
        height={467}
        viewBox="0 0 280 467"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="109" y="274" rx="0" ry="0" width="0" height="1" />
        <rect x="1" y="210" rx="0" ry="0" width="275" height="0" />
        <rect x="-1" y="267" rx="0" ry="0" width="275" height="31" />
        <circle cx="135" cy="127" r="123" />
        <rect x="10" y="422" rx="0" ry="0" width="97" height="40" />
        <rect x="118" y="413" rx="26" ry="26" width="144" height="52" />
        <rect x="229" y="360" rx="0" ry="0" width="0" height="1" />
        <rect x="0" y="314" rx="10" ry="10" width="277" height="88" />
    </ContentLoader>
)

export default Skeleton