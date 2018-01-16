### Description
The poll element contains a question and set of answers. It related to an article and has functionality to display the results.

### Variables
~~~
poll {
  inline:
    type: boolean / required
  label:
    type: boolean / required
  question:
    type: string / required
  answers: {
    input: {
      name: string / required
      id: string / required
    }
    label: {
      text: string / required
      id: string / required (id of what it labels)
    }
  }
}

~~~


