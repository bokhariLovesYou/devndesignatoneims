---
title: "Find Your Product - Module Updates 03-24-20"
metaTitle: "Find Your Product - Module Updates 03-24-20"
metaDescription: "Find Your Product - Module Updates 03-24-20"
date: 2020-03-19 04:00:00
author: "Paras Bokhari"
image: null
gated: true
documentation: true
documentationTopic: "Find Your Product"
tags:
  title: Dynapar
  client: true
---

## Updates

**<span style="color: #e83e8c;">For the button text, instead of merging the selection text, can we go with general button text such as “View Matching Solutions”?</span>**

One core reason why we primarily went ahead with dynamic buttons’ text was to show the user that the ‘data’ (or the destination in this case) has been updated and/or changed. Updating the text within our button makes it clear to the user that their new selection has been updated.

However, we’ve gone ahead and provided another functionality within our module which lets us use a ‘Generic Text’ for our buttons if enabled.

We’ll now see a ‘Render Generic Destination Button’ toggler: ![https://i.imgur.com/n0e35Qi.png](https://i.imgur.com/n0e35Qi.png)

Which, when enabled, would let us choose a generic text for our Destination Buttons:
![enter image description here](https://i.imgur.com/u2KGKCP.png)

Which looks like this:
![enter image description here](https://i.imgur.com/0xeh7ld.png)

**<span style="color: #e83e8c;">Instead of a question mark with link, can we adjust this text? For example, we may want to use “Learn How” in instead of “?” but it may be situational.</span>**

We’ve gone ahead and added another field which is for the ‘Question Help Title’:
![enter image description here](https://i.imgur.com/Jm7e2zL.png)

> **Please note:** If the Question Help URL is empty - the Help text won’t
> appear at all.

This is how it may look on the frontend:

![enter image description here](https://i.imgur.com/SLvtCMX.png)

The Question’s help URL is programmed to open up in a new tab.

**<span style="color: #e83e8c;">Can we use this module on other pages?</span>**

Currently, this has been added in the Industry Page templates. We’d need to add this module in other page templates in order for it to be visible in the page editor for those pages. It’s programmed and designed to be worked anywhere on the site - however has only been tested in the Industry Page Template for now. Programatically, it may work on any other page template - however might require some minor generic design tweaks.

**<span style="color: #e83e8c;">On IE11 and Edge build 18362, when you click the results button it opens multiple tabs. FF and Chrome do not open multiple tabs but the results open a new tab. Would prefer to open in the same tab.</span>**

The Final Destination Button will now open the result using the same tab.
