### Description
Displays an inline image within the body. It has three variants, left, right, and full-width (default). It has an optional caption and a zoom feature which opens a lightbox to reveal a larger image.

### Variables
~~~
inline_image {
  alignment:
    type: string / optional "left" or "right"
  caption:
    type: string / optional
  image: {
    alt:
      type: string / required
    src:
      type: string (url) / required
  }
}
~~~


