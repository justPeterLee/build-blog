---
title: "Example Blog Post"
date: "2024-08-19"
tags: ["react", "javascript"]
---

# hello world

#### August 19, 2024

### Earphones have come a long way. It's about time we forget about the headphone jack.

I have to admit that I was a bit late to join the bluetooth headphones party. I got my WH-1000XM3s only last year. It was my first pair of bluetooth headphones. About after a week with the WH-1000XM3s, I stopped carrying wired earpods. Noise cancelling was great for morning commutes in London. Battery life was so good that I never had to care about it. Returning back to wired headphones was not an option for me anymore.

However, the WH-1000XM3s are huge and can't be carried around easily. This made me want in-ear noise cancelling alternatives. Around the same time I started my search, Apple launched AirPods Pro. The reviews were all good so I decided to give it a try.

In this blog post, I will be talking about my overall experience with Apple's AirPods Pro. The following list is ordered by importance to me.

<p>test bock</p>
<BlogImage image='tony.jpg' folder="example" subTitle="Tony Tony Chopper, doctor of the straw hat pirates" reference="https://www.google.com"/>

```js file="components/code" language="jsx"
export default function BlogCode({
  children,
  language,
}: {
  code: string,
  language: string,
}) {
  return (
    <SyntaxHighlighter language={language} style={darcula}>
      {children}
    </SyntaxHighlighter>
  );
}
```

<!-- <p>"<code></code>"</p> -->
<code language="jsx" className="test" file="components/code">
  export default function BlogCode({
    children,
    language,
  }: {
    code: string,
    language: string,
  }) {
    return (
      &lt;SyntaxHighlighter language={language} style={darcula}&gt;
        {children}
      &lt;/SyntaxHighlighter&gt;
    );
}
</code>

<BlogVideo folder="example" video="1MinTimer.mp4"
subTitle="1 min timer"
reference="link"
/>
