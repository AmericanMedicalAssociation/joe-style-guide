### Description
This Pattern shows a tool drawer, which appears at the top of an article beneath the header. It contains a button and a drawer.

### Variables
~~~
tool_drawer {
  content:
    type: string / required
  id:
    type: string / required
  button: {
    info:
      type: string / optional
    text:
      type: string / required
    type:
      type: string / required "Button"
    style:
      type: string / required "tool"
    control_id:
      type: string / required
  }
}

~~~
