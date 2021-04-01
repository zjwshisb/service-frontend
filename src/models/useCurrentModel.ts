import React from "react";

export default function useCurrentModel() {

  const [current, setCurrent] = React.useState<number>(0)
  return {
    current,
    setCurrent
  }
}
