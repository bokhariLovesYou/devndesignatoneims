---
title: "Using Flexbox for Horizontal Scrolling Navigation"
metaTitle: "Using Flexbox for Horizontal Scrolling Navigation"
metaDescription: "As a design pattern, it is one that is beginning to be used much more. It’s great for touch devices, as horizontal scrolling feels more natural. It’s great on a Mac too, with a trackpad or Magic Mouse it’s just as easy as vertically scrolling. That’s potentially a good chunk of your audience, you can improve the user experience for and utilise space better."
date: 2020-03-11 10:00:00
author: "Paras Bokhari"
image: "../../images/pawel-czerwinski-yXABLtZJpdI-unsplash.jpg"
gated: false
tags:
  title: CSS
  client: false
---

In this post, I want to cover how flexbox can be used to achieve the same thing and the benefits over the `inline-block` method.

As a design pattern, it is one that is beginning to be used much more. It’s great for touch devices, as horizontal scrolling feels more natural. It’s great on a Mac too, with a trackpad or Magic Mouse it’s just as easy as vertically scrolling. That’s potentially a good chunk of your audience, you can improve the user experience for and utilise space better.

## The implementation

The implementation is flexible to work with your layout. Whether you have it positioned by your logo, or underneath it will be fine. Just apply the styles, to whichever element you prefer.

### CSS: for the container

Aside from making the element containing your navigation items a flex container, you need to make sure they don’t wrap. This is achieved with the `flex-wrap` property. The final necessary property is to allow the container to `overflow`. You can use `scroll` or `auto`, however, I would recommend `auto` as it will only scroll if absolutely necessary.

```css
.scroll {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

.scroll::-webkit-scrollbar {
  display: none;
}
```

The next set of properties aren’t mandatory, but do make the usability nicer, particularly `-webkit-overflow-scrolling`. On iOS devices, this makes scroll areas have momentum and ease of use. Many sites don’t seem to use this, so please do! Android devices by default are easier to scroll.

You can also hide the scrollbar completely by targeting the `::-webkit-scrollbar` pseudo element and this will improve the appearance for Windows. However, from some brief testing on Windows, it can make it trickier to scroll. Although, it could depend on your mouse, so you may want to use this cautiously. _Sadly with Firefox it seems you’re out of luck_.

### CSS: for the items

Each item needs a `flex-grow` and `flex-shrink` value of `0`. The `flex-basis` property can be a percentage or pixel value if you for some reason need items to be of a specific width.

```css
.item {
  flex: 0 0 auto;
}
```

**HTML**

```html
<header class="scroll">
  <a href="https://oneims.com">Logo</a>
  <nav>
    <a href="https://oneims.com/blog">Blog</a>
    <a href="https://oneims.com/portfolio">Portfolio</a>
    <a href="https://oneims.com/downloads">Downloads</a>
    <a href="https://oneims.com/about">About</a>
    <a href="https://oneims.com/contact">Contact</a>
  </nav>
</header>
```

> Depending on which area you want to scroll, you can apply the styles to the header or navigation.

## Benefits over using inline-block method

Admittedly the benefits aren’t too obvious when looking, the behaviour is the same. However the couple of things I mention below make it worthwhile.

### No set widths required

Paying attention to example two in the Codepen, you no longer need to set widths. Whereas in the `inline-block` method you had to. Albeit I have put one in the flex property of the logo, this is used throughout all examples.

This is useful if you want your logo to remain a specific size. If it was a percentage through the inline-block method it would resize. Which is fine, though it will take you so far before you need to adjust at another breakpoint. Flexbox allows you to avoid that and keep things more managable.
