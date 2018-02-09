### Description
The flag is used in article teasers and article detail pages. It displays the article type and the issue. It has three color variants. Blue (default), Red, and Green. Additionally it has a large variant for article detail pages. Flag colors are determined by article type, not by user input.

~~~
flag {
  class:
    type: array / optional / joe__flag--larger, joe__flag--green, joe__flag--red
  type:
    type: string / required / display article type
  issue:
    type: string / required / displays article issue
}
~~~
