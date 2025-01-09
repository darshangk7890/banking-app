const HeaderBox = ({ type = "title", title, subtext, user }: HeaderBoxProps) => {
    return (
      <div className="header-box">
        <h1 className="header-box-title">
          {title}
          {type === 'greeting' && (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
              &nbsp;{user}
            </span>
          )}
        </h1>
        <p className="header-box-subtext">{subtext}</p>
      </div>
    )
  }
  
  export default HeaderBox