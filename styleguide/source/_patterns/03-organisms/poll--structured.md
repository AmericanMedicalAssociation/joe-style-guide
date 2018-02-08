### Description
The structured poll element contains a question and set of answers. It relates to an article and has functionality to display the results. It displays full-width on landing pages. The structured poll has the ability to show multiple polls.

### Variables
~~~
polls {
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


