---
title: "Member Directory - User Registration"
metaTitle: "Member Directory - User Registration"
metaDescription: "Member Directory - User Registration"
date: 2020-05-29 06:10:00
author: "Paras Bokhari"
image: null
gated: true
documentation: true
documentationTopic: "Member Directory"
tags:
  title: SWFL
  client: true
---

> This document explains some details regarding user registrations

![enter image description here](https://i.imgur.com/w1h2syk.png)Users may register on this page to subscribe to a membership. They'll be redirected to the dashboard after a successful subscription.

### Additional Contacts

Additional Contacts added here will receive an email to reset their password - similar to how they may receive when an account owner adds them from the dashboard.

> Please Note: We can add three sub-accounts in our registration form. However, as our users and sub-users are integrated with HubSpot - what this may mean is that there will be three additional roundtrips executed when a user subscribes to a membership. This may add additional loading time while registering thus is not recommended. However, please reach out to us if you'd like to add them anyway.

### Hubspot Integration

Whenever a user registers on our site, all this information will be pushed to HubSpot and the user may be saved as a contact. Sub Accounts will share the same organizational information as the parent contact. Below are the lists of fields our members may have in HubSpot in addition to the lists they are subscribed to.

    "firstname"
    "lastname"
    "email"
    "company"
    "business_category"
    "business_description"
    "address"
    "city"
    "state"
    "zip"
    "website"
    "phone"
    "employees_fulltime"
    "employees_part_time"
    "membership_type"
    "membership_price"
    "main_contact"
    "active_membership"
