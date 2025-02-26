import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = () => (
  <ContentLoader 
    speed={1}
    width={200}
    height={100}
    viewBox="0 0 200 100"
    backgroundColor="#333"
    foregroundColor="#999"
  >
    <rect x="40" y="30" rx="3" ry="3" width="40" height="40" /> 
    <circle cx="120" cy="50" r="25" /> 
    
  </ContentLoader>
)

export default MyLoader