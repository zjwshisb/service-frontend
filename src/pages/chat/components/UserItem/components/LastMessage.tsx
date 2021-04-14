import React from "react"

const Index: React.FC<{
  message: APP.Message
}> = props => {

  const [content, setContent] = React.useState('')

  React.useEffect(() => {
    if (props.message.type === 'text') {
      setContent(props.message.content)
    } else {
      setContent('[图片]')
    }
  }, [props.message])
  return React.useMemo(() => {
    return <>{content}</>
  }, [content])
}
export default Index
