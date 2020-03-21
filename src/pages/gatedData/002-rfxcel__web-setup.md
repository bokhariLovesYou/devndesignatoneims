---
title: "Web Setup for rfxcel"
metaTitle: "Web Setup for rfxcel"
metaDescription: "Web Setup for rfxcel"
date: 2020-03-15 07:00:00
author: "Paras Bokhari"
image: null
gated: true
documentation: false
documentationTopic: null
tags:
  title: rfxcel
  client: true
---

## Summary

At OneIMS, we utilize **github** (to version control), **Local by FlyWheel** (to locally set up a dev environment) and **DeployBot** (for continuous deployment to our staging environment). We manage the database (that is, adding or updating content) in the staging environment itself. We use WPEngine to host WordPress sites for us.

The process is similar to how it is currently at Rfxcel and looks something like this.

a.) Developer needs to make updates to the codebase

b.) They locally run the site using Local by Flywheel

c.) They make changes to the codebase, test on their local environment and push to the Github Repository (or their branch. If being pushed to their own branch - the lead approves and merges to the master branch).

d.) Once the updates are pushed to the master branch, it is deployed automatically to the staging environment of the site using DeployBot.

e.) Content editors (such as adding new blog posts, editing blog posts) are done on the staging environment.

f.) When everything is tested from content to codebase it is pushed to the live environment using WPEngine.

g.) The live environment gets backed up every day to ensure no errors.

## By Example

This is one of our test sites: [http://sitespeedtest.wpengine.com/](http://sitespeedtest.wpengine.com/)

Below is a generic process of how we make updates to the codebase for sites within our network.

**Locally Running the site**

By default, developers working at OneIMS have access to our own properties. We can, however, write a guide on how a developer outside of our circle can have access to a web property under our network. Below are the processes developers at OneIMS may take to run the site locally with the database. The processes taken by developers outside our circle will be pretty similar as well (and can be shared in another document).

1. Open Flywheel
2. Under connect find the property to connect to and click **Pull to Local**:
   ![alt text](https://i.imgur.com/ZZe6A84.png "https://i.imgur.com/ZZe6A84.png")
3. It will provide some options similar to - select Production and click **Connect & Pull Site**
   ![alt text](https://i.imgur.com/hmrHcnY.png "https://i.imgur.com/ZZe6A84.png")
4. It will take a few minutes to create a local environment
5. Please click on **View Site**: to run the site in a browser.
   ![alt text](https://i.imgur.com/4p48811.png "https://i.imgur.com/ZZe6A84.png")
6. Once done, please open the site in a text editor - Users/{{user}}/Local Sites/{{site-name}}/app/public
7. And we have our project in our text-editor:
   ![alt text](https://i.imgur.com/wMLg52f.png "https://i.imgur.com/wMLg52f.png")

**Making Changes**

1. Pull changes from the github/bitbucket master repo and merge conflicts (if any).
2. Make any changes to the codebase and test locally:
   ![alt text](https://i.imgur.com/DHWxRuQ.png "https://i.imgur.com/DHWxRuQ.png")
   shows on localhost:
   ![alt text](https://i.imgur.com/5UOfGGj.png "https://i.imgur.com/5UOfGGj.png")
3. Once done, push to the github repo.
   ![alt text](https://i.imgur.com/1FFsDJP.png "https://i.imgur.com/1FFsDJP.png")
4. Head over to the staging environment
5. Updates will be pushed automatically to the server’s staging environment:
   ![alt text](https://i.imgur.com/HEh17x7.png "https://i.imgur.com/HEh17x7.png")

**Pushing Live**

1. Head over to the WP Dashboard of the live site and click WP Engine > Legacy Staging:
   ![alt text](https://i.imgur.com/zOr1UPj.png "https://i.imgur.com/zOr1UPj.png")
2. Click **Deploy site from staging environment**:
   ![alt text](https://i.imgur.com/L0OBOyq.png "https://i.imgur.com/L0OBOyq.png")
   and select **Move All Tables**
3. And we have our updates in the live environment:
   ![alt text](https://i.imgur.com/ysnVcsz.png "https://i.imgur.com/ysnVcsz.png")

This is generic demo of how we can manage the development setup. The repository structure could remain the same as how it is where the continuous deployment may trigger from the master branch.

> Please note: While creating this document, we primarily tried to create a quick demo with the existing rfxcel’s **staging** site - however, faced an error while trying to run it locally, which could be due to a configuration conflict in the staging environment of the existing staging site. But the steps outlined above would be extremely similar if not exactly the same.
