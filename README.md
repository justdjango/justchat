# Django Channels Tutorial Series

[![alt text](https://github.com/justdjango/justchat/blob/master/thumbnail.png "Logo")](https://youtu.be/uZgRbnIsgrA)

This tutorial is for how to build a chat application with Django Channels. The tutorial series can be watched [here](https://youtu.be/Wv5jlmJs2sU)

To run the backend, run:

```json
virtualenv env
source env/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

To run the frontend:

```json
npm i
npm start
```

To develop locally:

```
1. Change the `DEBUG` flag in `src/settings.js`
2. Create two users (easiest way might be to run `python manage.py createsuperuser` twice)
3. Using django admin, create a `Contact` object for each user.
4. Make sure you have an instance of redis running. 
```

To build for deployment:

```json
npm run build
```

Please note this is a **demo project** of the concepts used in building a chat app. It is simply not production ready. For example, when the backend receives a message, it'll broadcast to everyone in the room including the sender. This means when you demo the sender role, be aware you'll see every outbound message duplicated. The project is setup for deployment on Heroku however you'll need to follow tutorials on how to get this [up and running](https://blog.heroku.com/in_deep_with_django_channels_the_future_of_real_time_apps_in_django)
