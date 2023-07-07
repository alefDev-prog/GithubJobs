## Database

### Applications

1. Insert application into user subcollection "userApplications", for the applicant
2. Update jobOffering document to contain the application in an "applications" array
3. Update "messages" subcollection to alert of the application


# Conversations

1. Have a new collection outside of "users" collection, call it conversations
2. Create new conversation id:
    - Append the shorter uid of the two to the longer, this shall be the id for the chatt
3. Include user-info such as name and image when initializing conversation
4. Possibly include an "initializer" for the conversation, this could be a job-application

