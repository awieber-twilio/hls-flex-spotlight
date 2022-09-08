# Enabling Effective Patient Engagements with Twilio Flex
This workshop is designed for the healthcare & life sciences industry. [Twilio Flex](https://www.twilio.com/flex) is a popular contact center platform amongst hospitals, researchers, clinics, and more for efficient, effective, and satisfying patient engagements. Flex allows for customizability, channel flexibility, and the unlimited ability to change, adapt and iterate your contact center. 

## Workshop Use Case
You are a developer at Owl Health tasked with building a contact center that will increase patient satisfaction and efficiency of the clinic. Owl Health has a team of Schedulers who set up appointments with patients directly and a team of Educators who assist patients during their appointments. Schedulers and Educators both use a range of tools within their daily activities, including a scheduling portal, a third party video client, various checklists, an office phone, and sometimes even their personal devices. Your job is to make it easier for these agents to access these tools while providing a personalized experience for each patient.  

## Workshop Structure
Twilio Spotlights are led by a Twilio Solutions Engineer for additional resources and support. Your solutions engineer may have specific instructions for your organization.   

**Note: All links referenced on this page will overwrite current tab unless you right click and select "Open in new tab"**

## Contents
* [Prerequisites](https://github.com/awieber-twilio/hls-spotlight#prerequisites)
* [Module 1: Creating a Twilio Flex Account](https://github.com/awieber-twilio/hls-flex-spotlight#Module-1-creating-a-twilio-flex-account)
* [Exploring your Flex Account](https://github.com/awieber-twilio/hls-flex-spotlight#exploring-your-flex-account)
<!-- * [Module 2: Installing OpenEMR](https://github.com/awieber-twilio/hls-spotlight#Module-2-install-openemr)
* [Module 3: Install Ngrok](https://github.com/awieber-twilio/hls-spotlight#Module-3-install-ngrok) -->
* [Module 2: Deploy Telehealth Application](https://github.com/awieber-twilio/hls-flex-spotlight#Module-4-deploy-telehealth-application-optional)
* [Module 3: Install Flex Plugin](https://github.com/awieber-twilio/hls-flex-spotlight#Module-5-install-flex-plugin)
* [Module 4: Update Skills](https://github.com/awieber-twilio/hls-flex-spotlight#Module-6-update-skills)
* [Exploring the Flex Plugin](https://github.com/awieber-twilio/hls-flex-spotlight#exploring-the-plugin)
* [Module 5: Modifying the Plugin](https://github.com/awieber-twilio/hls-flex-spotlight#Module-7-modifying-the-plugin)
* [Exploring Telehealth](https://github.com/awieber-twilio/hls-flex-spotlight#exploring-telehealth)
* [Module 6: Add an SMS Chat Bot](https://github.com/awieber-twilio/hls-flex-spotlight#Module-8-add-chat-bot-optional)
* [Module 7: Add a Voice IVR](https://github.com/awieber-twilio/hls-flex-spotlight#Module-9-create-a-voice-ivr-optional)

## Prerequisites 
You can use your local machine's CLI or a VM for the following steps. This workshop has been tested on MacOS. 
1. Install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart).
<!-- 2. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
3. Launch Docker and wait for it to start.
4. Go to Settings, then Resources. Increase the Docker Desktop memory to 6 GB or more
5. Free up resources used by Docker by running the following in a terminal:
```
docker system prune --force
``` -->
2. If you do not already have a GitHub account, create one. Log in to your GitHub account in your local terminal. You may need to create a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).
3. A text editor such as [Visual Studio Code](https://code.visualstudio.com/) or [Sublime](https://www.sublimetext.com/).
4. During this workshop, we’ll use ports 8080 and 3000, so be prepared to have them available.
5. The [Flex Plugins CLI](https://www.twilio.com/docs/flex/developer/plugins/cli/install) requires a Node version between 10.12.0 to 14. We will use the Flex Plugins CLI starting in Module 5. Either install a Node version within this range or change your existing Node version using a tool such as [nvm](https://github.com/nvm-sh/nvm).
6. Next, install the Flex Plugins CLI by running:
```
twilio plugins:install @twilio-labs/plugin-flex
``` 
6. In your terminal, install [jq](https://stedolan.github.io/jq/download/) if you don't already have it installed. You'll need this package for the installer to run properly. If you're using MacOS, the command to install jq is 
```
brew install jq 
```


## Module 1: Creating a Twilio Flex Account
Twilio requires you to create a new Flex-specific account. Here's how to set this up. 
1. Login to your existing Twilio account or [create one following these instructions](https://www.twilio.com/try-twilio). 
2. Access the **Flex Overview** page in the [Console](https://www.twilio.com/console/flex/overview). 
3. Enter the desired account name. We recommend using a name you'll recognize, such as **hls-flex-provider**.
4. Verify an email address and phone number to continue. 
5. Please wait while your new hosted Flex instance is being built. When ready, you will automatically be loaded into Flex.


### Exploring your Flex account 
1. When account creation is complete, log in by selecting **Log in with Twilio**.

![Flex log-in page](/images/flex-login.png)

2. You can now see the Admin dashboard that allows you to set up and customize the Flex experience. 

![Admin Dashboard](/images/admin-dashboard.png)

3. Select the second icon on the left sidebar to view the agent desktop. 

![Agent Desktop](/images/agent-desktop.png) 

The Agent Desktop is where agents can accept and work on incoming voice or messaging Tasks. This view is where agents spend most of their time, since this is where actual engagements with customers occur. 

4. In the upper right, change your status from Offline to Available, so you can begin accepting tasks as an agent. 

![Agent Status](/images/agent-status.png)

5. In a new tab, find your Active Number for your Flex account within the Twilio Console under Phone Numbers -> Manage -> Active Numbers or follow [this link](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming).

6. Using your mobile phone, send an SMS to this phone number. You'll see this appear as a Task in the Agent Desktop. Accept this task. You can respond or simply close and complete the task if you'd like. 

![Active Task](/images/active-task.png)

All new Twilio Flex accounts are created with [Twilio Conversations](https://www.twilio.com/docs/flex/conversations) powering the communications between agent and patient. Flex Conversations support SMS/MMS, WhatsApp, and Chat. 

<!-- ## Module 2: Install OpenEMR  -->

<!-- OpenEMR is the most popular open source electronic health records and medical practice management solution. In our use case, both Schedulers and Educaters use OpenEMR to view and store relevant information about Owl Health patients. To learn more about OpenEMR, see [open-emr.org](open-emr.org). 
1. Open your terminal and clone this repo: 
```
git clone https://github.com/awieber-twilio/hls-spotlight.git
```
2. Move into the open-emr directory by running 
```
cd hls-spotlight/open-emr
```
3. Install the necessary packages with 
```
npm install
```
4. Open this directory in your favorite text editor. Create a file called `.env.localhost` within `open-emr`. Copy the contents of `.env` into `.env.localhost`. At the top of `.env.localhost` add two lines:
```
ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXX
AUTH_TOKEN=XXXXXXXXXXXXXXXXXXXXXX
``` 
Replace the default values with your Twilio Account SID and Auth Token. **Be sure that you are getting the credentials for the Flex account you created**. You can find these values in the [Console](https://twilio.com/console).

5. Return to your terminal and run your Twilio Serverless project locally by running 
```
twilio serverless:start --env=.env.localhost --load-local-env
```
You may be prompted to install the Twilio Serverless Plugin. 

6. In a browser of your choice, access [http://localhost:3000/installer/index.html](http://localhost:3000/installer/index.html). Values for your account should auto-populate. If they do not auto-populate, check your `.env.localhost` file to ensure you've entered the above values correctly.

7. Click **Deploy EHR to localhost**. This command will take a few minutes to run. Outputs will print in the terminal so you can follow along with the deployment.  

8. Click **Open EHR** in the browser.

9. Your default username is `admin` and your default password is `pass`
10. Feel free to click around and explore more of OpenEMR. Cancel the running installer in the terminal by entering Ctrl + C. You no longer need the installer.

## Module 3: Install ngrok
We use ngrok to easily expose our OpenEMR instance so we can view it within the Flex Agent Desktop. You can use another tool to host OpenEMR if you prefer, just make sure you have a public URL you can reference. 
1. Follow instructions for your OS to install [ngrok](https://ngrok.com/download). 
2. Create a ngrok account and authtoken. Authenticate your account in the terminal by running the command at [this link](https://dashboard.ngrok.com/get-started/your-authtoken).
3. Start an ngrok tunnel in **another terminal window** for OpenEMR. You can run 
```
ngrok http --region=us 80
``` 
OR use a custom domain by running the following, substituting the `<custom domain>` field with a memorable word, such as your last name. 
```
ngrok http --subdomain=<custom domain> 80
``` 
4. Copy the "Forwarding URL" for future use in Module 5. **Leave this terminal window running** and run any future commands in a separate window. 

![ngrok url](/images/ngrok-url.png) -->

## Module 2: Deploy Telehealth Application [OPTIONAL]
Educators at Owl Health will be interfacing with patients directly regarding their health needs. Seeing an affected area, such as a rash or a mole, allows an educator to more accurately diagnose a potential problem. So our next step is deploying a [Twilio Programmable Video](https://www.twilio.com/docs/video) application that we'll add to our contact center. Twilio Video uses WebRTC to add real-time video communications to any application. If your organization already has a deployed video solution they are happy with, you may choose to skip this module.

***Use Node version 14 for this Module**

1. Open your terminal and clone this repo: 
```
git clone https://github.com/awieber-twilio/hls-flex-spotlight.git
```

2. In your command line, move to the directory containing the code for Programmable Video with 
```
cd telehealth
```
3. Install necessary packages by running
```
npm install
``` 
4. There are a few more packages that need to be installed that are specific to the React application that hosts video calling functionality. Move into that directory with 
```
cd app
``` 
5. Install the required packages with 
```
npm install
``` 
6. Build the React app with 
```
npm run build
```
7. The following command will help us publish and export our application to a Twilio Service. Run 
```
npm run export
```
8. Next copy the assets created by the above command into a folder that matches the structure for Twilio Services by running 
```
cp -r out/* ../assets
```
9. Open `telehealth/.env` in your IDE. Scroll down to lines 88 and 94 and update the values for `ACCOUNT_SID` and `AUTH_TOKEN`.
10. Move back into the `telehealth` folder by running 
```
cd ../
```
11. Run the following command, replacing the default values with your own, to authenticate in the terminal:
```
export TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXX
export TWILIO_AUTH_TOKEN=XXXXXXXXXXXXXXXXXXXXXX
```
12. Deploy the necessary functions and assets by running 
```
twilio serverless:deploy --env=.env
```
13. Launch the installer application locally by running 
```
twilio serverless:start
```
14. Open http://localhost:3000/installer/index.html in your browser. Values from your account should auto-populate. If they do not autopopulate or they are incorrect, check your account credentials in `.env`. 

15. Fill in a password for "Administrator Password". Fill in your mobile number for "Administrator Phone" in **E.164 format**, for example +155555555555, and your email address for "Administrator Email". Select "Deploy Telehealth Application". This triggers a script to run that creates other essential services for the telehealth application automatically. You can find this script at `telehealth/functions/installer/deploy.js`.

16. Select **Open Application** on the installer page. Authenticate using the Administrator Password you just created. 

17. You'll receive a two-factor authentication code to your phone. Type that code into the next page. This code is sent by [Twilio Verify](https://www.twilio.com/docs/verify/api). The Twilio Verify API makes it simple to add user verification over SMS, Voice, WhatsApp, and other channels. 

18. You'll now see the complete Telehealth Landing Page. A portion of this landing page will be embedded into your Flex Agent Dashboard, so Educators can easily launch video calls with patients. Feel free to play around with this page before we embed it into the Flex Agent Dashboard in the next module. **Make note of the URL of the Telehealth Landing Page, as we'll be using it in Module 5.**

19. Cancel the running installer by pressing Ctrl+C in the terminal. You no longer need the installer. 
<!-- 5. The next Module requires creating an [API Key](https://www.twilio.com/docs/iam/keys/api-key). API Keys allow for secure authentication to Twilio resources. Since API Keys can be independently revoked, you have complete control of the lifecycle of your API credentials. You can create an API Key in the [Console](https://www.twilio.com/console/runtime/api-keys) or programmatically. 
6. Create your API Key and save the SID and secret in a secure location you can easily access. Either follow along in the console link above or use the CLI to run `twilio api:core:keys:create --friendly-name "telehealth" -o=json`. The console and this command will both provide an SID and Secret that you will need for the next Module. 
7. Open `.env` within the `app` directory. Update the environment variables for `TWILIO_API_KEY_SECRET` and `TWILIO_API_KEY_SID` on lines 50 and 56, using the SID and Secret that were given after you created the API key. 
8. You'll also need to update `TWILIO_PHONE_NUMBER` on line 20 in .env to the phone number asssociated with your Flex account. You can find this number in the [Console](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming) or by running `twilio api:core:incoming-phone-numbers:list` in your terminal. Be sure to use E.164 format, for example +155555555555. 
9. Within the video room, patients and educators should be able to chat with each other for instances where a written response is helpful. We'll use [Twilio Conversations](https://www.twilio.com/messaging/conversations-api) to enable the chat functionality. Create a Conversations service named "telehealth". You can do so in the [Console](https://console.twilio.com/us1/develop/conversations/manage/services?frameUrl=%2Fconsole%2Fconversations%2Fservices%3Fx-target-region%3Dus1) or by running `twilio api:conversations:v1:services:create --friendly-name telehealth` in the terminal. Copy the Serice SID and update `TWILIO_CONVERSATIONS_SID` on line 62 in .env.
10. Patients and Educators may join from multiple devies. We need to ensure that their state remains in sync. Twilio Sync ADD SYNC SID
11. ADD VERIFY SID
10. Now that you've configured all the environment variables you'll need, move into the telehealth directory by running `cd ..`. Deploy the service by running `twilio serverless:deploy`. This may take a few minutes.
11. The above command outputs the **Domain** under "Deployment Details". You may need to scroll up in your terminal to views this Domain. It should look something like this: telehealth-xxxx-dev.twil.io. You can also find this domain in the Console under [Functions](https://www.twilio.com/console/functions/overview/services). -->


## Module 3: Install Flex Plugin 
The Flex UI allows developers to build a custom user experience and behaviors for the Flex Agents and Supervisors. This includes: custom themes and styles, adding components, altering behavior and appearance for native channels (such as SMS) and defining custom ones (such as Video), and more. [Flex Plugins](https://www.twilio.com/docs/flex/developer/plugins) are the recommended method for customizing the Flex UI. They allow for modular development and can be applied to any running Flex instance. Twilio provides the [Flex Plugins CLI](https://www.twilio.com/docs/flex/developer/plugins/cli) and the [Flex Plugins Dashboard](https://www.twilio.com/docs/flex/developer/plugins/dashboard) for developing, testing, releasing, and managing plugins. We'll use the Plugins CLI to build and release a custom plugin for Owl Health. 

1. Navigate to the folder for the pre-made Flex Plugin in your CLI with 
```
cd ../flex-provider
``` 
2. Install necessary packages by running 
```
npm install
``` 
3. Navigate to the plugin-specific folder by running 
```
cd plugin
``` 
4. Install these necessary packages with 
```
npm install
```
<!-- 2. Next, create a [Twilio Profile](https://www.twilio.com/docs/twilio-cli/general-usage) to issue the following CLI commands using your Twilio credentials. Run `twilio login` in the terminal. Copy your Account SID and Auth Token into the terminal when prompted. Give the profile a shorthand name you'll remember, ex: hls-flex
3. Use the above profile by running `twilio profiles:use <your-shorthand-name>`, ex `twilio profiles:use hls-flex` -->
5. Next, authenticate using your Twilio credentials in the command line. You can find these values in the [Console](https://twilio.com/console). You will need your Twilio Account SID and Auth Token. **Be sure that you are getting the credentials for the Flex account you created**. 
6. If you haven't already, run the following command, replacing the default values with your own, to authenticate in the terminal:
```
export TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXX
export TWILIO_AUTH_TOKEN=XXXXXXXXXXXXXXXXXXXXXX
```
7. Next we'll use the [Twilio Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit) to easily deploy functions and assets to Twilio's serverless environment. Move back into the flex-provider folder by running 
```
cd ..
``` 
8. Deploy helper functions and assets by running 
```
twilio serverless:deploy --runtime node14 --override-existing-project
```

When the above command succeeds, you can see your Twilio Service within the [Console](https://www.twilio.com/console/functions/overview/services) by navigating to **Functions and Assets"**-> **Services**. 

A [Twilio Service](https://www.twilio.com/docs/runtime/functions/create-service) is a container for your Functions, Assets, and Environments within Twilio Runtime. A [Function](https://www.twilio.com/docs/runtime/functions) is a serverless environment that allows you to quickly deploy Javascript code. It replaces the need to find hosting or stand up your own server.

<!-- Select the Service named "hls-flex-provider". Find the URL in the bottom left. 

![Flex Provider](/images/flex-provider.png) -->

The next steps requires some specific configurations for your Flex instance. We've created a deployment script to automate these configurations and we'll explore them shortly. You can find the deployment script we will use at `flex-provider/functions/installer/deploy.js`. 


9. Create a new file called `.env.localhost` in the `flex-provider` folder. Copy the contents of `flex-provider/.env` into `flex-provider/.env.localhost`
10. Add 2 lines to the top of your `.env.localhost`:
```
ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXX
AUTH_TOKEN=XXXXXXXXXXXXXXXXXXXXXX
``` 
11. Scroll down to `TWILIO_PHONE_NUMBER` and add the Twilio Phone Number associated with your Flex instance in E.164 format, for example +155555555555.
12. Scroll down to `OPENEMR_NGROK_HOSTNAME` and add the URL provided by your Twilio Solutions Engineer.

<!-- 11. In the console, go to TaskRouter -> Workspaces, and copy the SID under "Flex Task Assignment". Scroll down to `FLEX_WORKSPACE_SID=` and paste the Workspace SID.  -->
13. Update the line for `TELEHEALTH_HOSTNAME=telehealth-xxxx-dev.twil.io`, replacing the example URL with your specific URL from Module 4: Deploy Telehealth Application. If you did not deploy the telehealth application, you can leave the link as is.
14. In your terminal, double check that you're in the `flex-provider` directory. Launch the web application that will configure the necessary customizations by running 
```
twilio serverless:start --load-local-env --env=.env.localhost -l debug
``` 
This command allows us to run our Twilio service locally. 
15. Navigate to [http://localhost:3000/installer/index.html](http://localhost:3000/installer/index.html) in your browser. 
16. Your account information should autopopulate. Click Deploy. This will take a few minutes, you can follow along in the terminal.
17. After the deployment is complete, cancel the running installer by pressing Ctrl+C in the terminal. You no longer need the installer. 

<!-- <!-- ## Module 5: Deploy Plugin
1. Open `flex-provider/plugin/.env` using your favorite IDE. Add a line for `REACT_APP_BACKEND_URL=` followed by the URL you found in the Module above. For example `REACT_APP_BACKEND_URL=hls-flex-provider-xxxx-dev.twil.io`
2. Add the ngrok URL from [Module 3: Install ngrok](Module-3-install-ngrok) **without "https://"** to  `REACT_APP_OPENEMR_NGROK_HOSTNAME=`, For example `REACT_APP_OPENEMR_NGROK_HOSTNAME=xxxxxxxx.ngrok.io`
. Move into the plugin folder in your command line by running `cd plugin` Install necessary packages by running `npm install`. 
9. Build the plugin by running `twilio flex:plugins:build`
9. Deploy the plugin by running `twilio flex:plugins:deploy --patch --changelog "HLS Plugin Deployment" --description "Deployed from CLI" -l debug`. You can watch the output as the plugin deploys. 
10. In the terminal output, you'll see a suggested command under "Next Modules" to release the plugin. It will look something like this: `twilio flex:plugins:release --plugin hls-emr@0.0.1 --name "Autogenerated Release xxxxxxxx" --description "The description of this Flex Plugin Configuration."` Run the command you see in your terminal. -->

## Module 4: Update Skills
Skills refer to abilities that you assign to Workers and apply to your contact center Task Queues and Workflows. They serve as Worker labels and help you sort your contact center users. Agents can have multiple skills. We'll use skills to differentiate between Educators and Schedulers. 

1. Navigate to the [Flex Admin Console](https://flex.twilio.com/admin/) in your browser.
2. Select Skills

![skills](/images/skills.png)

3. Add a skill named `Scheduling` by typing it into the "Name of skill" box and selecting "Add new skill"

![scheduling-skill](/images/scheduling-skill.png)

4. Repeat the process and add a skill called `Educators`.
5. Navigate to the Teams dashboard by selecting the third icon in the left sidebar. 

![team-skill](/images/team-skills.png)

6. Assign the Educators and Scheduling skills to your agent by selecting them in the dropdown on the right and clicking "+". You may need to refresh the page. Your profile should look like this:

![profile-skills](/images/profile-skills.png)

7. Select "Save"

<!-- ## Module 6: Update Messaging Service
1. Navigate to Messaging Service
2. Add Sender to Pool
3. Update Integration -> Autocreate a Conversation 

## Module 7: Update Conversation Behavior
1. Navigate to Conversation Service. Copy service SID. Navigate to Studio Flows. Copy Messaging Flow SID.
2. Find Address configuration by running 
`twilio api:conversations:v1:configuration:addresses:list`
3. Copy the SID associated with SMS for the next command. 
4. Update address configuration:
`twilio api:conversations:v1:configuration:addresses:update \
    --sid  IGXXXXXXXXXXXXXXXXXXXXXXX \
    --auto-creation.enabled  \
    --auto-creation.type studio \
    --auto-creation.conversation-service-sid ISXXXXXXXXXXXXXXXXXXXXXX \
    --auto-creation.studio-flow-sid FWXXXXXXXXXXXXXXXXXXXXXX` --> 


### Exploring the Plugin 
1. Navigate to [https://flex.twilio.com/](https://flex.twilio.com/) and **Log in with Twilio** to open the Flex Admin Dashboard. 
2. Navigate to Plugins. 

![Plugins](/images/plugins.png).

You should see the Plugin you just deployed set to "Enabled". 

![Plugin Enabled](/images/plugin-enabled.png)

Twilio Flex uses [TaskRouter](https://www.twilio.com/docs/taskrouter/how-taskrouter-works) to match incoming tasks with the appropriate agent. In our deployment, we take advantage of its skills-based routing features to assign tasks to Schedulers and Educators. 

3. Navigate to the Agent Desktop by selecting the second icon in the left sidebar. 

4. Create a task for the agent by sending an SMS to your Flex instance. Use the phone number you found in Module 5 under "Exploring your Flex Account" above. Make sure your agent is in the "Available" state in the upper right. 

5. Accept the task. Your Agent Desktop should look similar to this:

![Agent Desktop](/images/agent-desktop-hls.png)

As a Scheduler, you can respond to incoming calls, texts, and chats. You can use OpenEMR to add appointments to your calendar, update contact information, and find information on patients. You also see a panel for Patient Information above the Appointment Scheduling panel that summarizes important information for yourself and other agents. 

## Module 5: Modifying the Plugin 
The Flex agent dashboard consists of several React components for a completely customizable agent experience. Owl Health wants to encourage patients to make appointments for preventative care. To help agents outline preventative care options, we need to add a new pane to Flex. 
1. Navigate to `/flex-provider/plugin/src/components/CustomPanel2/Panes` in your favorite IDE. Here you can see several folders that make up the Agent Dashboard. 
2. Create a new folder in this directory called "PreventativeCarePane".
3. Create a file within the new folder called "PreventativeCarePane.tsx". Copy and paste the following code within this file:
```
import React from 'react';
import { PreventativeCarePaneStyles } from './PreventativeCarePane.Styles';

const PreventativeCarePane = () => {
  return (
    <PreventativeCarePaneStyles>
      <p className="title">Preventative Care</p>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Last Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Flu shot</td>
            <td>10-08-21</td>
          </tr>
          <tr>
            <td>Covid-19 Vaccine</td>
            <td>
              <div className="outdated">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 2.5C4.86739 2.5 4.74022 2.55268 4.64645 2.64645C4.55268 2.74021 4.5 2.86739 4.5 3V5C4.5 5.13261 4.55268 5.25979 4.64645 5.35355C4.74022 5.44732 4.86739 5.5 5 5.5C5.13261 5.5 5.25979 5.44732 5.35356 5.35355C5.44732 5.25979 5.5 5.13261 5.5 5V3C5.5 2.86739 5.44732 2.74021 5.35356 2.64645C5.25979 2.55268 5.13261 2.5 5 2.5ZM5.46 6.81C5.44906 6.77814 5.43392 6.74787 5.415 6.72L5.355 6.645C5.28469 6.57562 5.1954 6.52862 5.09841 6.50994C5.00141 6.49125 4.90106 6.50171 4.81 6.54C4.74941 6.56532 4.6936 6.60083 4.645 6.645C4.59866 6.69172 4.562 6.74713 4.53712 6.80805C4.51223 6.86897 4.49962 6.9342 4.5 7C4.50079 7.06534 4.51438 7.12989 4.54 7.19C4.56246 7.25205 4.59829 7.3084 4.64494 7.35506C4.6916 7.40172 4.74795 7.43754 4.81 7.46C4.86985 7.48645 4.93457 7.50012 5 7.50012C5.06544 7.50012 5.13015 7.48645 5.19 7.46C5.25205 7.43754 5.3084 7.40172 5.35506 7.35506C5.40172 7.3084 5.43755 7.25205 5.46 7.19C5.48562 7.12989 5.49921 7.06534 5.5 7C5.50246 6.96671 5.50246 6.93329 5.5 6.9C5.49139 6.86812 5.4779 6.83776 5.46 6.81ZM5 0C4.0111 0 3.0444 0.293245 2.22215 0.842652C1.39991 1.39206 0.759043 2.17295 0.380605 3.08658C0.00216642 4.00021 -0.0968502 5.00555 0.0960758 5.97545C0.289002 6.94536 0.765206 7.83627 1.46447 8.53553C2.16373 9.2348 3.05465 9.711 4.02455 9.90393C4.99446 10.0969 5.99979 9.99784 6.91342 9.6194C7.82705 9.24096 8.60794 8.6001 9.15735 7.77785C9.70676 6.95561 10 5.98891 10 5C10 4.34339 9.87067 3.69321 9.6194 3.08658C9.36812 2.47995 8.99983 1.92876 8.53553 1.46447C8.07124 1.00017 7.52005 0.631876 6.91342 0.380602C6.30679 0.129329 5.65661 0 5 0ZM5 9C4.20888 9 3.43552 8.7654 2.77772 8.32588C2.11992 7.88635 1.60723 7.26164 1.30448 6.53073C1.00173 5.79983 0.92252 4.99556 1.07686 4.21964C1.2312 3.44371 1.61216 2.73098 2.17157 2.17157C2.73098 1.61216 3.44372 1.2312 4.21964 1.07686C4.99556 0.922518 5.79983 1.00173 6.53074 1.30448C7.26164 1.60723 7.88635 2.11992 8.32588 2.77772C8.7654 3.43552 9 4.20887 9 5C9 6.06087 8.57857 7.07828 7.82843 7.82843C7.07828 8.57857 6.06087 9 5 9Z" fill="#E36A19"/>
                </svg>
                &nbsp;
                <span className="outdated-date">01-05-22</span>
                &nbsp;
                <span className="date-warning">(outdated)</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>Mammogram</td>
            <td>01-20-21</td>
          </tr>
          <tr>
          <td>Colonoscopy</td>
          <td>
            <span className="outdated">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 2.5C4.86739 2.5 4.74022 2.55268 4.64645 2.64645C4.55268 2.74021 4.5 2.86739 4.5 3V5C4.5 5.13261 4.55268 5.25979 4.64645 5.35355C4.74022 5.44732 4.86739 5.5 5 5.5C5.13261 5.5 5.25979 5.44732 5.35356 5.35355C5.44732 5.25979 5.5 5.13261 5.5 5V3C5.5 2.86739 5.44732 2.74021 5.35356 2.64645C5.25979 2.55268 5.13261 2.5 5 2.5ZM5.46 6.81C5.44906 6.77814 5.43392 6.74787 5.415 6.72L5.355 6.645C5.28469 6.57562 5.1954 6.52862 5.09841 6.50994C5.00141 6.49125 4.90106 6.50171 4.81 6.54C4.74941 6.56532 4.6936 6.60083 4.645 6.645C4.59866 6.69172 4.562 6.74713 4.53712 6.80805C4.51223 6.86897 4.49962 6.9342 4.5 7C4.50079 7.06534 4.51438 7.12989 4.54 7.19C4.56246 7.25205 4.59829 7.3084 4.64494 7.35506C4.6916 7.40172 4.74795 7.43754 4.81 7.46C4.86985 7.48645 4.93457 7.50012 5 7.50012C5.06544 7.50012 5.13015 7.48645 5.19 7.46C5.25205 7.43754 5.3084 7.40172 5.35506 7.35506C5.40172 7.3084 5.43755 7.25205 5.46 7.19C5.48562 7.12989 5.49921 7.06534 5.5 7C5.50246 6.96671 5.50246 6.93329 5.5 6.9C5.49139 6.86812 5.4779 6.83776 5.46 6.81ZM5 0C4.0111 0 3.0444 0.293245 2.22215 0.842652C1.39991 1.39206 0.759043 2.17295 0.380605 3.08658C0.00216642 4.00021 -0.0968502 5.00555 0.0960758 5.97545C0.289002 6.94536 0.765206 7.83627 1.46447 8.53553C2.16373 9.2348 3.05465 9.711 4.02455 9.90393C4.99446 10.0969 5.99979 9.99784 6.91342 9.6194C7.82705 9.24096 8.60794 8.6001 9.15735 7.77785C9.70676 6.95561 10 5.98891 10 5C10 4.34339 9.87067 3.69321 9.6194 3.08658C9.36812 2.47995 8.99983 1.92876 8.53553 1.46447C8.07124 1.00017 7.52005 0.631876 6.91342 0.380602C6.30679 0.129329 5.65661 0 5 0ZM5 9C4.20888 9 3.43552 8.7654 2.77772 8.32588C2.11992 7.88635 1.60723 7.26164 1.30448 6.53073C1.00173 5.79983 0.92252 4.99556 1.07686 4.21964C1.2312 3.44371 1.61216 2.73098 2.17157 2.17157C2.73098 1.61216 3.44372 1.2312 4.21964 1.07686C4.99556 0.922518 5.79983 1.00173 6.53074 1.30448C7.26164 1.60723 7.88635 2.11992 8.32588 2.77772C8.7654 3.43552 9 4.20887 9 5C9 6.06087 8.57857 7.07828 7.82843 7.82843C7.07828 8.57857 6.06087 9 5 9Z" fill="#E36A19"/>
              </svg>
              &nbsp;
              <span className="outdated-date">12-04-15</span>
              &nbsp;
              <span className="date-warning">(outdated)</span>
            </span>
          </td>
        </tr>
        </tbody>

      </table>
      <div>

      </div>

    </PreventativeCarePaneStyles>
  );
};
export default PreventativeCarePane;
```

4. Create another file within this folder called "PreventativeCarePane.Styles.ts". Copy and paste the following code: 
```
import styled from "@emotion/styled";

export const PreventativeCarePaneStyles = styled('div')
  `
    max-width: 519px;
    width: 50%;
    height: 201px;
    border: 1px solid #E1E3E9;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 20px;
    .title {
      font-size: 14px;
      color: #606B85;
      font-weight: 700;
      margin-bottom: 8px;
    }
    table {
      color: #121C2D;
      width: 100%;
    }
    th{
      font-weight: 700;
      font-size: 8px;
      line-height: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #AFB2C0;
      text-align: start;
    }
    td {
      height: 33px;
      border-bottom: 1px solid #E1E3E9;
      vertical-align: middle;
      font-weight: 500;
      font-size: 10px;
    }
    .outdated {
      font-weight: 600;
      display: flex;
      justify-content: start;
      align-items: center;
      height: 33.99px;
    }
    .outdated-date {
      font-size: 10px;
      color: #E36A19;
    }
    .date-warning {
      font-weight: 700;
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #AEB2C1;
    }
  `; 
  ```
  5. Navigate to `/flex-provider/plugin/src/components/CustomPanel2/CustomPanel2.jsx.` This is where we will reference the additional Preventative Care pane and the associated CSS for display. 
  6. Near the top of "CustomPanel2.JSX", amongst the other imports, add a line to import the Preventative Care folder: 
  ```
  import PreventativeCarePane from "./Panes/PreventativeCarePane/PreventativeCarePane";
  ```
  7. Scroll down to line 159. After the close of the `<PatientInformationPane>` and before the close of the `</div>` add the `<PreventativeCarePane />`. 
  So your code should look like this:
  ```
  <div className="flex-row first-row">
      <PatientInformationPane
        name={props.task.attributes.name}
        patientInfo={props.patientInfo}
        pendingRequest={props.isFhirRequestPending}
        skill={SCHEDULING}
      />
      <PreventativeCarePane />
  </div>
  ```
8. Move into the `flex-provider/plugin` directory in the command line. Deploy the plugin by running 
```
twilio flex:plugins:deploy --patch --changelog "HLS Plugin Deployment" --description "Deployed from CLI"
```
9. Release the plugin by copying and pasting the output from the above command. It should look something like this: `twilio flex:plugins:release --plugin hls-emr@0.0.2 --name "Autogenerated Release xxxxxxxx" --description "The description of this Flex Plugin Configuration."`
10. Return to the agent desktop at [flex.twilio.com](flex.twilio.com). Refresh the page and either open a new task or select one that is already active. The desktop should now look something like this:

![PreventativeCare](/images/hls-desktop-preventative-care.png)

<!-- ## Module 6: Install Telehealth

## Module 7: Updating the Flex Plugin
 The last Module requires linking your Flex Plugin to your telehealth application, so that Educators are able to see the telehealth application within their Agent Dashboard. 
 
1. Open `flex-provider/plugin/.env` and add a line for `REACT_APP_TELEHEALTH_HOSTNAME=telehealth-xxxx-dev.twil.io`, replacing the example URL with your specific URL. 
2. Navigate to the `flex-provider/plugin` directory by running `cd ../flex-provider/plugin`. Redeploy the plugin by running `twilio flex:plugins:deploy --patch --changelog "HLS Plugin Deployment" --description "Deployed from CLI"`
3. Release the plugin by running the suggested next Modules in the output of the above command. It should look something like this: `twilio flex:plugins:release --plugin hls-emr@0.0.3 --name "Autogenerated Release xxxxxxxx" --description "The description of this Flex Plugin Configuration."` -->

### Exploring Telehealth
<!-- 1. Launch chrome from an insecure browser or it doesn't work :( `open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security --disable-site-isolation-trials` -->
2. Navigate to [flex.twilio.com](https://flex.twilio.com) in the browser and select **Log in with Twilio** if you aren't already logged in.
3. If there is an existing open task, select that, or create a new task by sending a text message to the phone number asssociated with your Flex account. Make sure you're in the "Available" state to receive the task. 
4. All incoming tasks are currently directed to **Schedulers**. After you've accepted the task as a Scheduler, you can transfer it to the **Educators** queue. Select this button at the top of the chat to transfer the task. 

![Transfer Task](/images/transfer-task.png)

5. When the "Transfer" pop-up appears, select "Queues"

![Transfer to Queue](/images/transfer-queue.png)

6. Hover over Educators and select the button to the right to transfer the task to the Educators Queue. 

![Transfer to Educators](/images/transfer-to-educators.png)

7. When the transfer is complete, you'll once again receive the task, but this time as an Educator. As an agent, you currently possess the Educator and Scheduler skills for demo purposes. Accept this task. 

8. Above the chat, you'll see a new button that allows you to start a video call. Select this button.

![Video Button](/images/video-button.png)

9. A window will appear to the right of your chat. You may need to accept browser permissions for your camera and microphone. Then you should be able to see yourself. 

![Video Room](/images/video-room.png)

10. Scroll down within the video window. Enter your phone number in E.164 format and click on the Message icon to send a link to the portal to your phone. 

![Send link](/images/send-video-link.png)

11. Select "Start Visit". You've joined the call as an Educator. 
12. Click on the link in the text message you received to join the call as a patient. 
13. With both participants in the call, the agent desktop should look similar to this *:

![live-video.png](/images/live-video.png)

And within your phone the browser should look something like this *:

![live-video.png](/images/live-video-phone.png)

*Patient Mary Ann Doe represented by dog Tito. 

## Module 6: Add Chat Bot [OPTIONAL]
When new messages, calls, or chats come into Owl Health, they are immediately routed to the Schedulers queue for an agent to gather necessary information and re-route to Educators for an appointment. Owl Health has realized they can save time and money by using a chat bot to gather information and handle the routing without human intervention. Let's build a basic chat bot using [Twilio Studio](https://www.twilio.com/docs/studio), a low-code application builder with drag and drop widgets to create a custom experience across multiple channels. 
1. Navigate to Studio Flows in the [Console](https://www.twilio.com/console/studio/flows).
2. You should see three Studio Flows that were deployed by the Plugin deployment script, `flex-provider/functions/installer/deploy.js`. 

![flows](/images/flows.png)

Select the Messaging Flow. 

3. You should see a Trigger widget and two other widgets for handling incoming messages and conversations. 

![messaging flow](/images/messaging-flow.png)

Within the widget library, scroll down to "Send & Wait for Reply" under **Messaging**. Select and drag the widget into the flow. 

4. Select the "Send & Wait for Reply" widget and modify the **Message Body** within the Flow Configuration to greet patients when they send an SMS to Owl Health: "Hello, thank you for contacting Owl Health. Do you have an appointment at this time? Reply Y or N".

![message body](/images/message-body.png)

5. Select the widget labeled Trigger at the top, and select **Transitions** in the Flow Configuration box to the right. Under **If Incoming Conversation**, select the label "send_and_reply_1". 

6. In this Module, we'll configure the Studio Flow to branch based on the patient's response. In the widget library, select the widget labeled "Split Based On..." and drag it into the flow. Connect the **Reply** transition from "send_and_reply_1" to the start of "split_1"

![split](/images/split-on-response.png)

7. Select the "split_1" widget. Under **Variable to Test**, begin typing or scroll down to `widgets.send_and_reply_1.inbound.Body` and select it. 

![split on body](/images/split-body.png)

8. Click on the **Transitions** tab. Select the "+" icon to the right of "New Condition". Under **If Value Equal_To.."**, select "Matches Any Of" in the dropdown. Enter "Y,y,Yes,yes" in the following text field. This accounts for multiple responses from patients. Click "Save" at the bottom of the box.

![matches any](/images/matches-any.png)

9. Now we'll route any patients with appointments directly to the "Educators" queue. First, lets send them a message to let them know they're being routed to an educator. In the Widget Library, select the "Send Message" widget and drag it into the flow. Connect the "If value matches_any_of Y,y,Yes,yes" output to the start of the "Send Message" widget. 

![send message educators](/images/send-message-educators.png)

10. Add a **Message Body** to the send_message_1 widget that reads: "Routing you to an Educator now...". 

11. In the Widget Library, scroll down to "Send to Flex" and drag that widget into the Flow. Connect both the "Sent" and "Failed to Send" outputs to the start of "send_to_flex_1".

12. Select the send_to_flex_1 widget. In the configuration box to the right, select the "Transfer to Nurse Educator" in the dropdown under **Workflow**. Under **Task Channel**, select SMS. Under **Attributes**, copy the following:
```
{"name": "{{trigger.message.ChannelAttributes.from}}", "channelType": "{{trigger.message.ChannelAttributes.channel_type}}", "channelSid": "{{trigger.message.ChannelSid}}"}
```
Select Save at the bottom of the configuration box.

13. Next we need to determine the behavior for patients who do not have an appointment and need to meet with a Scheduler. Before we perform the transfer, we can get some background information on the patient to make it easier for the Scheduler to handle the task quickly. From the Widget Library, scroll down to "Send & Wait for Reply" and drag that widget into the Flow. Connect the "No condition matches" output from the widget "split_1" to the start of "send_and_reply_2".

14. Select "send_and_reply_2" and edit the **Message Body** to say: "What is your name?". Select "Save".

![send and wait](/images/send-and-reply-2.png)

15. You can now add any additional "Send & Wait for Reply" widgets for questions Schedulers may have for patients by connecting the "Reply" output to new widgets. 

16. Once you're satisfied with the chat bot, you need to route the patient to Schedulers in Flex. You should already have a widget called "SendConversationToAgent" that will send the patient and conversation history to the Schedulers queue. Connect the output of your final "send_and_reply" widget to the start of the "SendConversationToAgent" widget.

17. Publish the flow by clicking "Publish", then "Publish" again in the pop-up. Test out the patient experience by texting the Twilio phone number. Try different responses to test out each branch you created. When you log in to [https://flex.twilio.com](https://flex.twilio.com), you can accept tasks as a Scheduler or Educator and see the conversation history between the patient and chat bot. 

![conversation history](/images/conversation-history.png)

Studio Flows can be imported or exported as JSON objects. I've uploaded the Studio Flow I created during Module 8 under `assets/messaging-flow.json`. You can use this object to create a new flow, you'll need to update the Workflow and Channel SIDs in the various "Send to Flex" widgets. Follow [these instructions](https://www.twilio.com/docs/studio/user-guide#importing-and-exporting-flows) to import or export a Studio Flow. 

## Module 7: Create a voice IVR [OPTIONAL]
Similar to the SMS experience, you can use Studio Flows to customize the voice experience. Navigate to the "Voice IVR" Studio Flow. You can use the **Voice** widgets to create an IVR that will route patients to Schedulers or to Educators directly. This module is an additional optional challenge. Apply what you learned in Module 8 and experiment with Studio to create the customized experience you desire. Reference the Flow Logs as a tool for debugging your Flow.

If you would like a reference, you can import the Studio Flow I created as a new flow using the JSON object available at `assets/voice-flow.json`. Happy building!

## Gotchas
[1] May see "Error 20404" if the Flex account credentials (SID and Auth Token) are entered incorrectly, or if accidently using credentials for the original Twilio account instead. 


## Next Steps
Congrats! You successfully spun up a contact center to meet Owl Health's current needs for Schedulers and Educators. Below are some resources to help you develop it further: 
* This [GitHub repository](https://github.com/Pham-dev/hls-blueprint-release) contains several assets used during this workshop, and additional assets ready for deployment and exploration. It is frequently updated by a team of Twilio developers. 
* This [QuickStart guide](https://www.twilio.com/docs/flex/quickstart/getting-started-plugin) walks you through creating a Twilio Flex Plugin from scratch.
* See how other organizations are using Flex [here](https://customers.twilio.com/?q=products_used&c=AAAAEQ%3D%3D).