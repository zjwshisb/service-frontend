import React from "react";

export default function useCurrentModel() {
  const [current, setCurrent] = React.useState<APP.User | undefined>(() => {
    return undefined
  })
  return {
    current,
    setCurrent
  }
}
